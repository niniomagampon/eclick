const express = require("express");
const customerRoute = express.Router();
const Account = require("../controller/account.controller");
const Page = require("../controller/page.controller")



let userName = "Guest";
let logInOut = "Login";

// HOME
customerRoute.get("/", Page.home);
customerRoute.post("/", Account.login);

// Register
customerRoute.get("/register", Page.registerPage);
customerRoute.post("/register", Account.register);

// Contact
customerRoute.get("/contact", Page.contact);

// loginPage
customerRoute.get("/login", Page.loginPage);


module.exports = customerRoute;
