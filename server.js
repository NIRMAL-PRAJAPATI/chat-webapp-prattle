const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { Server } = require('socket.io')
const http = require('http');
const axios = require("axios");

const app = express();
const port = 4000;

const socketServer = http.createServer(app);
const io = new Server(socketServer);


const API_KEY = "AIzaSyC9mrBsPgzA2J7la-PROx52OqiHIYytk3Q";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const users = {};
const rooms = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register user
    socket.on("registerUser", (username) => {
        console.log(username);
        users[username] = socket.id;
        io.emit("updateUserList", Object.keys(users));
        io.emit("userStatus", { username: username, status: "online" });
    });

    console.log(users);

    // Start private chat
    socket.on("startPrivateChat", ({ user1, user2 }) => {
        const roomId = [user1, user2].sort().join("_chats_");
        rooms[roomId] = roomId;

        // Leave any existing room before joining a new one
        if (socket.currentRoom) {
            socket.leave(socket.currentRoom);
            console.log(`User ${socket.id} left room: ${socket.currentRoom}`);
        }

        // Join the new room
        socket.currentRoom = roomId;
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);

        // Notify the other user to join
        if (users[user2]) {
            io.to(users[user2]).emit("joinRoom", roomId);
        }
    });

    // Leave a chat room
    socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
        console.log(`User ${socket.id} left room: ${roomId}`);
    });

    // Handle sending private messages
    socket.on("privateMessage", async ({ roomId, sender, message }) => {
        // Send message to the room
        socket.to(roomId).emit("privateMessage", { sender, message });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        let disConnectUser = null;

        for (let username in users) {
            if (users[username] === socket.id) {
                disConnectUser = username;
                delete users[username];
                break;
            }
        }

        io.emit("updateUserList", Object.keys(users));
        io.emit("userStatus", { username: disConnectUser, status: "offline" });

        // Leave the current room on disconnect
        if (socket.currentRoom) {
            socket.leave(socket.currentRoom);
            console.log(`User ${socket.id} left room on disconnect: ${socket.currentRoom}`);
        }

        console.log("User disconnected:", socket.id);
    });

    // All logic of AI chatbot is written here
    socket.on("chatbot_request", async (message) => {
        console.log("User: " + message);

        try {
            const response = await axios.post(GEMINI_URL, {
                contents: [{ role: "user", parts: [{ text: message }] }]
            });
            

            const botReply = response.data.candidates[0]?.content.parts[0]?.text || "Sorry, I couldn't understand.";
            socket.emit("chatbot_response", botReply);
            console.log("Bot:", botReply);
        } catch (error) {
            console.error("Error with Google Gemini API:", error);
            socket.emit("chatbot_response", "Sorry, an error occurred.");
        }
    });
});


// routes
const user_router = require('./src/route/user_route');
const loginuser_route = require('./src/route/loginuser_route');
const mainboard_route = require('./src/route/mainboard_route');
const chatboard_route = require('./src/route/chatboard_route');

// middlewares
const sessioncreate = require('./src/middleware/confirmationbox');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser('prattle'));
app.use(express.urlencoded({extended: true}));

// Add session middleware
app.use(sessioncreate);

socketServer.listen(port, () => console.log(`Server running on http://localhost:${port}`));

// loginuser route
app.get('/', (req, res) => {
    if(req.cookies.prattleuser) {
        res.redirect('mainboard');
    } else {
    res.render('index', { loginerrmsg: "", username: "", password: "", showdiv: "hidden"});
    }
})
app.use('/submit', loginuser_route);

// mainboard route
app.use('/mainboard', mainboard_route);

// chatboard route
app.use('/chatboard', chatboard_route);


// practice route
app.use('/api/prattle/user', user_router);