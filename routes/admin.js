const express = require("express");
const adminRoute = express.Router();
const Category = require("../controller/category.controller");
const Product = require("../controller/product.controller");
const { adminLogin } = require("../controller/account.controller");
const Account = require("../controller/account.controller");
const Order = require("../controller/order.controller");
const fileUpload = require("../middleware/fileUpload");
const dashboardController = require("../controller/dashboard.controller");

adminRoute.get("/", dashboardController.dashboard);

adminRoute.get("/login", (req, res) => {
	res.render("admin/login");
});
adminRoute.get("/logout", (req, res) => {
	req.session.user = undefined;
	req.session.userType = undefined;
	req.session.isLoggedIn = false;

	res.redirect("/admin/login");
});
adminRoute.post("/login", adminLogin);

/** Categories Endpoint */
adminRoute.get("/categories", Category.index);
adminRoute.get("/categories/create", (req, res) => {
	res.render("admin/categories/add", { user: req.session.user });
});
adminRoute.post("/categories/create", Category.add);
adminRoute.get("/categories/edit/:id", Category.edit);
adminRoute.post("/categories/edit", Category.update);
adminRoute.get("/categories/delete/:id", Category.remove);
adminRoute.get("/categories/restore/:id", Category.restore);
/** End of Categories Endpoint */

// Users Endpoint
adminRoute.get("/users", Account.index);
adminRoute.get("/users/create", (req, res) => {
	res.render("admin/users/add", { user: req.session.user });
});

adminRoute.post("/users/create", Account.add);
adminRoute.get("/users/delete/:id", Account.remove);
adminRoute.get("/users/edit/:id", Account.edit);
adminRoute.post("/users/edit", Account.update);
adminRoute.get("/users/restore/:id", Account.restore);

/** End of Users Endpoint */

// Products Endpoint
adminRoute.get("/products", Product.index);
adminRoute.get("/products/create", Product.add);
adminRoute.post(
	"/products/create",
	fileUpload.single("image"),
	Product.addProduct
);
adminRoute.get("/products/delete/:id", Product.remove);
adminRoute.get("/products/restore/:id", Product.restore);
adminRoute.get("/products/edit/:id", Product.edit);
adminRoute.post("/products/edit", fileUpload.single("image"), Product.update);
adminRoute.get("/products/view/:id", Product.viewProduct);
adminRoute.post("/products/addQty/:id", Product.addQty);
/** End of Products Endpoint */

/** Orders Page */
adminRoute.get("/orders", Order.AgetAllOrders);
adminRoute.get("/orders/:ref_number", Order.AsingleOrder);
adminRoute.post("/orders/:ref_number", Order.AupdateOrder);
/** End of Orders Page */

module.exports = adminRoute;
