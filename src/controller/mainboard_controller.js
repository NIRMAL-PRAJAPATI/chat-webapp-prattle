const datatable = require('../db');
const mainboardquery = require('../query/mainboard_query');

const controller1 = async(req, res) => {
    datatable.query(mainboardquery.query2, [req.cookies.prattleuser], (error1, result1) => {
        if (result1) {
            datatable.query(mainboardquery.query1, [req.cookies.prattleuser], (error2, result2) => {
                if (result2) {
                    res.render('main_board', { users: result2.rows, loggeduserfollowing: result1.rows[0].followed_user, username: req.cookies.prattleuser });
                } else {
                    console.log(error2);
                    res.send(error2);
                }
            })
        } else {
            res.send("something gone wrong" + error1);
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
                    res.send("something gone wrong to tie-in with");
                } else {
                    datatable.query(mainboardquery.query4, [req.cookies.prattleuser, username], async (error, result) => {
                        if (error) {
                            console.log(error);
                            res.send("something gone wrong to tie-in with");
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
        console.log("something gone wrong");
    }
}

module.exports = { controller1, controller2, controller3, controller4 }