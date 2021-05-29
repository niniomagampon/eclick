const express = require("express")
const userRoute = express.Router()
const userAuth = require("../controller/userAuth")

userRoute.post("/", userAuth.login)

userRoute.get("/", (req, res) =>{
    res.render("login",{
        ejsModalDisplay : "none",
        ejsPageTitle : "",
        ejsHeadBackground : "",
        ejsMessageTitle : "",
        ejsServerMessage : "",
        ejsRedirectPage : "",
        ejsMessageButton: ""
    })
})

userRoute.get("/register",(req, res) =>{
    res.render("register",{
        ejsModalDisplay : "none",
        ejsPageTitle : "",
        ejsHeadBackground : "",
        ejsMessageTitle : "",
        ejsServerMessage : "",
        ejsRedirectPage : "",
        ejsMessageButton: ""
    })
})

userRoute.post("/register/successfull", userAuth.register)

module.exports = userRoute