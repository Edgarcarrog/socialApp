const User = require("../models/User");

exports.loginGet = (req, res) => {
  res.render("login");
};

exports.registerGet = (req, res) => {
  res.render("register");
};

exports.registerPost = (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({name, email, password });
  newUser
    .save()
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
