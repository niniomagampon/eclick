const sequelize = require("../configs/database");
const { Sequelize } = require("../configs/database");
const { Cart, Product, OrderLineItem } = require("../models");
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

const getAllOrder = async (payload) => {
	try {
		return await Order.findAll({
			where: {
				accountId: payload.accountId,
			},
			include: [
				{
					model: OrderLineItem,
					include: Product,
				},
			],
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

module.exports = { getAllOrder, orderStatus, add };
