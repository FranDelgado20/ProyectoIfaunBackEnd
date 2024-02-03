const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
  actualizarImgUsuario,
  loginUser,
  editPass,
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const { upload } = require("../utils/multer");

router.get("/", auth("admin"), getAllUsers);
router.get(
  "/:id", auth("user"),
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
router.post(
  "/login",
  [
    check("email", "El campo correo electrónico está vacío"),
    check("pass", "El campo contraseña está vacío"),
  ],
  loginUser
);
router.put(
  "/upload/:id", auth("user"),
  [
    check("img", "El campo de imagen está vacío").notEmpty(),
    check("id", "Formato de ID inválido").isMongoId(),
  ],
  upload.single("file"),
  actualizarImgUsuario
);
router.put(
  "/editPass/:id",
  auth("user"),
  check("id", "Formato de ID inválido").isMongoId(),
  check("pass", "El campo nueva contraseña está vacío"),
  check("actualPass", "El campo contraseña actual está vacío"),

  editPass
);
router.put(
  "/:id",
  auth(["user", "admin"]),
  [check("id", "Formato de ID inválido").isMongoId()],
  editUser
);

router.delete(
  "/:id",
  auth("admin"),
  [check("id", "Formato de ID inválido").isMongoId()],
  deleteUser
);

module.exports = router;
