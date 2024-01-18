const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/uploads");
  },
  filename: (req, file, cb) => {
    if (!file) {
      const ext = file.originalName.split(".").pop();
      cb(null, `${Date.now()}.${ext}`);
    }
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
  storage,
};
