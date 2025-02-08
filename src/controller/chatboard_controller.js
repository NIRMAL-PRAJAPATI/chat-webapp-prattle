const controller1 = (req, res) => {
    let { user1, user2} = req.params;
    const roomId = [user1, user2].sort().join("_chats_");

    console.log(roomId);
    res.render('chatboard', {roomId, user1, user2});
}

module.exports = { controller1 };