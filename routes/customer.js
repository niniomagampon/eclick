const express = require("express")
const customerRoute = express.Router()
const Account = require("../controller/account.controller")
const EJS_INFO = require("../constants/ejs")

customerRoute.post("/", Account.login)
customerRoute.get("/", (req, res) => {
    res.render("login", { ...EJS_INFO })
})
customerRoute.get("/register", (req, res) => {
    res.render("register", { ...EJS_INFO })
})
customerRoute.post("/register", Account.register)

// HOME

customerRoute.get("/home", (req, res) =>{
    res.render("customer/home",{
        ejsName : req.session.username
    })
})

module.exports = customerRoute