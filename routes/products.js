const express = require("express")
const productsRoute = express.Router()
const productsController = require("../controller/product.controller")
const EJS_INFO = require("../constants/ejs")


productsRoute.get("/all", productsController.getAll)

productsRoute.get("/category/:slug", productsController.getPerCategory )


module.exports = productsRoute