const { Account, Product, Order } = require("../models");
const { PAYMENT_STATUS, ORDER_STATUS } = require("../constants/order");
const { Sequelize } = require("../configs/database");
const sequelize = require("../configs/database");

const countCustomers = async () => {
	try {
		return await Account.count({
			where: {
				userType: "customer",
			},
		});
	} catch (err) {
		return err;
	}
};

const countProducts = async () => {
	try {
		return await Product.count();
	} catch (err) {
		return err;
	}
};

const countOrders = async () => {
	try {
		return await Order.count();
	} catch (err) {
		return err;
	}
};

const getRecentOrders = async () => {
	try {
		return await Order.findAll({
			order: [["createdAt", "DESC"]],
			limit: 5,
		});
	} catch (err) {
		return err;
	}
};

const getOrderForChart = async () => {
	try {
		const d = new Date();
		const n = d.getFullYear();
		return await sequelize.query(
			`
      SELECT 
        YEAR(createdAt) as SalesYear,
        MONTH(createdAt) as SalesMonth,
        SUM(total) AS TotalSales
      FROM orders
      WHERE payment_status = '${PAYMENT_STATUS.PAID}' AND order_status = '${ORDER_STATUS.DELIVERED}' AND YEAR(createdAt) = ${n}
      GROUP BY YEAR(createdAt), MONTH(createdAt)
      ORDER BY YEAR(createdAt), MONTH(createdAt)
    `,
			{ type: Sequelize.QueryTypes.SELECT }
		);
	} catch (err) {
		return err;
	}
};

module.exports = {
	countCustomers,
	countProducts,
	countOrders,
	getRecentOrders,
	getOrderForChart,
};
