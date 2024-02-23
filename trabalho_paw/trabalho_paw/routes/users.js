var express = require('express');
var router = express.Router();
var sessionController = require('../controllers/sessionController');

router.get("/login", sessionController.login);
router.post("/loginSub", sessionController.loginSub);
router.get("/registoUser", sessionController.registo);
router.post("/createUser", sessionController.create);
router.get("/logout", sessionController.logout);

module.exports = router;
