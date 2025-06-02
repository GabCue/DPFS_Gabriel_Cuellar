const express = require("express");
const router = express.Router();

const {
  getCategories,
} = require("../../controllers/api/categories.apicontrollers");


router.get("/", getCategories);

module.exports = router;