const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.memoryStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("El tipo de archivo es inválido"), false);
      return;
    }
    cb(null, true);
  },
});
