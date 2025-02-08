const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { Server } = require('socket.io')
const http = require('http');

const app = express();
const port = 3000;

const socketServer = http.createServer(app);
const io = new Server(socketServer);

const users = {};
const rooms = {};

// connect user
io.on("connection", (socket) => {
    console.log("user connected: ", socket.id);

    // register user
    socket.on("registerUser", (username) => {
        console.log(username)
        users[username] = socket.id;
        io.emit("updateUserList", Object.keys(users));
    })

// Start private chat
socket.on("startPrivateChat", ({ user1, user2 }) => {
    const roomId = [user1, user2].sort().join("_chats_");
    rooms[roomId] = roomId;

    socket.join(roomId);
    if (users[user2]) {
        io.to(users[user2]).emit("joinRoom", roomId);
    }
});

// Handle sending private messages
socket.on("privateMessage", async ({ roomId, sender, message }) => {
    // Send message to room
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
    console.log("User disconnected:", socket.id);
});
})

// routes
const user_router = require('./src/route/user_route');
const loginuser_route = require('./src/route/loginuser_route');
const mainboard_route = require('./src/route/mainboard_route');
const chatboard_route = require('./src/route/chatboard_route');

// middlewares
const sessioncreate = require('./src/middleware/confirmationbox');
const { object } = require('joi');

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
    res.render('index', { loginerrmsg: "", username: "", password: "", showdiv: "hidden"});
})
app.use('/submit', loginuser_route);

// mainboard route
app.use('/mainboard', mainboard_route);

// chatboard route
app.use('/chatboard', chatboard_route);


// practice route
app.use('/api/prattle/user', user_router);