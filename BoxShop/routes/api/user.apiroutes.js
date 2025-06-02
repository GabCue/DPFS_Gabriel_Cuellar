const express = require("express");
const {
  getUsers,
  profile,
} = require("../../controllers/api/user.apicontroller");

const router = express.Router();


router.get("/", getUsers);


router.get("/profile/:id", profile);

module.exports = router;