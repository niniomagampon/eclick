const cartService = require("../service/cart.service");
const withErrors = require("../utils/withErrors");

const add = async (req, res) => {
	const { qty, productId } = req.body;
	const accountId =
		req.session.user === undefined ? undefined : req.session.user.id;

	if (accountId === undefined) return res.redirect("/");

	const result = await cartService.add({ qty, productId, accountId });

	if (typeof result === "boolean" && result === true) {
		return res.json({
			message: "Success",
			status: 200,
		});
	} else {
		return res.json({
			message: "Failed",
			status: 400,
		});
	}
};

module.exports = { add };
