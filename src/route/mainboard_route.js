const { Router } = require('express');
const router = Router();
const mainboardcontroller = require('../controller/mainboard_controller');
const checkcookie = require('../middleware/checkcookie');

router.get("/", checkcookie, mainboardcontroller.controller1);
router.get("/logout", mainboardcontroller.controller2);

module.exports = router;