const express = require("express");
const {
  getAllUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const router = express.Router();

router.get("/", getAllUsers);
router.get(
  "/:id",
  [check("id", "El id del usuario es incorrecto").isMongoId()],
  getOneUser
);
router.post(
  "/",
  [
    check("fullName", "El campo username está vacio").notEmpty(),
    check("email", "El campo email está vacio").notEmpty(),
    check("email", "El campo email está invalido").isEmail(),
    check("pass", "El campo contraseña está vacio").notEmpty(),
    
  ],
  createUser
);
router.put(
  "/:id",
  [check("id", "El id del usuario es incorrecto").isMongoId()],
  editUser
);
router.delete(
  "/:id",
  [check("id", "El id del usuario es incorrecto").isMongoId()],
  deleteUser
);
