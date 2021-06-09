const express = require("express");
const cartRoute = express.Router();
const CartController = require("../controller/cart.controller");

cartRoute.post("/add", CartController.add);
cartRoute.post("/remove", CartController.remove);
cartRoute.post("/update/:id", CartController.update);
cartRoute.post("/checkout", CartController.checkout);
cartRoute.get("/", CartController.get);

module.exports = cartRoute;
