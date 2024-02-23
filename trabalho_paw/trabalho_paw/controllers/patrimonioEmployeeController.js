var mongoose = require("mongoose");
var Patrimonio = require("../models/patrimonio");

var patrimonioEmployeeController = {};

// mostra todos patrimonios
patrimonioEmployeeController.showAll = function (req, res) {
  Patrimonio.find({}).exec((err, dbpatrimonios) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("patrimoniosEmployee/patrimoniosListEmployee", { patrimonios: dbpatrimonios });
    }
  });
};

// mostra 1 patrimonio por id
patrimonioEmployeeController.show = function (req, res) {
  Patrimonio.findOne({ _id: req.params.id }).exec((err, dbpatrimonios) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("patrimoniosEmployee/patrimonioViewDetails", {
        patrimonio: dbpatrimonios,
      });
    }
  });
};

module.exports = patrimonioEmployeeController;
