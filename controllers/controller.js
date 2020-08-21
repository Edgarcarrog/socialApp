const User = require("../models/User");
// import swal from 'sweetalert';

exports.loginGet = (req, res) => {
  res.render("login");
};

exports.registerGet = (req, res) => {
  res.render("register");
};

exports.registerPost = (req, res, next) => {
  const { name, email, password } = req.body;

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

  User.register({ name, email }, password)
    .then(() => {
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

exports.profileGet = (req, res) => {
  res.render("profile");
};
