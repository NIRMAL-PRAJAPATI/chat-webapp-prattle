const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http')
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);

// routes
const user_router = require('./src/route/user_route');
const loginuser_route = require('./src/route/loginuser_route');
const mainboard_route = require('./src/route/mainboard_route');
const chatboard_route = require('./src/route/chatboard_route');

// middlewares
const sessioncreate = require('./src/middleware/confirmationbox')

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser('prattle'));
app.use(express.urlencoded({extended: true}));

// Add session middleware
app.use(sessioncreate);

app.listen(port, () => console.log(`your port is ${port}`));

// loginuser route
app.get('/', (req, res) => {
    res.render('index', { loginerrmsg: "", username: "", password: "", showdiv: "hidden"});
})
app.use('/submit', loginuser_route);

// mainboard route
app.use('/mainboard', mainboard_route);

// chatboard route
app.use('/chatboard', chatboard_route);

// socketio connections
io.on('connection', (socket) => {
    console.log("connection done " + socket.id);

    socket.on('joinchat', (chatboardID) => {
        socket.join(chatboardID);
        console.log(`user joined chat ${chatboardID}`);
    })
})


// practice route
app.use('/api/prattle/user', user_router);