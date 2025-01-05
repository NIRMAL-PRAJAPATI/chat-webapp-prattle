const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const user_router = require('./src/route/user_route');
const loginuser_route = require('./src/route/loginuser_route');
const sessioncreate = require('./src/middleware/confirmationbox')

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser('prattle'));
app.use(express.urlencoded({extended: true}));

// Add session middleware
app.use(sessioncreate);

// server running
app.listen(port, () => console.log(`your port is ${port}`));

app.get('/', (req, res) => {
    res.render('index', { loginerrmsg: "", username: "", password: "", showdiv: "hidden"});
})

app.get('/chatboard', (req, res) => {
    res.render("main_board");
})

app.get('/logout', (req, res) => {
    res.clearCookie('prattleuser');
    res.redirect('/');
})

app.use('/submit', loginuser_route);

app.use('/api/prattle/user', user_router);