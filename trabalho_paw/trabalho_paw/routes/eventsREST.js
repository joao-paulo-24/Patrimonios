var express = require('express');
var router = express.Router();
var eventController = require('../controllers/eventController');
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.verifyLoginUserREST, eventController.showAllREST );
router.get('/show/:id', sessionController.verifyLoginUserREST, eventController.showREST );

module.exports = router;