require('dotenv').config({ path: './.env' });

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { Server } = require('socket.io')
const http = require('http');
const axios = require("axios");

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const app = express();
const port = process.env.PORT || 4000;

const socketServer = http.createServer(app);
const io = new Server(socketServer);

// Use env var instead of hardcoded key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// BUG FIX: Track multiple sockets per user (multi-tab support)
// Old code: users[username] = socket.id  (overwrites on second tab, breaks on disconnect)
const users = {};      // username -> Set of socket IDs
const socketUser = {}; // socket.id -> username
const rooms = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register user
    socket.on("registerUser", (username) => {
        if (!username || typeof username !== 'string') return;
        const cleanName = username.trim().toLowerCase();
        if (!cleanName) return;

        // BUG FIX: Support multiple sockets per user
        if (!users[cleanName]) {
            users[cleanName] = new Set();
        }
        users[cleanName].add(socket.id);
        socketUser[socket.id] = cleanName;

        io.emit("updateUserList", Object.keys(users));
        io.emit("userStatus", { username: cleanName, status: "online" });
    });

    // Request status of a specific user
    socket.on("getUserStatus", (targetUser) => {
        if (!targetUser || typeof targetUser !== 'string') return;
        const cleanTarget = targetUser.trim().toLowerCase();
        if (cleanTarget === "prattle ai") {
            socket.emit("userStatus", { username: cleanTarget, status: "online" });
            return;
        }
        const isOnline = !!(users[cleanTarget] && users[cleanTarget].size > 0);
        socket.emit("userStatus", { username: cleanTarget, status: isOnline ? "online" : "offline" });
    });

    // Start private chat
    socket.on("startPrivateChat", ({ user1, user2 }) => {
        if (!user1 || !user2) return;
        const u2 = user2.trim().toLowerCase();
        const roomId = [user1, user2].sort().join("_chats_");
        rooms[roomId] = roomId;

        // Leave any existing room before joining a new one
        if (socket.currentRoom) {
            socket.leave(socket.currentRoom);
        }

        // Join the new room
        socket.currentRoom = roomId;
        socket.join(roomId);

        // Notify the other user to join (send to ALL their sockets)
        if (users[u2]) {
            users[u2].forEach(sid => {
                io.to(sid).emit("joinRoom", roomId);
            });
        }
    });

    // Leave a chat room
    socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
    });

    // Handle sending private messages
    socket.on("privateMessage", async ({ roomId, sender, message }) => {
        if (!roomId || !sender || !message) return;
        // Send message to the room
        socket.to(roomId).emit("privateMessage", { sender, message });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        const username = socketUser[socket.id];
        delete socketUser[socket.id];

        if (username && users[username]) {
            users[username].delete(socket.id);

            // BUG FIX: Only mark offline when ALL tabs/sockets are gone
            if (users[username].size === 0) {
                delete users[username];
                io.emit("userStatus", { username: username.toLowerCase(), status: "offline" });
            }
        }

        io.emit("updateUserList", Object.keys(users));

        // Leave the current room on disconnect
        if (socket.currentRoom) {
            socket.leave(socket.currentRoom);
        }

        console.log("User disconnected:", socket.id);
    });

    // All logic of AI chatbot is written here
    socket.on("chatbot_request", async (message) => {
        if (!message || typeof message !== 'string') {
            socket.emit("chatbot_response", "Please send a valid message.");
            return;
        }

        // BUG FIX: Check if API key exists
        if (!GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is not set in .env");
            socket.emit("chatbot_response", "AI service is not configured. Please contact the administrator.");
            return;
        }

        console.log("User: " + message);

        try {
            const response = await axios.post(GEMINI_URL, {
                contents: [{
                    parts: [{ text: message }]
                }]
            }, {
                timeout: 30000 // 30 second timeout to prevent hanging
            });

            const botReply = response.data.candidates[0]?.content.parts[0]?.text || "Sorry, I couldn't understand.";
            socket.emit("chatbot_response", botReply);
            console.log("Bot:", botReply);
        } catch (error) {
            console.error("Error with Google Gemini API:", error.message);
            // BUG FIX: Send user-friendly error instead of generic message
            if (error.code === 'ECONNABORTED') {
                socket.emit("chatbot_response", "The AI took too long to respond. Please try again.");
            } else if (error.response?.status === 429) {
                socket.emit("chatbot_response", "Too many requests to AI. Please wait a moment and try again.");
            } else {
                socket.emit("chatbot_response", "Sorry, an error occurred while contacting the AI.");
            }
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

app.use(limiter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// BUG FIX: Use a proper secret for signed cookies
app.use(cookieParser(process.env.COOKIE_SECRET || 'prattle_secret_key_change_me'));
app.use(express.urlencoded({extended: true}));

// Add session middleware
app.use(sessioncreate);

// BUG FIX: Don't crash the server on uncaught exceptions in production
// The old code did process.exit(1) which kills the server for all users
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // In production, you'd want a process manager (PM2) to restart
    // For dev, just log and continue
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

socketServer.listen(port, () => console.log(`Server running on http://localhost:${port}`));

// loginuser route
app.get('/', (req, res) => {
    // BUG FIX: Check both signed and unsigned cookies for backward compatibility
    const loggedUser = req.signedCookies.prattleuser || req.cookies.prattleuser;
    if(loggedUser) {
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