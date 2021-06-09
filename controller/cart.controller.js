const EJS_INFO = require("../constants/ejs");
const cartService = require("../service/cart.service");
const withErrors = require("../utils/withErrors");

const get = async (req, res) => {
	const accountId =
		req.session.user === undefined ? undefined : req.session.user.id;
	if (accountId === undefined) return res.redirect("/login");

	const cart = await cartService.get({ accountId });

	let total = 0;
	cart.products.forEach((product) => {
		total += product.price * product.carts.qty;
	});

	res.render("cart/index", {
		userName: req.session.username,
		logInOut: "Logout",
		cart,
		total,
	});
};

const add = async (req, res) => {
	const { qty, productId } = req.body;
	const accountId =
		req.session.user === undefined ? undefined : req.session.user.id;

	if (accountId === undefined) return res.redirect("/login");

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

const update = async (req, res) => {
	const { id } = req.params;
	const { q: action } = req.query;
	const accountId =
		req.session.user === undefined ? undefined : req.session.user.id;

	if (accountId === undefined) return res.redirect("/login");

	const result = await cartService.update(id, action);

	if (typeof result === "boolean" && result === true) {
		return res.redirect("/cart");
	} else {
		return res.json({
			message: "Failed",
			status: 400,
		});
	}
};

const remove = async (req, res) => {
	const { cartId } = req.body;
	const accountId =
		req.session.user === undefined ? undefined : req.session.user.id;

	if (accountId === undefined) return res.redirect("/login");

	const result = await cartService.remove(cartId);

	if (typeof result === "boolean" && result === true) {
		return res.redirect("/cart");
	} else {
		return res.json({
			message: "Failed",
			status: 400,
		});
	}
};

const checkout = async (req, res) => {
	const { cartIds } = req.body;
	const accountId =
		req.session.user === undefined ? undefined : req.session.user.id;

	if (accountId === undefined) return res.redirect("/login");
	if (cartIds.length === 0)
		return res.json({ status: 400, message: "No Selected product on cart" });

	let cart = await cartService.get({ accountId });
	cart.products.forEach((product, index) => {
		if (!cartIds.includes(product.carts.id.toString())) {
			cart.products.splice(index, 1);
		}
	});

	res.json(cart);
};

module.exports = { add, get, remove, update, checkout };
