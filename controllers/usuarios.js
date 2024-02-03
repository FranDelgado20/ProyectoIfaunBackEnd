const ModeloUsuario = require("../models/usuarios");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinaryConfig");
const streamifier = require("streamifier");
const sharp = require("sharp");
const Comentario = require("../models/comentario");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await ModeloUsuario.find();
    res.status(200).json({
      msg: "Usuarios encontrados correctamente",
      allUsers,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo encontrar a los usuarios", error });
  }
};
const getOneUser = async (req, res) => {
  try {
    const oneUser = await ModeloUsuario.findOne({ _id: req.params.id });
    res
      .status(200)
      .json({ msg: "Se encontro el usuario", oneUser, status: 200 });
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
    res.status(200).json({
      msg: "Se editó correctamente el usuario",
      updateUser,
      status: 200,
    });
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
    await ModeloUsuario.findByIdAndDelete({
      _id: req.params.id,
    });
    res
      .status(200)
      .json({ msg: "Usuario eliminado correctamente", status: 200 });
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

      res
        .status(200)
        .json({ msg: "Sesión iniciada correctamente", userExist, token });
    } else {
      res.status(400).json({ msg: "Usuario y/o contraseña incorrectos" });
    }
  } catch (error) {
    res.status(500).json({ msg: "No se pudo iniciar sesión", error });
  }
};

const actualizarImgUsuario = async (req, res) => {
  let procesandoImagen = false;
  try {
    if (procesandoImagen) {
      return res.status(400).json({ msg: "La imagen ya se está procesando" });
    }

    procesandoImagen = true;
    const user = await ModeloUsuario.findOne({ _id: req.params.id });
    const comment = await Comentario.findOne({ email: user.email });

    if (!user) return res.status(422).json({ msg: "El usuario no existe" });

    if (user.img !== "http://imgfz.com/i/SjUn0zM.png") {
      const oldImg = user.img.split("/")[7].split(".")[0];
      await cloudinary.uploader.destroy(oldImg);
    }

    const processedImageBuffer = await sharp(req.file.buffer)
      .resize(350, 350)
      .toBuffer();

    let cloud = cloudinary.uploader.upload_stream(
      {
        format: "png",
      },
      async function (error, result) {
        if (error) console.log(error);
        else {
          user.img = result.secure_url;
          await user.save();
          if (comment) {
            comment.fotoDePerfil = result.secure_url;
            await comment.save();
          }
          res.status(200).json({
            msg: "Imagen actualizada correctamente",
            user,
            status: 200,
          });
        }
      }
    );
    streamifier.createReadStream(processedImageBuffer).pipe(cloud);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al subir la imagen", error });
  }
};
const editPass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const user = await ModeloUsuario.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(422).json({ msg: "El usuario no existe" });
    }
    const passCheck = await bcrypt.compare(req.body.actualPass, user.pass);
    const salt = await bcrypt.genSaltSync();

    if (!passCheck) {
      return res
        .status(401)
        .json({ msg: "Las contraseñas nueva y actual no coinciden" });
    }
    user.pass = await bcrypt.hash(req.body.pass, salt);
    await user.save();
    res
      .status(200)
      .json({ msg: "Contrasña modificada con éxito", status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar la contraseña" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
  loginUser,
  actualizarImgUsuario,
  editPass,
};
