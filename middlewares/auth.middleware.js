
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.app.locals.logged = true;
  } else {
    req.app.locals.logged = false;
    res.redirect("/login");
  }
  return next();
};
