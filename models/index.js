const Account = require("./Account");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");
const Order = require("./Order");
const OrderLineItem = require("./OrderLine");
const ProductLogs = require("./ProductLogs");

Category.hasMany(Product);
Product.belongsTo(Category);

Account.belongsToMany(Product, { through: { model: Cart, unique: false } });
Product.belongsToMany(Account, { through: { model: Cart, unique: false } });

Order.hasMany(OrderLineItem);
OrderLineItem.belongsTo(Order);
OrderLineItem.belongsTo(Product);
Order.belongsTo(Account);
Account.hasMany(Order);

Product.hasMany(ProductLogs);
Account.hasMany(ProductLogs);
ProductLogs.belongsTo(Product);
ProductLogs.belongsTo(Account);

module.exports = {
	Account,
	Category,
	Product,
	Cart,
	Order,
	OrderLineItem,
	ProductLogs,
};
