const passport = require("passport");
const express = require("express");
const router = express.Router();

const {
  loginGet,
  loginPost,
  profileGet,
  registerGet,
  registerPost,
} = require("../controllers/controller");

router.get("/register", registerGet);

router.post("/register", registerPost);

router.get("/login", loginGet);

router.post("/login", loginPost);

/* router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
})); */

/* function ensureLogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

router.get("/private-page", ensureLogin, (req, res, next) => {
  res.render("private", { user: req.user });
}); */

module.exports = router;
