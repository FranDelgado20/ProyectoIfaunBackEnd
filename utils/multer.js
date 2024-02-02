const multer = require("multer");

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("El tipo de archivo es inválido"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = {
  storage,
  upload,
};
