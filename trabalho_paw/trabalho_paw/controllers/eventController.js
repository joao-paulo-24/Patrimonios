var mongoose = require("mongoose");
var Event = require("../models/events");
const patrimonio = require("../models/patrimonio");

var eventController = {};

// mostra todos os eventos
eventController.showAll = function (req, res) {
  Event.find({})
    .populate("patrimonio")
    .exec((err, dbevents) => {
      if (err) {
        console.log("Erro a ler");
        res.redirect("/error");
      } else {
        res.render("events/eventsList", { events: dbevents });
      }
    });
};

// mostra 1 evento por id
eventController.show = function (req, res) {
  Event.findOne({ _id: req.params.id })
    .populate("patrimonio")
    .exec((err, dbevents, dbpatrimonios) => {
      if (err) {
        console.log("Erro a ler");
        res.redirect("/error");
      } else {
        res.render("events/eventsViewDetails", {
          event: dbevents,
          patrimonio: dbpatrimonios,
        });
      }
    });
};

// form para criar 1 evento
eventController.formCreate = function (req, res) {
  patrimonio.find({}, (error, dbpatrimonios) => {
    if (error) {
      console.error(error);
      res.redirect("/error");
    } else {
      res.render("events/createEventForm", { patrimonio: dbpatrimonios });
    }
  });
};

// cria 1 evento como resposta a um post de um form
eventController.create = function (req, res) {
  var event = new Event(req.body);
  event.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/events");
    }
  });
};

// mostra 1 evento para edicao
eventController.formEdit = function (req, res) {
  patrimonio.find({}, (error, dbpatrimonios) => {
    if (error) {
      console.error(error);
      res.redirect("/error");
    } else {
      Event.findOne({ _id: req.params.id }).exec((err, dbevents) => {
        if (err) {
          console.log("Erro a ler");
          res.redirect("/error");
        } else {
          res.render("events/eventEditDetails", {
            event: dbevents,
            patrimonio: dbpatrimonios,
          });
        }
      });
    }
  });
};

// edita 1 evento como resposta a um post de um form editar
eventController.edit = function (req, res) {
  Event.findByIdAndUpdate(req.body._id, req.body, (err, editedEvent) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/events/show/" + req.body._id);
    }
  });
};

// elimina 1 evento
eventController.delete = function (req, res) {
  Event.remove({ _id: req.params.id }).exec((err) => {
    if (err) {
      console.log("Erro a ler");
    } else {
      res.redirect("/events");
    }
  });
};

////////////////// CONTROLLERS DA REST API //////////////////

// mostra todos os eventos e retorna um json
eventController.showAllREST = async (req, res) => {
  Event.find({}).exec((err, dbevents) => {
    res.json(dbevents);
  });
};

// mostra 1 evento por id e retorna um json
eventController.showREST = async function (req, res) {
  const filter = await Event.findOne({ _id: req.params.id });
  res.json(filter);
};

module.exports = eventController;
