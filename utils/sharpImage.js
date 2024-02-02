const sharp = require("sharp");
const path = require("path");

const helperImg = (filePath, fileName, size = 350) => {
  const uploadPath = __dirname + "/../public/optimized";
  const outputPath = path.join(uploadPath, fileName);
  return new Promise((resolve, reject) => {
    sharp(filePath)
      .resize(size, size)
      .toFile(outputPath, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(outputPath);
        }
      });
  });
};

module.exports = helperImg;
