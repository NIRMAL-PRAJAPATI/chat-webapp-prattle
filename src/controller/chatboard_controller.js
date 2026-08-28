const datatable = require('../db');
const loginquery = require('../query/loginuser_query');

const controller1 = async (req, res) => {
    try {
        let { user1, user2} = req.params;

        // BUG FIX: Authorization check — ensure the logged-in user is actually user1
        const loggedUser = req.loggedUser || req.signedCookies.prattleuser || req.cookies.prattleuser;
        if (loggedUser !== user1 && loggedUser !== user2) {
            return res.status(403).render('error', { errorCode: 403, errorHeading: "Access Denied!", errorDescription: "You are not authorized to view this conversation." });
        }

        if(user2 == "Prattle AI") {
            let roomId = "Prattle AI";
            let userDetails =  {
                id: 1,
                username: "Prattle AI",
                joining_date: "Mon May 23 2005 09:16:42 GMT+0530 (India Standard Time)",
                followed_user: []
            }
            res.render('chatboard', {roomId, user1, user2, userDetails});
        } else {
            const roomId = [user1, user2].sort().join("_chats_");
            const result = await datatable.query(loginquery.query1, [user2]);

            // BUG FIX: Handle case where target user doesn't exist in DB
            if (!result.rows[0]) {
                return res.status(404).render('error', { errorCode: 404, errorHeading: "User Not Found!", errorDescription: "The user you are trying to chat with does not exist." });
            }

            res.render('chatboard', {roomId, user1, user2, userDetails: result.rows[0]});
        }
    } catch (err) {
        console.error("Chatboard error:", err);
        res.redirect('/mainboard');
    }
}
module.exports = { controller1 };