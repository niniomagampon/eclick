const express = require("express")
const userRoute = express.Router()
const userAuth = require("../controller/userAuth")

userRoute.post("/", userAuth.login)

userRoute.get("/", (req, res) =>{
    res.render("login")
})

userRoute.get("/register",(req, res) =>{
    res.render("register")
})

userRoute.post("/register/successfull", userAuth.register)

module.exports = userRoute