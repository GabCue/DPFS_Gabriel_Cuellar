const multer = require("multer");
const path = require("path");

const storageProd = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/products")); // carpeta donde se guardan las imágenes de productos
  },
  filename: function (req, file, cb) {
    const fileName = "prod-" + Date.now() + path.extname(file.originalname); // nombre único
    cb(null, fileName);
  },
});

const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/users")); // carpeta donde se guardan los avatares de usuarios
  },
  filename: function (req, file, cb) {
    const fileName = "avatar-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const uploadProd = multer({ storage: storageProd });
const uploadUser = multer({ storage: storageUser });

module.exports = {
  uploadProd,
  uploadUser,
};
