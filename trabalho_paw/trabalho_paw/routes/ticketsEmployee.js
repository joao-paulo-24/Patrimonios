var express = require('express');
var router = express.Router();
var ticketsEmployeeController = require('../controllers/ticketsEmployeeController');
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.verifyLoginUser,  ticketsEmployeeController.showAll );
router.get('/show/:id', sessionController.verifyLoginUser,  ticketsEmployeeController.show );
router.get('/purchase', sessionController.verifyLoginUser,  ticketsEmployeeController.formPurchase);
router.post('/purchase', sessionController.verifyLoginUser,  ticketsEmployeeController.purchase);
router.get('/delete/:id', sessionController.verifyLoginUser,  ticketsEmployeeController.delete);
  
module.exports = router;