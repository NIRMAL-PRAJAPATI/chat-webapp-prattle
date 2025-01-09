const datatable = require('../model/user_model');
const mainboardquery = require('../query/mainboard_query');

const controller1 = (req, res) => {
    datatable.query(mainboardquery.query2, [req.cookies.prattleuser], (error1, result1) => {
        if(result1) {
        datatable.query(mainboardquery.query1, [req.cookies.prattleuser], (error2, result2) => {
            if (result2) {
                res.render('main_board', { loggedusername: req.cookies.prattleuser, users: result2.rows, loggeduserfollowing: result1.rows[0].followed_user });
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

module.exports = { controller1, controller2 }