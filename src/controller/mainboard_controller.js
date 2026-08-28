const datatable = require('../db');
const mainboardquery = require('../query/mainboard_query');

// Helper to get logged-in username from cookies (signed or unsigned)
function getLoggedUser(req) {
    return req.loggedUser || req.signedCookies.prattleuser || req.cookies.prattleuser;
}

const controller1 = async(req, res) => {
    try {
        const loggedUser = getLoggedUser(req);
        if (!loggedUser) {
            return res.redirect('/');
        }

        const result1 = await datatable.query(mainboardquery.query2, [loggedUser]);
        const result2 = await datatable.query(mainboardquery.query1, [loggedUser]);
        
        // BUG FIX: Handle case where user doesn't exist in DB (deleted account, corrupted cookie)
        if (result1.rows[0] && result2.rows) {
            res.render('main_board', { users: result2.rows, loggeduserfollowing: result1.rows[0].followed_user || [], username: loggedUser });
        } else {
            // User cookie exists but user not found in DB — clear cookie and redirect to login
            res.clearCookie('prattleuser');
            res.redirect('/');
        }
    } catch(error) {
        console.error("Mainboard load error:", error);
        res.status(500).render('error', { errorCode: 500, errorHeading: "Data Fetch Error !", errorDescription: "Due to internal server error, account data not being fetched, try again after sometimes." });
    }
}

const controller2 = async(req, res) => {
    // BUG FIX: Clear both signed and unsigned cookies
    res.clearCookie('prattleuser');
    res.clearCookie('prattleuser', { signed: true });
    res.redirect('/')
}

const controller3 = async (req, res) => {
    const { username } = req.body;
    const loggedUser = getLoggedUser(req);

    // BUG FIX: Validate the username being followed
    if (!username || typeof username !== 'string' || !username.trim()) {
        return res.status(400).render('error', { errorCode: 400, errorHeading: "Invalid Request!", errorDescription: "Please provide a valid username." });
    }

    // BUG FIX: Prevent user from following themselves
    if (username.trim().toLowerCase() === loggedUser) {
        return res.redirect('/mainboard');
    }

    try {
        const result = await datatable.query(mainboardquery.query3, [username, loggedUser]);
        
        if (result.rows[0] && result.rows[0].exists) {               
            res.redirect('/mainboard');
        } else {
            await datatable.query(mainboardquery.query4, [username, loggedUser]);
            await datatable.query(mainboardquery.query4, [loggedUser, username]);
            res.redirect('/mainboard');
        }
    } catch (error) {
        console.error("Tie-in error:", error);
        // BUG FIX: Status was 404 but errorCode said 500 — now consistent
        res.status(500).render('error', { errorCode: 500, errorHeading: "Account Tie-In Error !", errorDescription: "Due to internal server error a user you want to tie-in with is not working, try again after sometimes." });
    }
}

const controller4 = async(req, res) => {
    const { username } = req.query;

    if (!username || typeof username !== 'string' || !username.trim()) {
        return res.status(400).json({ error: "Username is required" });
    }

    // BUG FIX: Sanitize search input to prevent SQL injection via LIKE wildcards
    const sanitized = username.trim().replace(/[%_]/g, '');
    if (sanitized.length < 1) {
        return res.status(400).json({ error: "Please enter a valid search term" });
    }

    try {
        const result = await datatable.query(mainboardquery.query5, [`%${sanitized}%`]);
        
        if (result.rows.length > 0) {
            // BUG FIX: Don't send passwords in search results
            const safeRows = result.rows.map(({ password, ...rest }) => rest);
            res.json(safeRows);
        } else {
            res.status(404).json({ message: "No user found" });
        }
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Search functionality is temporarily unavailable" });
    }
}

module.exports = { controller1, controller2, controller3, controller4 }