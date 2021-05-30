const express = require("express")
const userRoute = express.Router()
const Account = require("../controller/account.controller")
const EJS_INFO = require("../constants/ejs")

userRoute.post("/", Account.login)
userRoute.get("/", (req, res) => {
    res.render("login", { ...EJS_INFO })
})

userRoute.get("/register", (req, res) => {
    res.render("register", { ...EJS_INFO })
})
userRoute.post("/register", Account.register)

module.exports = userRoute