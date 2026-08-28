const { Router } = require("express");
const router = Router();
const chatboardcontroller = require('../controller/chatboard_controller');
// BUG FIX: Chatboard had NO authentication — anyone could access /chatboard/userA/userB
const checkcookie = require('../middleware/checkcookie');

router.get('/:user1/:user2', checkcookie, chatboardcontroller.controller1);

module.exports = router;