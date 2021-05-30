const express = require("express")
const userRoute = express.Router()
<<<<<<< Updated upstream
const accountController = require("../controller/account.controller")
const EJS_INFO = require("../constants/ejs")

userRoute.post("/", accountController.login)
=======
const accountService = require("../service/account.service");
const EJS_INFO = require("../constants/ejs")

userRoute.post("/", accountService.login)
>>>>>>> Stashed changes
userRoute.get("/", (req, res) => {
    res.render("login", { ...EJS_INFO })
})

userRoute.get("/register", (req, res) => {
    res.render("register", { ...EJS_INFO })
})
<<<<<<< Updated upstream
userRoute.post("/register", accountController.register)
=======
userRoute.post("/register", accountService.register)
>>>>>>> Stashed changes

module.exports = userRoute