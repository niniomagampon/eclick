const express = require("express")
const productsRoute = express.Router()
const productsController = require("../controller/productsController")


productsRoute.get("/CannedGoods", productsController.getGoods)


module.exports = productsRoute