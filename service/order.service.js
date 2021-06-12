const sequelize = require("../configs/database");
const { Sequelize } = require("../configs/database");
const { Cart, Product, OrderLineItem, Account } = require("../models");
const Order = require("../models/Order");
const productService = require("../service/ProductService");

const add = async (orderPayload, cartIds, cart) => {
	try {
		await sequelize.transaction(async (t) => {
			const Op = Sequelize.Op;
			const order = await Order.create(orderPayload, { transaction: t });
			await Cart.update(
				{ isCheckedOut: true },
				{
					where: {
						id: {
							[Op.in]: cartIds,
						},
					},
					transaction: t,
				}
			);
			await Cart.destroy({
				where: {
					id: {
						[Op.in]: cartIds,
					},
				},
				transaction: t,
			});

			const orderLineItem = [];
			for (const product of cart.products) {
				const p = await productService.getOneProduct(product.id);
				if (p.qty >= product.carts.qty) {
					orderLineItem.push({
						qty: product.carts.qty,
						price: product.price,
						orderId: order.id,
						productId: product.id,
					});
					await Product.update(
						{ qty: Sequelize.literal(`qty - ${product.carts.qty}`) },
						{
							where: {
								id: product.id,
							},
							transaction: t,
						}
					);
				} else {
					throw {
						status: 400,
						message: `Not enought Stock with Product: ${p.name}`,
					};
				}
			}
			await OrderLineItem.bulkCreate(orderLineItem, { transaction: t });
		});
		return true;
	} catch (err) {
		return err;
	}
};

const getCustomerOrders = async ({ accountId }) => {
	try {
		return await Order.findAll({
			where: {
				accountId,
			},
			include: [
				{
					model: OrderLineItem,
					include: Product,
				},
				{
					model: Account,
				},
			],
			order: [["createdAt", "DESC"]],
		});
	} catch (err) {
		return err;
	}
};

const getAllOrder = async ({
	accountId,
	from,
	to,
	payment_type,
	payment_status,
	order_status,
}) => {
	try {
		const Op = Sequelize.Op;
		let filter = {};
		if (accountId !== null) {
			filter.where = {
				accountId,
			};
		}
		if (payment_type !== "") {
			filter.where = {
				...filter.where,
				payment_type,
			};
		}
		if (payment_status !== "") {
			filter.where = {
				...filter.where,
				payment_status,
			};
		}
		if (order_status !== "") {
			filter.where = {
				...filter.where,
				order_status,
			};
		}
		if (from !== "") {
			filter.where = {
				...filter.where,
				createdAt: {
					[Op.gte]: new Date(from),
				},
			};
		}

		if (to !== "") {
			const end = new Date(to);
			end.setHours(23, 59, 59, 999);
			filter.where = {
				...filter.where,
				createdAt: {
					[Op.lte]: end,
				},
			};
		}

		if (from !== "" && to !== "") {
			const start = new Date(from);
			const end = new Date(to);
			end.setHours(23, 59, 59, 999);
			filter.where = {
				...filter.where,
				createdAt: {
					[Op.between]: [start, end],
				},
			};
		}

		return await Order.findAll({
			...filter,
			include: [
				{
					model: OrderLineItem,
					include: Product,
				},
				{
					model: Account,
				},
			],
			order: [["createdAt", "DESC"]],
		});
	} catch (err) {
		return err;
	}
};

const orderStatus = async (status) => {
	try {
		return await Order.findAll({
			where: {
				order_status: status,
			},
		});
	} catch (err) {
		return err;
	}
};

const getOrderByReference = async (ref_number) => {
	try {
		return await Order.findOne({
			where: {
				ref_number,
			},
			include: [
				{
					model: OrderLineItem,
					include: Product,
				},
				{
					model: Account,
				},
			],
		});
	} catch (err) {
		return err;
	}
};

const updateOrder = async (payload, ref_number) => {
	try {
		await Order.update(payload, {
			where: {
				ref_number,
			},
		});

		return true;
	} catch (err) {
		return err;
	}
};

const getSingleProduct = async (payload) => {
	try {
		return await Order.findAll({
			include: [
				{
					model: OrderLineItem,
					include: Product,
					where: {
						productId: payload.id,
					},
				},
				{
					model: Account,
				},
			],
		});
	} catch (err) {
		return err;
	}
};

module.exports = {
	getAllOrder,
	orderStatus,
	add,
	getOrderByReference,
	updateOrder,
	getSingleProduct,
  getCustomerOrders
};
