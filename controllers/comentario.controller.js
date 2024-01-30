const Comentario = require("../models/comentario");

const listarTodosComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find();
    res.status(200).json(comentarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener la lista de comentarios",
    });
  }
};
const crearComentario = async (req, res) => {
  try {
    const comentarioNuevo = new Comentario(req.body);
    await comentarioNuevo.save();
    res.status(201).json({
      mensaje: "El comentario fue creado correctamente",
    });
  } catch (error) {
    console.error;
    res.status(500).json({
      mensaje: "Error al intentar agregar un comentario",
    });
  }
};

const obtenerComentario = async (req, res) => {
  try {
    const comentarioBuscado = await Comentario.findById(req.params.id);
    res.status(200).json(comentarioBuscado);
  } catch (error) {
    console.error;
    res.status(500).json({
      mensaje: "Error al obtener el comentario deseado",
    });
  }
};

const activarComentario = async (req, res) => {
  try {
    const { id } = req.params;

    const query = { mostrar: "Si" };
    const comentarioActivado = await Comentario.findByIdAndUpdate(id, query, {
      new: true,
    });

    res.status(200).json({
      msg: "Comentario activado de la base de datos",
      comentarioActivado,
    });
  } catch (error) {
    console.error;
  }
};

const borrarComentario = async (req, res) => {
  try {
    const { id } = req.params;

    const query = { mostrar: "No" };
    const comentarioBorrado = await Comentario.findByIdAndUpdate(id, query, {
      new: true,
    });

    res.status(200).json({
      msg: "Comentario desactivado de la base de datos",
      comentarioBorrado,
    });
  } catch (error) {
    console.error;
  }
};

const permaBorrarComentario = async (req, res) => {
  try {
    const { id } = req.params;

    await Comentario.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "Comentario eliminado correctamente", status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el comentario", error });
  }
};

const listarComentariosMostrables = async (req, res) => {
  try {
    const comentariosMostrables = await Comentario.find({
      mostrar: "Si",
    });
    res.status(200).json(comentariosMostrables);
  } catch (error) {
    console.error;
    res.status(500).json({
      mensaje: "Error al intentar buscar los comentarios mostrables",
    });
  }
};

module.exports = {
  listarTodosComentarios,
  crearComentario,
  obtenerComentario,
  activarComentario,
  borrarComentario,
  listarComentariosMostrables,
  permaBorrarComentario,
};
