const { Sequelize } = require("../configs/database");
const { Cart, Product, Account } = require("../models");

const get = async (payload) => {
	try {
		const { accountId } = payload;
		const cart = await Account.findOne({
			where: {
				id: accountId,
			},
			include: Product,
		});
		return cart;
	} catch (err) {
		console.log(`Failed to get Cart`, err);
		return err;
	}
};

const add = async (payload) => {
	try {
		const cart = await Cart.findOne({
			where: {
				accountId: payload.accountId,
				productId: payload.productId,
			},
		});

		if (cart === null) await Cart.create(payload);
		else
			await Cart.update(
				{ qty: parseInt(cart.qty) + parseInt(payload.qty) },
				{ where: { id: cart.id } }
			);

		return true;
	} catch (err) {
		console.log(err);
		return err;
	}
};

const update = async (id, action) => {
	try {
		const query =
			action === "increment"
				? Sequelize.literal(`qty + 1`)
				: Sequelize.literal(`qty - 1`);
		await Cart.update(
			{
				qty: query,
			},
			{
				where: {
					id,
				},
			}
		);
		return true;
	} catch (err) {
		console.log(err);
		return err;
	}
};

const remove = async (id) => {
	try {
		await Cart.destroy({
			where: {
				id,
			},
		});
		return true;
	} catch (err) {
		console.log(err);
		return err;
	}
};

module.exports = {
	add,
	get,
	remove,
	update,
};
