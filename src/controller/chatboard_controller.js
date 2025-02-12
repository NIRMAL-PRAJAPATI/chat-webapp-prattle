const datatable = require('../db');
const loginquery = require('../query/loginuser_query');

const controller1 = (req, res) => {
    try {
    let { user1, user2} = req.params;
    console.log("i ammm " + user2);
    if(user2 == "Prattle AI") {
        let roomId = "prattle AI";
        let userDetails =  {
            id: "0",
            username: "Prattle AI",
            joining_date: "Mon May 23 2005 09:16:42 GMT+0530 (India Standard Time)",
            followed_user: []
        }

        res.render('chatboard', {roomId, user1, user2, userDetails});
    }
    const roomId = [user1, user2].sort().join("_chats_");

    console.log(roomId);
    datatable.query(loginquery.query1, [user2], (err, result) => {
    res.render('chatboard', {roomId, user1, user2, userDetails: result.rows[0]});
    })
} catch (err) {
    console.log(err);
    res.redirect('/mainboard');
}
}
module.exports = { controller1 };