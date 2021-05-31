const express = require("express")
const customerRoute = express.Router()
const Account = require("../controller/account.controller")
const EJS_INFO = require("../constants/ejs")
const loggedInSession = require("../utils/loginSession")

customerRoute.post("/", Account.login)
customerRoute.get("/", (req, res) => {
    res.render("login", { ...EJS_INFO })
})
customerRoute.get("/register", (req, res) => {
    res.render("register", { ...EJS_INFO })
})
customerRoute.post("/register", Account.register)

// HOME

customerRoute.get("/home", (req, res) => {
    if (req.session.isLoggedIn) {
        res.render("customer/home", {
            ejsName: req.session.username
        })
    } else {
        res.render("login",
            { ...EJS_INFO }
        )
    }
})

customerRoute.get("/contact", (req, res) => {
    if (req.session.isLoggedIn) {
        res.render("customer/contact", {
            ejsName: req.session.username
        })
    } else {
        res.render("login",
            { ...EJS_INFO }
        )
    }
})

customerRoute.get("/logout", (req, res) => {
    loggedInSession(req)
    res.render("login", { ...EJS_INFO })
})

module.exports = customerRoute