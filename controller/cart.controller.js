const { PAYMENT_STATUS, ORDER_STATUS } = require("../constants/order");
const cartService = require("../service/cart.service");
const orderService = require("../service/order.service");

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
		status: req.session.status,
		msg: req.session.message,
		logInOut: "Logout",
		cart,
		total,
	});
};

const add = async (req, res) => {
	req.session.message = undefined;
	req.session.status = undefined;
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
	req.session.message = undefined;
	req.session.status = undefined;
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
	req.session.message = undefined;
	req.session.status = undefined;
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

	let total = 0;
	cart.products.forEach((product) => {
		total += product.price * product.carts.qty;
	});

	res.render("cart/checkout", {
		userName: req.session.username,
		logInOut: "Logout",
		cart,
		total,
	});
};

const confirm = async (req, res) => {
	req.session.message = undefined;
	req.session.status = undefined;
	const accountId =
		req.session.user === undefined ? undefined : req.session.user.id;
	if (accountId === undefined) return res.redirect("/login");

	const { street, city, payment_option, cartIds } = req.body;
	const proof_of_payment =
		req.file === undefined ? null : `/uploads/${req.file.filename}`;

	let cart = await cartService.get({ accountId });
	cart.products.forEach((product, index) => {
		if (!cartIds.includes(product.carts.id.toString())) {
			cart.products.splice(index, 1);
		}
	});
	let total = 0;
	cart.products.forEach((product) => {
		total += product.price * product.carts.qty;
	});

	const convertedCartId = [];
	cartIds.forEach((id) => {
		convertedCartId.push(parseInt(id));
	});

	const orderPayload = {
		ref_number: Math.random().toString(36).substr(2, 6),
		address: `${street} ${city}`,
		payment_type: payment_option,
		payment_status: PAYMENT_STATUS.PENDING,
		order_status: ORDER_STATUS.PLACED,
		total,
		accountId,
		proof_of_payment,
	};

	try {
		const order = await orderService.add(orderPayload, convertedCartId, cart);
		if (typeof order === "boolean" && order === true) {
			res.redirect("/order-summary");
		} else if ("status" in order && order.status === 400) {
			req.session.status = order.status;
			req.session.message = order.message;

			res.redirect("/cart");
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = { add, get, remove, update, checkout, confirm };
