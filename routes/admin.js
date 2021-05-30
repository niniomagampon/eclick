const express = require("express");
const adminRoute = express.Router();
const Category = require("../controller/category.controller");
const Product = require("../controller/productController");
const { adminLogin } = require("../controller/account.controller");
const Account = require("../controller/account.controller");
const fileUpload = require("../middleware/fileUpload");

adminRoute.get("/", (req, res) => {
  res.render("admin/index");
});

adminRoute.get("/login", (req, res) => {
  res.render("admin/login");
});
adminRoute.post("/login", adminLogin);

/** Categories Endpoint */
adminRoute.get("/categories", Category.index);
adminRoute.get("/categories/create", (req, res) => {
  res.render("admin/categories/add");
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
  res.render("admin/users/add");
});

adminRoute.post("/users/create", Account.add);

/** End of Users Endpoint */
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

module.exports = adminRoute;
