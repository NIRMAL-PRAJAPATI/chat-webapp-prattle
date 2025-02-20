const bcrypt = require('bcryptjs');
const datatable = require('../db');
const loginquery = require('../query/loginuser_query');

const controller1 = async (req, res) => {
    const { username, password } = req.body;

    datatable.query(loginquery.query1, [username], async (error1, result1) => {
        if (result1.rows.length) {
                try {
                    let isMatch = bcrypt.compare(password, result1.rows[0].password);

                    isMatch.then(async (resolve, reject) => {
                    if (resolve) {
                        await res.cookie('prattleuser', username);
                        res.redirect('/mainboard');
                    } else {
                        res.render('index', { loginerrmsg: "User exist, password is wrong !", username, password: "", showdiv: "hidden" });
                    }
                })
                } catch (e) {
                    res.send("somthing gone wrong !" + e);
                }
        } else {
            req.session.username = username;
            req.session.password = password;
            res.render('index', { loginerrmsg: "", username, password, showdiv: "flex" });
        }
    })
}

const controller2 = async (req, res) => {
    const { username, password } = await req.session;

    try {
        let salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (hashedPassword) {
            datatable.query(loginquery.query2, [username, hashedPassword, "Prattle AI"], async (error, result) => {

                if (error) {
                    res.status(500).render('error', { errorCode: 500, errorHeading: "Account Password Error !", errorDescription: "Due to internal server error, account password not being generated, try again after sometimes." });
                } else {
                    await res.cookie('prattleuser', username);
                    res.redirect('/mainboard');
                }
            })
        } else {
            res.send('something gone wrong to create encrypted password !');
        }
    } catch (error) {
        res.status(500).render('error', { errorCode: 500, errorHeading: "Account Creation Error !", errorDescription: "Due to internal server error, account not being created, try again after sometimes." });
    }
}

module.exports = { controller1, controller2 };