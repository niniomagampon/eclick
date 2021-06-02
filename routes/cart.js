const express = require("express")
const cartRoute = express.Router()
const orderControl = require("../controller/order.controller")

cartRoute.get( "/orders", orderControl.displayOrder)

module.exports = cartRoute