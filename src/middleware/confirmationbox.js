
const session = require('express-session');
// Add session middleware

    let sessioncreate = session({
        // BUG FIX: Use environment variable for session secret instead of hardcoded value
        secret: process.env.SESSION_SECRET || 'prattle_session_secret_change_me',
        resave: false,
        saveUninitialized: false, // BUG FIX: Was true — creates empty sessions for every visitor, wasting memory
        cookie: {
            secure: false,
            httpOnly: true,    // BUG FIX: Prevent client JS from reading session cookie
            maxAge: 24 * 60 * 60 * 1000  // 24 hours — sessions were never expiring before
        },
    })

    module.exports = sessioncreate;