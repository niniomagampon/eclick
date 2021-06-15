const express = require("express");
const customerRoute = express.Router();
const Account = require("../controller/account.controller");
const Page = require("../controller/page.controller")
const Order = require("../controller/order.controller")



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
customerRoute.get("/order-summary", Order.orderSummary)
customerRoute.get("/order-summary/:status", Order.orderSummaryParams)

// Settings
customerRoute.get("/settings", Page.settingsPage)
customerRoute.get("/settings/edit", Page.settingsEdit)
customerRoute.post("/settings/edit", Page.settingsUpdate)
customerRoute.get("/settings/change-password", Page.settingsPassword)
customerRoute.post("/settings/change-password", Page.settingsPasswordUpdate)

module.exports = customerRoute;
