var express = require('express');
var router = express.Router();
var ticketsController = require('../controllers/ticketsController');
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.verifyLoginUser,  ticketsController.showAll );
router.get('/show/:id', sessionController.verifyLoginUser,  ticketsController.show );
router.get('/purchase', sessionController.verifyLoginUser,  ticketsController.formPurchase);
router.post('/purchase', sessionController.verifyLoginUser,  ticketsController.purchase);
router.get('/delete/:id', sessionController.verifyLoginUser,  ticketsController.delete);
  
module.exports = router;