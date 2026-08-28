const checkcookie = (req, res, next) => {
    // BUG FIX: Check both signed and unsigned cookies for backward compatibility
    const loggedUser = req.signedCookies.prattleuser || req.cookies.prattleuser;

    if(loggedUser) {
        // Store the authenticated username on req for easy access in controllers
        req.loggedUser = loggedUser;
        next();
    } else {
        res.status(401).render('error', { errorCode: 401, errorHeading: "Login/Register Required !", errorDescription: "Sorry, the page you are looking for is available after you login or register first." });
    }
}

module.exports = checkcookie;