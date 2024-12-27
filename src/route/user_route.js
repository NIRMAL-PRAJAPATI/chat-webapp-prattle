const {Router} = require('express');
const user_router = Router();

user_router.get("/", (req, res) => {
    res.send("this is user data router using API");
});

module.exports = user_router;