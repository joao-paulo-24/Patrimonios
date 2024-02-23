var express = require("express");
var router = express.Router();
var ticketsController = require("../controllers/ticketsController");
var sessionController = require("../controllers/sessionController");

router.get("/", sessionController.verifyLoginUserREST, ticketsController.showAllREST);
router.get("/show/:id", sessionController.verifyLoginUserREST, ticketsController.showREST);
router.post("/purchase", sessionController.verifyLoginUserREST, ticketsController.purchaseREST);
router.delete("/delete/:id", sessionController.verifyLoginUserREST, ticketsController.deleteREST);
router.post("/attUserTickets", sessionController.verifyLoginUserREST, ticketsController.atualizarUserRest);
router.post("/attUserTicketsRemove", sessionController.verifyLoginUserREST, ticketsController.atualizarUserRestRemove);

module.exports = router;
