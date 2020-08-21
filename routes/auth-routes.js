const passport = require("passport");
const express = require("express");
const router = express.Router();

const {
  loginGet,
  profileGet,
  registerGet,
  registerPost,
} = require("../controllers/controller");

router.get("/register", registerGet);

router.post("/register", registerPost);

router.get("/login", loginGet);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
