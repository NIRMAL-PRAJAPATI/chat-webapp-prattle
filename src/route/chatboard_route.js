const { Router } = require("express");
const router = Router();
const chatboardcontroller = require('../controller/chatboard_controller');

router.get('/:user1/:user2', chatboardcontroller.controller1);

module.exports = router;