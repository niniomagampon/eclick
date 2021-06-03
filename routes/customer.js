const express = require("express");
const customerRoute = express.Router();
const Account = require("../controller/account.controller");
const EJS_INFO = require("../constants/ejs");
const loggedInSession = require("../utils/loginSession");

customerRoute.post("/", Account.login);

let userName = "Guest"
let logInOut = "Login"

// HOME
customerRoute.get("/", (req, res) => {

  if (req.session.isLoggedIn) {
    userName = req.session.username;
    logInOut = "Logout"
  }

  res.render("customer/home", {
    ...EJS_INFO,
    userName,
    logInOut
  });
});

customerRoute.get("/register", (req, res) => {
  res.render("register", {
    ...EJS_INFO,
  });
});
customerRoute.post("/register", Account.register);




customerRoute.get("/contact", (req, res) => {

  if (req.session.isLoggedIn) {
    res.render("customer/contact", {
      userName: req.session.username,
      logInOut : "Logout"
    });
  } else {
    res.render("login", { ...EJS_INFO},
    );
  }
});


customerRoute.get("/login", (req, res) => {
  loggedInSession(req);
  res.render("login", { ...EJS_INFO });
});

module.exports = customerRoute;
