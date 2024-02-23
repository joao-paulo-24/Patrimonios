var express = require('express');
var router = express.Router();
var eventController = require('../controllers/eventController');
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.verifyLoginUser, eventController.showAll );
router.get('/show/:id', sessionController.verifyLoginUser, eventController.show );
router.get('/create', sessionController.verifyLoginUser, eventController.formCreate);
router.post('/create', sessionController.verifyLoginUser, eventController.create);
router.get('/edit/:id', sessionController.verifyLoginUser, eventController.formEdit);
router.post('/edit/:id', sessionController.verifyLoginUser, eventController.edit);
router.get('/delete/:id', sessionController.verifyLoginUser, eventController.delete );
  
module.exports = router;