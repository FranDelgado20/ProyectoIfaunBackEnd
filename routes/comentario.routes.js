const express = require("express");
const validarCampos = require("../middleware/validar-campos");
const {
  listarTodosComentarios,
  crearComentario,
  obtenerComentario,
  activarComentario,
  borrarComentario,
  listarComentariosMostrables,
  permaBorrarComentario,
} = require("../controllers/comentario.controller");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router
  .route("/")
  .get(listarTodosComentarios)
  .post(
    [
      check("nombreUsuario")
        .notEmpty()
        .withMessage("El nombre del usuario es un dato obligatorio"),
      check("fotoDePerfil")
        .notEmpty()
        .withMessage("La foto de perfil del usuario es un dato obligatorio"),
      check("comentario")
        .notEmpty()
        .withMessage("El comentario es un dato obligatorio")
        .isLength({ min: 10, max: 300 })
        .withMessage("El comentario debe contener entre 10 y 300"),
      check("fecha")
        .notEmpty()
        .withMessage("La fecha es un dato obligatorio")
        .isLength({ min: 1 })
        .withMessage("La fecha debe contener como minimo 1 caracter"),
      validarCampos,
    ],
    crearComentario
  );

router.route("/mostrables").get(listarComentariosMostrables);

router.delete("/perma-delete/:id", auth("admin"), permaBorrarComentario)

router
  .route("/:id")
  .get(obtenerComentario)
  .put(activarComentario)
  .delete(borrarComentario);

module.exports = router;
