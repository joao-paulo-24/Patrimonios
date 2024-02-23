var express = require('express');
var router = express.Router();
var patrimonioEmployeeController = require('../controllers/patrimonioEmployeeController');
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.verifyLoginUser, patrimonioEmployeeController.showAll );
router.get('/show/:id', sessionController.verifyLoginUser, patrimonioEmployeeController.show );
  
module.exports = router;