const AUTH = (req, res, next) => {
  if (req.path === "/login" && !req.session.isLoggedIn) return next();

  if (!req.session.isLoggedIn) {
    console.log("unauthenticated");
    return res.redirect("/admin/login");
  }
  if (req.path === "/login" && req.session.isLoggedIn) {
    return res.redirect("/admin");
  }
  next();
};

module.exports = { AUTH };
