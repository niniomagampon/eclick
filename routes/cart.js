const express = require("express");
const cartRoute = express.Router();
const CartController = require("../controller/cart.controller");

cartRoute.get("/", CartController.index)
cartRoute.post("/add", CartController.add);

module.exports = cartRoute;
