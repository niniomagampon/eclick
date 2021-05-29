const express = require("express")
const userRoute = express.Router()
const userAuth = require("../controller/userAuth")
const EJS_INFO = require("../constants/ejs")

userRoute.post("/", userAuth.login)
userRoute.get("/", (req, res) => {
    res.render("login", { ...EJS_INFO })
})

userRoute.get("/register", (req, res) => {
    res.render("register", { ...EJS_INFO })
})
userRoute.post("/register", userAuth.register)

module.exports = userRoute