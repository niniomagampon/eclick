const { Cart } = require("../models");

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

module.exports = {
	add,
};
