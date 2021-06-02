const express = require("express")
const productsRoute = express.Router()
const productsController = require("../controller/product.controller")


productsRoute.get("/all", productsController.getAll)


module.exports = productsRoute