var express = require('express');
var router = express.Router();
var sessionController = require('../controllers/sessionController');

router.post("/login", sessionController.loginREST);
router.post("/register", sessionController.createREST);

module.exports = router;
