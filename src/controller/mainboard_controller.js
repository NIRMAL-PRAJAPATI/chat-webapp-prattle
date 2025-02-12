const datatable = require('../db');
const mainboardquery = require('../query/mainboard_query');

const controller1 = (req, res) => {
    datatable.query(mainboardquery.query2, [req.cookies.prattleuser], (error1, result1) => {
        if(result1) {
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

const controller2 = (req, res) => {
    res.clearCookie('prattleuser');
    res.redirect('/')
}

const controller3 = (req, res) => {
    const { username } = req.body;
    console.log("i am " + username);

    datatable.query(mainboardquery.query3, [username, req.cookies.prattleuser], (error, result) => {
        console.log(result.rows[0].exists);

        if(result.rows[0].exists) {
            res.redirect('/mainboard');
        } else {
            datatable.query(mainboardquery.query4, [username, req.cookies.prattleuser], (error, result) => {
                if(error) {
                    console.log(error);
                    res.send("something gone wrong to chat with them");
                } else {
                    res.redirect('/mainboard');
                }
            })
        }
    })
}

module.exports = { controller1, controller2, controller3 }