var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController');

/* GET home page. */
router.get('/', sessionController.verifyLoginUser,  function(req, res, next) {
  res.render('paginainicial/index', { title: 'Menu Inicial' });
});
router.get('/admin', sessionController.verifyLoginUser, function(req, res, next) {
  res.render('paginainicial/index', { title: 'Menu Inicial' })
});
router.get('/emp', sessionController.verifyLoginUser, function(req, res, next) {
  res.render('paginainicial/indexEmployee', { title: 'Menu Inicial' })
});

module.exports = router;
