var mongoose = require("mongoose");
var Patrimonio = require("../models/patrimonio");
var path = require("path");
var fs = require("fs");
const { response } = require("../app");

var patrimonioController = {};

// mostra todos patrimonios
patrimonioController.showAll = function (req, res) {
  Patrimonio.find({}).exec((err, dbpatrimonios) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("patrimonios/patrimoniosList", { patrimonios: dbpatrimonios });
    }
  });
};

// mostra 1 patrimonio por id
patrimonioController.show = function (req, res) {
  Patrimonio.findOne({ _id: req.params.id }).exec((err, dbpatrimonios) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("patrimonios/patrimonioViewDetails", {
        patrimonio: dbpatrimonios,
      });
    }
  });
};

// form para criar 1 patrimonio
patrimonioController.formCreate = function (req, res) {
  res.render("patrimonios/createForm");
};

// cria 1 patrimonio como resposta a um post de um form
patrimonioController.create = function (req, res, next) {
  var patrimonio = new Patrimonio(req.body);
  var fileDestination = path.join(__dirname, "..", "tmp", req.file.filename);
  var fileContent = null;
  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(fileDestination, data, function (err) {
      if (err) {
        console.log("err");
      }
    });
  });
  patrimonio.file = req.file.filename;
  patrimonio.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/patrimonios");
    }
  });
};

// mostra 1 patrimonio para edicao
patrimonioController.formEdit = function (req, res) {
  Patrimonio.findOne({ _id: req.params.id }).exec((err, dbpatrimonio) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("patrimonios/patrimonioEditDetails", {
        patrimonio: dbpatrimonio,
      });
    }
  });
};

// edita 1 patrimonio como resposta a um post de um form editar
patrimonioController.edit = function (req, res) {
  Patrimonio.findByIdAndUpdate(
    req.body._id,
    req.body,
    (err, editedPatrimonio) => {
      if (err) {
        console.log("Erro a gravar");
        res.redirect("/error");
      } else {
        res.redirect("/patrimonios/show/" + req.body._id);
      }
    }
  );
};

// elimina 1 patrimonio
patrimonioController.delete = function (req, res) {
  Patrimonio.remove({ _id: req.params.id }).exec((err) => {
    if (err) {
      console.log("Erro a ler");
    } else {
      res.redirect("/patrimonios");
    }
  });
};

////////////////// CONTROLLERS DA REST API //////////////////

// mostra todos patrimonios e retorna um json
patrimonioController.showAllREST = function (req, res) {
  Patrimonio.find({}).exec((err, dbpatrimonios) => {
    res.json(dbpatrimonios);
  });
};

// mostra 1 patrimonio por id e retorna um json
patrimonioController.showREST = async function (req, res) {
  const filter = await Patrimonio.findOne({ _id: req.params.id });
  res.json(filter);
};

module.exports = patrimonioController;
