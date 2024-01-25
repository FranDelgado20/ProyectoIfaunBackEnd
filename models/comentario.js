const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema({
  nombreUsuario: {
    type: String,
    required: true,
  },
  fotoDePerfil: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true,
  },
  comentario: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 3000,
  },
  mostrar: {
    type: String,
    default: "No",
  },
});

const Comentario = mongoose.model("comentario", comentarioSchema);

module.exports = Comentario;
