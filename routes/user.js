const express = require("express")
const userRoute = express.Router()
const userAuth = require("../controller/userAuth")

userRoute.get("/login", userAuth.login)

userRoute.get("/register",(req, res) =>{
    res.render("register")
})

userRoute.post("/register/successfull", userAuth.register)

module.exports = userRoute