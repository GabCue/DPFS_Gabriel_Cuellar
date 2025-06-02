const express = require("express");
const router = express.Router();

const {
  detail,
  getProducts,
  lastProduct,
} = require("../../controllers/api/products.apicontrollers");


router.get("/", getProducts);


router.get("/detail/:id", detail);


router.get("/last-product", lastProduct);

module.exports = router;