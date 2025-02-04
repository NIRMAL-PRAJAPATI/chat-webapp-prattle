const datatable = require('../db');
const loginquery = require('../query/loginuser_query');

const controller1 = async (req, res) => {
    const { username, password } = req.body;

    datatable.query(loginquery.query1, [username], (error1, result1) => {
        if (result1.rows.length) {
            datatable.query(loginquery.query2, [username, password], async (error2, result2) => {
                try {
                    if (result2.rows.length) {
                        await res.cookie('prattleuser', username);
                        res.redirect('/mainboard');
                    } else {
                        res.render('index', { loginerrmsg: "User exist, password is wrong !", username, password: "", showdiv: "hidden" });
                    }
                } catch (e) {
                    res.send("somthing gone wrong !" + e);
                }
            })
        } else {
            req.session.username = username;
            req.session.password = password;
            res.render('index', { loginerrmsg: "", username, password, showdiv: "flex" });
        }
    })
}

const controller2 = async (req, res) => {
    const { username, password } = req.session;

    datatable.query(loginquery.query3, [username, password, username], async (error, result) => {
        if (error) {
            res.send(error);
        } else {
        await res.cookie('prattleuser', username);
        res.redirect('/mainboard');
        }
    })
}

module.exports = { controller1, controller2 };