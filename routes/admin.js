const express = require("express");
const adminRoute = express.Router();
const Category = require("../controller/category.controller");
const Users = require("../controller/userController");

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


adminRoute.get("/users", Users.index)
adminRoute.get("/users/create", (req, res) =>{
  res.render("admin/users/add");
})

adminRoute.post("/users/create", Users.add)

module.exports = adminRoute;
