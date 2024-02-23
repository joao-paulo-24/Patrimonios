var mongoose = require("mongoose");
var Event = require("../models/events");
var patrimonio = require("../models/patrimonio");

var eventEmployeeController = {};

// mostra todos os eventos
eventEmployeeController.showAll = function (req, res) {
  Event.find({})
    .populate("patrimonio")
    .exec((err, dbevents) => {
      if (err) {
        console.log("Erro a ler");
        res.redirect("/error");
      } else {
        //console.log(dbevents);
        res.render("eventsEmployee/eventsList", { events: dbevents });
      }
    });
};

// mostra 1 evento por id
eventEmployeeController.show = function (req, res) {
  Event.findOne({ _id: req.params.id })
    .populate("patrimonio")
    .exec((err, dbevents, dbpatrimonios) => {
      if (err) {
        console.log("Erro a ler");
        res.redirect("/error");
      } else {
        res.render("eventsEmployee/eventsViewDetails", {
          event: dbevents,
          patrimonio: dbpatrimonios,
        });
      }
    });
};

// form para criar 1 evento
eventEmployeeController.formCreate = function (req, res) {
  patrimonio.find({}, (error, dbpatrimonios) => {
    if (error) {
      console.error(error);
      res.redirect("/error");
    } else {
      res.render("eventsEmployee/createEventForm", {
        patrimonio: dbpatrimonios,
      });
    }
  });
};

// cria 1 evento como resposta a um post de um form
eventEmployeeController.create = function (req, res) {
  var event = new Event(req.body);
  event.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/eventsEmployee");
    }
  });
};

// mostra 1 evento para edicao
eventEmployeeController.formEdit = function (req, res) {
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
          res.render("eventsEmployee/eventEditDetails", {
            event: dbevents,
            patrimonio: dbpatrimonios,
          });
        }
      });
    }
  });
};

// edita 1 evento como resposta a um post de um form editar
eventEmployeeController.edit = function (req, res) {
  Event.findByIdAndUpdate(req.body._id, req.body, (err, editedEvent) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/eventsEmployee/show/" + req.body._id);
    }
  });
};

// elimina 1 evento
eventEmployeeController.delete = function (req, res) {
  Event.remove({ _id: req.params.id }).exec((err) => {
    if (err) {
      console.log("Erro a ler");
    } else {
      res.redirect("/eventsEmployee");
    }
  });
};

module.exports = eventEmployeeController;
