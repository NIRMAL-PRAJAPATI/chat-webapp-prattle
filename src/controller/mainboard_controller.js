const datatable = require('../db');
const mainboardquery = require('../query/mainboard_query');

const controller1 = async(req, res) => {
    try {
        const result1 = await datatable.query(mainboardquery.query2, [req.cookies.prattleuser]);
        const result2 = await datatable.query(mainboardquery.query1, [req.cookies.prattleuser]);
        
        if (result1.rows[0] && result2.rows) {
            res.render('main_board', { users: result2.rows, loggeduserfollowing: result1.rows[0].followed_user, username: req.cookies.prattleuser });
        } else {
            res.status(500).render('error', { errorCode: 500, errorHeading: "Data Fetch Error !", errorDescription: "Due to internal server error, account data not being fetched, try again after sometimes." });
        }
    } catch(error) {
        console.log(error);
        res.status(500).render('error', { errorCode: 500, errorHeading: "Data Fetch Error !", errorDescription: "Due to internal server error, account data not being fetched, try again after sometimes." });
    }
}

const controller2 = async(req, res) => {
    res.clearCookie('prattleuser');
    res.redirect('/')
}

const controller3 = async (req, res) => {
    const { username } = req.body;

    try {
        const result = await datatable.query(mainboardquery.query3, [username, req.cookies.prattleuser]);
        
        if (result.rows[0].exists) {               
            res.redirect('/mainboard');
        } else {
            await datatable.query(mainboardquery.query4, [username, req.cookies.prattleuser]);
            await datatable.query(mainboardquery.query4, [req.cookies.prattleuser, username]);
            res.redirect('/mainboard');
        }
    } catch (error) {
        console.log(error);
        res.status(404).render('error', { errorCode: 500, errorHeading: "Account Tie-In Error !", errorDescription: "Due to internal server error a user you want to tie-in with is not working, try again after sometimes." });
    }
}

const controller4 = async(req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    try {
        const result = await datatable.query(mainboardquery.query5, [`%${username}%`]);
        
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json("no user found");
        }
    } catch (error) {
        res.status(500).render('error', { errorCode: 500, errorHeading: "Something Gone Wrong !", errorDescription: "Due to internal server error Search functionality not working, try again after sometimes." });
    }
}

module.exports = { controller1, controller2, controller3, controller4 }