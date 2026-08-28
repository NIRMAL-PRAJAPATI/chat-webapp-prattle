const bcrypt = require('bcryptjs');
const datatable = require('../db');
const loginquery = require('../query/loginuser_query');

const controller1 = async (req, res) => {
    const { username, password } = req.body;

    // BUG FIX: Validate input exists before processing
    if (!username || !password) {
        return res.render('index', { loginerrmsg: "Username and password are required!", username: "", password: "", showdiv: "hidden" });
    }

    const lowercaseUsername = username.trim().toLowerCase();

    // BUG FIX: Server-side validation (don't rely only on client-side form.js)
    if (lowercaseUsername.length < 4 || lowercaseUsername.length > 15) {
        return res.render('index', { loginerrmsg: "Username must be between 4 to 15 characters!", username: lowercaseUsername, password: "", showdiv: "hidden" });
    }

    if (!/^[a-zA-Z0-9]+$/.test(lowercaseUsername)) {
        return res.render('index', { loginerrmsg: "Username must contain only letters and numbers!", username: lowercaseUsername, password: "", showdiv: "hidden" });
    }

    try {
        const result1 = await datatable.query(loginquery.query1, [lowercaseUsername]);
        
        if (result1.rows.length) {
            const isMatch = await bcrypt.compare(password, result1.rows[0].password);
            
            if (isMatch) {
                // BUG FIX: Use signed, httpOnly cookies so they can't be forged via DevTools
                res.cookie('prattleuser', lowercaseUsername, {
                    signed: true,
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                    sameSite: 'lax'
                });
                res.redirect('/mainboard');
            } else {
                res.render('index', { loginerrmsg: "User exist, password is wrong !", username: lowercaseUsername, password: "", showdiv: "hidden" });
            }
        } else {
            req.session.username = lowercaseUsername;
            // BUG FIX: Hash the password before storing in session
            // Old code stored PLAINTEXT password in session: req.session.password = password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.session.hashedPassword = hashedPassword;

            res.render('index', { loginerrmsg: "", username: lowercaseUsername, password, showdiv: "flex" });
        }
    } catch (error) {
        console.error("Login error:", error);
        // BUG FIX: Don't leak error details to user (old code: res.send("Something went wrong! " + error))
        res.status(500).render('error', { errorCode: 500, errorHeading: "Login Error!", errorDescription: "Something went wrong during login. Please try again." });
    }
}

const controller2 = async (req, res) => {
    const { username, hashedPassword } = req.session;

    // BUG FIX: Validate session data exists
    if (!username || !hashedPassword) {
        return res.status(400).render('error', { errorCode: 400, errorHeading: "Session Expired!", errorDescription: "Your registration session has expired. Please try again." });
    }

    try {
        // BUG FIX: Old code used genSalt(5) — way too weak. Now password is pre-hashed with salt 10.
        // BUG FIX: Old code did `await res.cookie()` and `await res.redirect()` — these are NOT promises
        await datatable.query(loginquery.query2, [username, hashedPassword, "Prattle AI"]);
        
        res.cookie('prattleuser', username, {
            signed: true,
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax'
        });

        // Clear session data after successful registration
        req.session.username = null;
        req.session.hashedPassword = null;

        res.redirect('/mainboard');
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).render('error', { errorCode: 500, errorHeading: "Account Creation Error !", errorDescription: "Due to internal server error, account not being created, try again after sometimes." });
    }
}

module.exports = { controller1, controller2 };