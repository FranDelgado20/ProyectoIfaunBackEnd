const ModeloUsuario = require("../models/usuarios");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer')
const getAllUsers = async (req, res) => {
  try {
    const getUsers = await ModeloUsuario.find();
    res
      .status(200)
      .json({ msg: "Usuarios encontrados correctamente", getUsers });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo encontrar a los usuarios", error });
  }
};
const getOneUser = async (req, res) => {
  try {
    const getUser = await ModeloUsuario.findOne({ _id: req.params.id });
    res.status(200).json({ msg: "Se encontro el usuario", getUser });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo encontrar el usuario", error });
  }
};
const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }

  try {
    const userExist = await ModeloUsuario.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(500).json({ msg: "El usuario ya existe" });
    }
    const newUser = new ModeloUsuario(req.body);
    const salt = await bcrypt.genSaltSync();
    newUser.pass = await bcrypt.hash(req.body.pass, salt);
    await newUser.save();
    res.status(201).json({ msg: "Usuario creado correctamente", newUser });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear el usuario", error });
  }
};
const editUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const updateUser = await ModeloUsuario.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "Se editó correctamente el usuario", updateUser });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo editar el usuario", error });
  }
};

const deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const removeUser = await ModeloUsuario.findByIdAndDelete({
      _id: req.params.id,
    });
    res
      .status(200)
      .json({ msg: "Usuario eliminado correctamente", removeUser });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el usuario", error });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const userExist = await ModeloUsuario.findOne({ email: req.body.email });
    if (!userExist) {
      return res.status(422).json({ msg: "El usuario no existe" });
    }
    const passCheck = await bcrypt.compare(req.body.pass, userExist.pass);
    if (passCheck) {
      const payload_jwt = {
        user: {
          id: userExist._id,
          role: userExist.role,
        },
      };
      const token = jwt.sign(payload_jwt, process.env.SECRET_KEY);

      res.status(200).json({ msg: "Usuario logueado", userExist, token });
    } else {
      res.status(400).json({ msg: "Usuario y/o contraseña incorrecta" });
    }
  } catch (error) {
    res.status(500).json({ msg: "No se pudo loguear el usuario", error });
  }
};

const subirImagen = async(req, res) => {
  try {
    res.status(200).json({msg:'Imagen cargada'})
  } catch (error) {
    res.status(500).json({msg: "No se pudo cargar la imagen"})
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
  loginUser,
  subirImagen
};
