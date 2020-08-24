const User = require("../models/User");
const passport = require("passport");

// import swal from 'sweetalert';

exports.registerGet = (req, res) => {
  res.render("register");
};

exports.registerPost = (req, res, next) => {
  const { username, email, password } = req.body;

  if (email === "" || password === "") {
    return res.render("register", {
      message: "Indicate an email and password",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (user !== null) {
        return res.render("register", { message: "The email already exists" });
      }
    })
    .catch((error) => {
      next(error);
    });

  User.register({ username, email }, password)
    .then(() => {
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

exports.loginGet = (req, res) => {
  res.render("login", { message: req.flash("error") });
};

exports.loginPost = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return console.log(err);
    if (!user) {
      return res.render("login", { msg: "Correo o contraseña incorrecta" });
    }
    req.logIn(user, (err) => {
      if (err) console.log(err);
      req.user = user;
      return res.redirect("/profile"); //, {loggedUser: true}
    });
  })(req, res, next);
};

exports.profileGet = (req, res) => {
  res.render("profile");
};
