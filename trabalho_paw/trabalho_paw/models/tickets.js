var mongoose = require("mongoose");

var TicketSchema = new mongoose.Schema({
  eventoNome: {
    type: String,
    required: true,
  },
  clientNIF: {
    type: Number,
  },
  pontos: {
    type: Number,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
