const Account = require("./Account");
const Category = require("./Category");
const Product = require("./Product");

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = { Account, Category, Product };
