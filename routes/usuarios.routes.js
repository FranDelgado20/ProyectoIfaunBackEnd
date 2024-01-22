const express = require("express");

const {
  getAllUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
  actualizarImgUsuario,
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const { upload } = require("../middleware/storage");
const multer = require("../utils/multer");
const router = express.Router();

router.get("/", getAllUsers);
router.get(
  "/:id",
  [check("id", "Formato de ID inválido").isMongoId()],
  getOneUser
);
router.post(
  "/",
  [
    check("fullName", "El campo nonbre y apellido está vacio").notEmpty(),
    check("email", "El campo email está vacio").notEmpty(),
    check("email", "El campo email está invalido").isEmail(),
    check("pass", "El campo contraseña está vacio").notEmpty(),
  ],
  createUser
);
router.put(
  "/upload/:id",
  [
    check("img", "El campo de imagen está vacío").notEmpty(),
    check("id", "Formato de ID inválido").isMongoId(),
  ],
  multer.single("file"),
  actualizarImgUsuario
);
router.put(
  "/:id",
  [check("id", "Formato de ID inválido").isMongoId()],
  upload.single("file"),
  editUser
);
router.delete(
  "/:id",
  [check("id", "Formato de ID inválido").isMongoId()],
  deleteUser
);

module.exports = router;
