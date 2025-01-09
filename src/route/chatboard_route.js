const { Router } = require("express");
const router = Router();
const chatboardcontroller = require('../controller/chatboard_controller');

router.post('/:username', chatboardcontroller.controller1);

module.exports = router;