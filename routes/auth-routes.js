const passport = require("passport");
const express = require("express");
const router = express.Router();
//const uploadCloud = require("../config/cloudinary");
const multer = require("multer");
let upload = multer();

const {
  loginGet,
  loginPost,
  profileGet,
  registerGet,
  registerPost,
  editProfileGet,
  editProfilePost
} = require("../controllers/controller");

const { isLoggedIn } = require('../middlewares/auth.middleware');

router.get("/register", registerGet);

router.post("/register", registerPost);

router.get("/login", loginGet);

router.post("/login", loginPost);

router.get("/profile", isLoggedIn, profileGet);

router.get("/editProfile/:id", isLoggedIn, editProfileGet);

router.post("/editProfile/:id", /* uploadCloud.single("photoUrl") , */ editProfilePost);

module.exports = router;
