const express = require("express");
const {
  login,
  register,
  processRegister,
  processLogin,
  profile,
  logout,
  edit,
  processUpdate,
  destroy,
} = require("../controllers/user.controllers");
const { uploadUser } = require("../middlewares/multer");
const loggedAuth = require("../middlewares/loggedAuth");
const guestAuth = require("../middlewares/guestAuth");
const { loginValidator } = require("../middlewares/validator");

const router = express.Router();


router.get("/login", loggedAuth, login);
router.post("/login", loginValidator, processLogin);
router.get("/register", loggedAuth, register);
router.post("/register", uploadUser.single("avatar"), processRegister);
router.get("/profile", guestAuth, profile);
router.get("/edit/:id", guestAuth, edit);
router.put("/edit/:id", uploadUser.single("avatar"), processUpdate);
router.delete("/delete/:id", destroy);
router.post("/logout", guestAuth, logout);

module.exports = router;
