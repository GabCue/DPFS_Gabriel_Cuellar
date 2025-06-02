const express = require("express");
const { home, homeADM } = require("../controllers/index.controller");
const router = express.Router();


router.get("/", home);

router.get("/homeADM", homeADM);

module.exports = router;