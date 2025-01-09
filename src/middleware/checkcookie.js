const checkcookie = (req, res, next) => {

    if(req.cookies.prattleuser) {
        next();
    } else {
        res.status(400).send("you need to login/Register first !")
    }
}

module.exports = checkcookie;