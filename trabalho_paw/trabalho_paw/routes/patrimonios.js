var express = require('express');
var router = express.Router();
var patrimonioController = require('../controllers/patrimonioController');
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.verifyLoginUser, patrimonioController.showAll );
router.get('/show/:id', sessionController.verifyLoginUser, patrimonioController.show );
router.get('/create', sessionController.verifyLoginUser, patrimonioController.formCreate);
router.post('/create', sessionController.verifyLoginUser, patrimonioController.create);
router.get('/edit/:id', sessionController.verifyLoginUser, patrimonioController.formEdit);
router.post('/edit/:id', sessionController.verifyLoginUser, patrimonioController.edit);
router.get('/delete/:id', sessionController.verifyLoginUser, patrimonioController.delete );
  
module.exports = router;