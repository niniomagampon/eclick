const e = require("express");
const productService = require("../service/ProductService");
const EJS_INFO = require("../constants/ejs");
const loggedInSession = require("../utils/loginSession");

let userName = "Guest";
let logInOut = "Login";

const home = async (req, res) => {
  if (req.session.isLoggedIn) {
    userName = req.session.username;
    logInOut = "Logout";
  }

  const products = await productService.all();

  res.render("customer/home", {
    ...EJS_INFO,
    userName,
    logInOut,
    products,
  });
};

const loginPage = async (req, res) => {
  loggedInSession(req);
  res.render("customer/login", { ...EJS_INFO });
};

const registerPage = async (req, res) => {
  res.render("customer/register", {
    ...EJS_INFO,
  });
};

const contact = async (req, res) => {
  if (req.session.isLoggedIn) {
    userName = req.session.username;
    logInOut = "Logout";
  }

  res.render("customer/contact", {
    userName,
    logInOut,
  });
};

module.exports = {
  home,
  registerPage,
  contact,
  loginPage,
};
