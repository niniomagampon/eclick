const e = require("express");
const productService = require("../service/ProductService");
const categoryService  = require("../service/category.service")
const EJS_INFO = require("../constants/ejs");
const loggedInSession = require("../utils/loginSession");

let userName = "Guest";
let logInOut = "Login";

const home = async (req, res) => {
  if (req.session.isLoggedIn) {
    userName = req.session.username;
    logInOut = "Logout";
  }
  const categories = await categoryService.indexCategory()
  const products = await productService.all();

  res.render("customer/home", {
    ...EJS_INFO,
    userName,
    logInOut,
    products,
    categories
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

const orderSummary = async (req, res) => {
  if (req.session.isLoggedIn) {
    res.render("customer/ordersummary", {
      userName: req.session.username,
      logInOut: "Logout",
      ejsOrders: [],
    });
  } else {
    res.render("customer/login", EJS_INFO);
  }
};

module.exports = {
  home,
  registerPage,
  contact,
  loginPage,
  orderSummary
};
