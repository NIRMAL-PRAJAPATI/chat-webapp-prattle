const {Router} = require('express');
const router = Router();
const controller = require('../controller/user_controller');

router.get("/", controller.controller1);
router.get("/:id", controller.controller2);
router.get("/find/:username", controller.controller3);
router.post("/add", controller.controller4);

module.exports = router;