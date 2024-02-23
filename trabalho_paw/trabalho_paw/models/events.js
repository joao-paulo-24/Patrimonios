var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  preco: {
    type: String,
  },
  precoBilhetes: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  patrimonio: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Patrimonio',
  },
});

module.exports = mongoose.model("Evento", EventSchema);
