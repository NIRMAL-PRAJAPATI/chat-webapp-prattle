const checkcookie = (req, res, next) => {

    if(req.cookies.prattleuser) {
        next();
    } else {
        res.status(404).render('error', { errorCode: 404, errorHeading: "Login/Register Required !", errorDescription: "Sorry, the page you are looking for is available only for loggedin users." });
    }
}

module.exports = checkcookie;