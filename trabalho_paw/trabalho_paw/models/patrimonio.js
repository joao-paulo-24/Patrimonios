var mongoose = require("mongoose");

var PatrimonioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  avaliacao: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  localizacao: {
    type: String,
    required: true,
  },
  localizacaoNome: {
    type: String,
    required: true,
  },
  localizacaoCodigoPostal: {
    type: String,
    required: true,
  },
  localizacaoCidade: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Patrimonio", PatrimonioSchema);
