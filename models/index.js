const Account = require("./Account");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");
const Order = require("./Order");
const OrderLineItem = require("./OrderLine");

Category.hasMany(Product);
Product.belongsTo(Category);

Account.belongsToMany(Product, { through: { model: Cart, unique: false } });
Product.belongsToMany(Account, { through: { model: Cart, unique: false } });

Order.hasMany(OrderLineItem);
OrderLineItem.belongsTo(Order);
OrderLineItem.belongsTo(Product);
Order.belongsTo(Account);
Account.hasMany(Order);

module.exports = { Account, Category, Product, Cart, Order, OrderLineItem };
