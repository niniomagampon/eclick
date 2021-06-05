const express = require("express");
const customerRoute = express.Router();
const Account = require("../controller/account.controller");
const Page = require("../controller/page.controller")



let userName = "Guest";
let logInOut = "Login";

// HOME
customerRoute.get("/", Page.home);

// Register
customerRoute.get("/register", Page.registerPage);
customerRoute.post("/register", Account.register);

// Contact
customerRoute.get("/contact", Page.contact);

// loginPage
customerRoute.get("/login", Page.loginPage);
customerRoute.post("/", Account.login);

// order summary
customerRoute.get("/order-summary", Page.orderSummary)

module.exports = customerRoute;
