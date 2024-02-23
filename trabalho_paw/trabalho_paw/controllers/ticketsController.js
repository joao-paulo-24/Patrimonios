var mongoose = require("mongoose");
var Tickets = require("../models/tickets");
var Events = require("../models/events");
var User = require("../models/user");

var ticketsController = {};

// mostra todos tickets
ticketsController.showAll = async function (req, res) {
  const myCookie = req.cookies["utilizador"];
  var currUser = await User.findOne({ _id: myCookie._id });

  Tickets.find({}).exec((err, dbtickets) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("tickets/ticketsList", {
        tickets: dbtickets,
        utilizador: currUser,
      });
    }
  });
};

// mostra 1 ticket por id
ticketsController.show = function (req, res) {
  Tickets.findOne({ _id: req.params.id }).exec((err, dbtickets) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("tickets/ticketViewDetails", {
        tickets: dbtickets,
      });
    }
  });
};

// form para criar 1 ticket
ticketsController.formPurchase = function (req, res) {
  Events.find({}, (error, dbevents) => {
    if (error) {
      console.error(error);
      res.redirect("/error");
    } else {
      res.render("tickets/purchaseTicket", { events: dbevents });
    }
  });
};

// cria 1 ticket como resposta a um post de um form
ticketsController.purchase = async function (req, res) {
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
      const updatedUser = await User.findByIdAndUpdate(_id, currUser);
      res.redirect("/tickets");
    }
  });
};

// elimina 1 ticket
ticketsController.delete = async function (req, res) {
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
        res.redirect("/tickets");
      }
    });
  } else {
    res.redirect("/tickets");
  }
};

////////////////// CONTROLLERS DA REST API //////////////////

// mostra todos tickets e retorna um json
ticketsController.showAllREST = async (req, res) => {
  Tickets.find({}).exec((err, dbtickets) => {
    res.json(dbtickets);
  });
};

// mostra 1 ticket por id e retorna um json
ticketsController.showREST = async (req, res) => {
  const filter = await Tickets.findOne({ _id: req.params.id });
  res.json(filter);
};
ticketsController.atualizarUserRest = async (req, res) => {
  const { _id, nome, email, userName, password, tipoUser, pontos, bilhetes } =
    req.body;
  const attUser = {
    _id,
    nome,
    email,
    userName,
    password,
    tipoUser,
    pontos,
    bilhetes,
  };
  const updatedUser = await User.findByIdAndUpdate(_id, attUser);
  var user = updatedUser;
};
ticketsController.atualizarUserRestRemove = async (req, res) => {
  const { _id, nome, email, userName, password, tipoUser, pontos, bilhetes } =
    req.body;
  const attUser = {
    _id,
    nome,
    email,
    userName,
    password,
    tipoUser,
    pontos,
    bilhetes,
  };
  const updatedUser = await User.findByIdAndUpdate(_id, attUser);
};
// cria 1 ticket como resposta a um post de um form e retorna um json
ticketsController.purchaseREST = function (req, res) {
  var { eventoNome, clientNIF, quantidade, pontos } = req.body;

  var ticket = new Tickets();
  ticket.eventoNome = eventoNome;
  if (clientNIF === null) {
    ticket.clientNIF = 999999999;
  }
  ticket.clientNIF = clientNIF;
  ticket.quantidade = quantidade;
  ticket.pontos = pontos;

  ticket.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      next(err);
    } else {
      res.json(ticket);
    }
  });
};

// elimina 1 ticket e retorna um json
ticketsController.deleteREST = async (req, res) => {
  try {
    const deleteTicket = await Tickets.findById(req.params.id);

    await Tickets.findByIdAndRemove(req.params.id);
    res.status(200).json({
      msg:
        "O ticket com o nif " +
        deleteTicket.clientNIF +
        ", correspondente ao evento " +
        deleteTicket.eventoNome +
        " foi apagado com sucesso",
    });
  } catch {
    res.status(400).json({
      error: 1,
      msg: "O ticket não existe",
    });
  }
};
module.exports = ticketsController;
