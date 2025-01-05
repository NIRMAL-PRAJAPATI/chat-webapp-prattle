const { Router } = require('express');
const router = Router();
const logincontroller = require('../controller/loginuser_controller');

router.post("/", logincontroller.controller1);
router.post("/create", logincontroller.controller2);

module.exports = router;