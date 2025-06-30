const datatable = require('../db');
const mainboardquery = require('../query/mainboard_query');

const controller1 = async(req, res) => {
    datatable.query(mainboardquery.query2, [req.cookies.prattleuser], (error1, result1) => {
        try {
        if (result1) {
            datatable.query(mainboardquery.query1, [req.cookies.prattleuser], (error2, result2) => {
                if (result2 && result1.rows[0]) {
                    console.log(result1)
                    res.render('main_board', { users: result2.rows, loggeduserfollowing: result1.rows[0].followed_user, username: req.cookies.prattleuser });
                } else {
                    console.log(error2);
                    res.status(500).render('error', { errorCode: 500, errorHeading: "Data Fetch Error !", errorDescription: "Due to internal server error, account data not being fetched, try again after sometimes." });
                }
            })
        } else {
            res.status(500).render('error', { errorCode: 500, errorHeading: "Data Fetch Error !", errorDescription: "Due to internal server error, account data not being fetched, try again after sometimes." });
        }
    } catch(e) {
        console.log(e);
        res.status(500).render('error', { errorCode: 500, errorHeading: "Data Fetch Error !", errorDescription: "Due to internal server error, account data not being fetched, try again after sometimes." });
    }
    })
}

const controller2 = async(req, res) => {
    res.clearCookie('prattleuser');
    res.redirect('/')
}

const controller3 = async (req, res) => {
    const { username } = await req.body;

    datatable.query(mainboardquery.query3, [username, req.cookies.prattleuser], async (error, result) => {
        console.log(result.rows[0].exists);
        if (result.rows[0].exists) {               
            res.redirect('/mainboard');
        } else {
            datatable.query(mainboardquery.query4, [username, req.cookies.prattleuser], async (error, result) => {
                if (error) {
                    console.log(error);
                     res.status(404).render('error', { errorCode: 500, errorHeading: "Account Tie-In Error !", errorDescription: "Due to internal server error a user you want to tie-in with is not working, try again after sometimes." });
                } else {
                    datatable.query(mainboardquery.query4, [req.cookies.prattleuser, username], async (error, result) => {
                        if (error) {
                            console.log(error);
                             res.status(404).render('error', { errorCode: 500, errorHeading: "Account Tie-In Error !", errorDescription: "Due to internal server error a user you want to tie-in with is not working, try again after sometimes." });
                        } else {
                            res.redirect('/mainboard');
                        }
                    })
                }
            })
        }
    })
}

const controller4 = async(req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    try {
        datatable.query(mainboardquery.query5, [`%${username}%`], async(error, result) => {

            if (result.rows.length > 0) {
                res.json(result.rows);
                console.log("result of " + username + " is : " + result.rows[0].followed_user);
            } else {
                res.status(404).json("no user found");
            }
        })
    } catch (error) {
        res.status(500).render('error', { errorCode: 500, errorHeading: "Something Gone Wrong !", errorDescription: "Due to internal server error Search functionality not working, try again after sometimes." });
    }
}

module.exports = { controller1, controller2, controller3, controller4 }