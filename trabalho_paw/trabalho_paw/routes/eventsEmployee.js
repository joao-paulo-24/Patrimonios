var express = require('express');
var router = express.Router();
var eventEmployeeController = require('../controllers/eventEmployeeController');
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.verifyLoginUser, eventEmployeeController.showAll );
router.get('/show/:id', sessionController.verifyLoginUser, eventEmployeeController.show );
router.get('/create', sessionController.verifyLoginUser, eventEmployeeController.formCreate);
router.post('/create', sessionController.verifyLoginUser, eventEmployeeController.create);
router.get('/edit/:id', sessionController.verifyLoginUser, eventEmployeeController.formEdit);
router.post('/edit/:id', sessionController.verifyLoginUser, eventEmployeeController.edit);
router.get('/delete/:id', sessionController.verifyLoginUser, eventEmployeeController.delete );

module.exports = router;