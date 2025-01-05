
const session = require('express-session');
// Add session middleware

    let sessioncreate = session({
        secret: 'prattle',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })

    module.exports = sessioncreate;