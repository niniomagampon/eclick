const express = require("express");
const adminRoute = express.Router();
const Category = require("../controller/category.controller");

adminRoute.get("/", (req, res) => {
  res.render("admin/index");
});

adminRoute.get("/categories", Category.index);

adminRoute.get("/categories/create", (req, res) => {
  res.render("admin/categories/add");
});
adminRoute.post("/categories/create", Category.add);
adminRoute.get("/categories/edit/:id", Category.edit);
adminRoute.post("/categories/edit", Category.update);
adminRoute.get("/categories/delete/:id", Category.remove);
adminRoute.get("/categories/restore/:id", Category.restore);

module.exports = adminRoute;
