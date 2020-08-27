// require("dotenv").config();
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
      return res.render("login", { message: "Correo o contraseña incorrecta" });
    }
    req.logIn(user, (err) => {
      if (err) console.log(err);
      //req.user = user;
      //console.log(req.isAuthenticated());
      return res.redirect("/profile"); //, {loggedUser: true}
    });
  })(req, res, next);
};

exports.profileGet = async (req, res) => {
  const user = await req.user;
  res.render("profile", { user });
};

exports.editProfileGet = async (req, res) => {
  // console.log(cloudName);
  const { id } = req.params;
  user = await User.findById(id);
  res.render("editProfile", { user });
};

exports.editProfilePost = async (req, res) => {
  const { id } = req.params;
  //console.log(app.locals.cloudName);
  const { username, info, photoUrl } = req.body;
  await User.findByIdAndUpdate(id, {
    $set: { username, info, photoUrl },
  });
  res.redirect("/profile");
};
