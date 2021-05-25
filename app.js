const express = require("express")
const ejs = require("ejs")

const app = express()
const port = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))



// Route

app.get("/", (req, res) =>{
    res.render("login")
})



// Server Starter

app.listen(port , ()=> {
    console.log(`Server Started on port : ${port}`)
})