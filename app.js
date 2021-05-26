const express = require("express")
const ejs = require("ejs")
const cartRoute = require("./routes/cart")
const productsRoute = require("./routes/products")
const mysql = require("mysql")


const app = express()
const port = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


// Database Connection
// const dbConfig = {
//     host : "localhost"
// }


// Route

app.get("/", (req, res) =>{
    res.render("login")
})

app.get("/register",(req , res) =>{
    res.render("register")
})

app.use("/cart", cartRoute)

app.use("/products" , productsRoute)


// Server Starter

app.listen(port , ()=> {
    console.log(`Server Started on port : ${port}`)
})