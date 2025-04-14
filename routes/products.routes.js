const express = require("express");
const router = express.Router();

const {
  addForm,
  store,
  detail,
  list,
  editForm,
  update,
  destroy,
} = require("../controllers/products.controllers");
const { uploadProd } = require("../middlewares/multer");

// Ruta para mostrar el formulario de agregar producto
router.get("/add", addForm);

// Ruta para almacenar el nuevo producto
router.post("/add", uploadProd.single("image"), store);

// Ruta para mostrar los detalles de un producto
router.get("/detail/:id", detail);

// Ruta para listar los productos
router.get("/list", list);

// Ruta para mostrar el formulario de editar producto
router.get("/edit/:id", editForm);

// Ruta para actualizar el producto con método PUT
router.put("/update/:id", uploadProd.single("image"), update); // Asegúrate de que sea /update en lugar de /edit para la actualización

// Ruta para eliminar un producto
router.delete("/delete/:id", destroy);

module.exports = router;
