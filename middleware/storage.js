const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = __dirname + '/../public/uploads'
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    if (file !== null) {
      const ext = file.originalname.split(".").pop();
      cb(null, `${Date.now()}.${ext}`);
    }
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
  storage,
};
