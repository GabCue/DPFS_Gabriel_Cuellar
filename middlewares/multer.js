const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/products"));  // Ruta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);  // Obtener la extensión del archivo
    cb(null, Date.now() + fileExtension);  // Nombre único basado en la fecha
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
