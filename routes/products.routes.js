const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controllers");
const multer = require("multer");
const upload = multer({ dest: "public/images/products" });

// Ruta para listar todos los productos
router.get("/", productsController.index);

router.get("/add", productsController.addForm);
router.post("/add", upload.single("imagen"), productsController.store);
router.get("/detail/:id", productsController.detail);
router.get("/edit/:id", productsController.editForm);
router.put("/update/:id", upload.single("imagen"), productsController.update);

// Nota: La ruta de eliminación se define como '/delete/:id'
router.delete("/delete/:id", productsController.destroy);

module.exports = router;
