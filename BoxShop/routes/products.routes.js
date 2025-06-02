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


router.get("/add", addForm);


router.post("/add", uploadProd.single("image"), store);


router.get("/detail/:id", detail);

router.get("/list", list);

router.get("/edit/:id", editForm);


router.put("/update/:id", uploadProd.single("image"), update); 

router.post("/delete/:id", destroy);


module.exports = router;
