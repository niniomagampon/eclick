const express = require("express");
const cartRoute = express.Router();
const CartController = require("../controller/cart.controller");
const fileUpload = require("../middleware/fileUpload");

cartRoute.post("/add", CartController.add);
cartRoute.post("/remove", CartController.remove);
cartRoute.post("/update/:id", CartController.update);
cartRoute.post("/checkout", CartController.checkout);
cartRoute.post(
	"/checkout/confirm",
	fileUpload.single("proof_of_payment"),
	CartController.confirm
);
cartRoute.get("/checkout", (req, res) => {
	const accountId =
		req.session.user === undefined ? undefined : req.session.user.id;
	if (accountId === undefined) return res.redirect("/login");
	res.redirect("/");
});
cartRoute.get("/", CartController.get);

module.exports = cartRoute;
