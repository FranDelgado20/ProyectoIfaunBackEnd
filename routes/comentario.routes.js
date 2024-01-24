const express = require("express");
const validarCampos = require("../middleware/validar-campos");
const {
  listarTodosComentarios,
  crearComentario,
  obtenerComentario,
  activarComentario,
  borrarComentario,
} = require("../controllers/comentario.controller");
const router = express.Router();
const { check } = require("express-validator");

router
  .route("/")
  .get(listarTodosComentarios)
  .post([
      check("nombreUsuario")
        .notEmpty()
        .withMessage("El nombre del usuario es un dato obligatorio")
        .isLength({ min: 6 })
        .withMessage(
          "El nombre del producto debe contener como minimo 6 caracteres"
        ),
      check("comentario")
        .notEmpty()
        .withMessage("El comentario es un dato obligatorio")
        .isLength({ min: 2, max: 200 })
        .withMessage("El comentario debe contener entre 2 y 200"),
      check("fecha")
        .notEmpty()
        .withMessage("La fecha es un dato obligatorio")
        .isLength({ min: 1 })
        .withMessage("La fecha debe contener como minimo 1 caracter"),
      check("mostrar")
        .notEmpty()
        .withMessage("Mostrar es un dato obligatorio")
        .isIn(["Si", "No"])
        .withMessage("Mostrar debe ser correcta"),
      validarCampos,
    ],
    crearComentario
  );

router
  .route("/:id")
  .get(obtenerComentario)
  .put(activarComentario)
  .delete(borrarComentario);

module.exports = router;
