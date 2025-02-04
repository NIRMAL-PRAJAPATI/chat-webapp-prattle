const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { Server } = require('socket.io')
const http = require('http');

const app = express();
const port = 3000;

const socketServer = http.createServer(app);
const io = new Server(socketServer);

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