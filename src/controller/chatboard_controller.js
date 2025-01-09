const controller1 = (req, res) => {
    let username = req.params.username;
    res.render('chatboard', {username});
}

module.exports = { controller1 };