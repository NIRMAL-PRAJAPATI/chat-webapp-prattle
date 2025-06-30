const bcrypt = require('bcryptjs');
const datatable = require('../db');
const loginquery = require('../query/loginuser_query');

const controller1 = async (req, res) => {
    const { username, password } = req.body;
    const lowercaseUsername = username.toLowerCase();

    try {
        const result1 = await datatable.query(loginquery.query1, [lowercaseUsername]);
        
        if (result1.rows.length) {
            const isMatch = await bcrypt.compare(password, result1.rows[0].password);
            
            if (isMatch) {
                res.cookie('prattleuser', lowercaseUsername);
                res.redirect('/mainboard');
            } else {
                res.render('index', { loginerrmsg: "User exist, password is wrong !", username: lowercaseUsername, password: "", showdiv: "hidden" });
            }
        } else {
            req.session.username = lowercaseUsername;
            req.session.password = password;
            res.render('index', { loginerrmsg: "", username: lowercaseUsername, password, showdiv: "flex" });
        }
    } catch (error) {
        res.send("Something went wrong! " + error);
    }
}

const controller2 = async (req, res) => {
    const { username, password } = req.session;

    try {
        let salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        await datatable.query(loginquery.query2, [username, hashedPassword, "Prattle AI"]);
        
        res.cookie('prattleuser', username);
        res.redirect('/mainboard');
    } catch (error) {
        res.status(500).render('error', { errorCode: 500, errorHeading: "Account Creation Error !", errorDescription: "Due to internal server error, account not being created, try again after sometimes." });
    }
}

module.exports = { controller1, controller2 };