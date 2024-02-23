var express = require('express');
var router = express.Router();
var patrimonioController = require('../controllers/patrimonioController');
var sessionController = require('../controllers/sessionController');

router.get('/', sessionController.verifyLoginUserREST, patrimonioController.showAllREST );
router.get('/show/:id', sessionController.verifyLoginUserREST, patrimonioController.showREST );

  
module.exports = router;