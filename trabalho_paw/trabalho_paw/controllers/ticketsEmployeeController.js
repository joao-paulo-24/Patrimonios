var mongoose = require("mongoose");
var Tickets = require("../models/tickets");
var Events = require("../models/events");
var User = require("../models/user");

var ticketsEmployeeController = {};

// mostra todos tickets
ticketsEmployeeController.showAll = async function (req, res) {
  const myCookie = req.cookies["utilizador"];
  var currUser = await User.findOne({ _id: myCookie._id });
  Tickets.find({}).exec((err, dbtickets) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("ticketsEmployee/ticketsListEmployee", {
        tickets: dbtickets,
        utilizador: currUser,
      });
    }
  });
};

// mostra 1 ticket por id
ticketsEmployeeController.show = function (req, res) {
  Tickets.findOne({ _id: req.params.id }).exec((err, dbtickets) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("ticketsEmployee/ticketViewDetails", {
        tickets: dbtickets,
      });
    }
  });
};

// form para criar 1 ticket
ticketsEmployeeController.formPurchase = function (req, res) {
  Events.find({}, (error, dbevents) => {
    if (error) {
      console.error(error);
      res.redirect("/error");
    } else {
      res.render("ticketsEmployee/purchaseTicket", { events: dbevents });
    }
  });
};

// cria 1 ticket como resposta a um post de um form
ticketsEmployeeController.purchase = async function (req, res) {
  var tickets = new Tickets(req.body);
  if (
    tickets.clientNIF == null ||
    tickets.clientNIF < 100000000 ||
    tickets.clientNIF > 999999999
  ) {
    tickets.clientNIF = 999999999;
  }
  const myCookie = req.cookies["utilizador"];
  var currUser = await User.findOne({ _id: myCookie._id });

  tickets.save(async (err) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      currUser.bilhetes.push(tickets);
      currUser.pontos += tickets.pontos;
      console.log(currUser);
      const updatedUser = await User.findByIdAndUpdate(currUser._id, currUser);
      res.redirect("/ticketsEmployee");
    }
  });
};

// elimina 1 ticket
ticketsEmployeeController.delete = async function (req, res) {
  const myCookie = req.cookies["utilizador"];
  var currUser = await User.findOne({ _id: myCookie._id });
  var bilhetes = currUser.bilhetes;

  const bilheteRemovido = bilhetes.find(
    (bilhete) => bilhete._id.toString() === req.params.id
  );
  if (bilheteRemovido) {
    bilhetes.splice(bilhetes.indexOf(bilheteRemovido), 1);
    currUser.save();
  }
  if (bilheteRemovido != undefined) {
    Tickets.remove({ _id: req.params.id }).exec((err) => {
      if (err) {
        console.log("Erro a ler");
      } else {
        res.redirect("/ticketsEmployee");
      }
    });
  } else {
    res.redirect("/ticketsEmployee");
  }
};

module.exports = ticketsEmployeeController;
