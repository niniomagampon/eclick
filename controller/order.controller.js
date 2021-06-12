const orderService = require("../service/order.service");
const EJS_INFO = require("../constants/ejs");
const orderSummary = async (req, res) => {
	if (req.session.isLoggedIn) {
		const accountId = req.session.user.id;
		const orders = await orderService.getAllOrder({ accountId });
		res.render("customer/ordersummary", {
			userName: req.session.username,
			logInOut: "Logout",
			orders,
		});
	} else {
		res.render("customer/login", EJS_INFO);
	}
};

const orderSummaryParams = async (req, res) => {
	const { status } = req.params;

	const orders = await orderService.orderStatus(status);

	if (req.session.isLoggedIn) {
		res.render("customer/ordersummarysort", {
			userName: req.session.username,
			logInOut: "Logout",
			orders,
		});
	} else {
		res.render("customer/login", EJS_INFO);
	}
};

/** Admin Controllers */
const AgetAllOrders = async (req, res) => {
	const { from, to, payment_type, payment_status, order_status } = req.query;
	const orders = await orderService.getAllOrder({
		accountId: null,
		from,
		to,
		payment_type,
		payment_status,
		order_status,
	});

	let total = 0;
	orders.forEach((o) => {
		total += o.total;
	});

	res.render("admin/orders/index", {
		orders,
		from,
		to,
		total,
		payment_type,
		payment_status,
		order_status,
	});
};

const AsingleOrder = async (req, res) => {
	const { ref_number } = req.params;
	const orders = await orderService.getOrderByReference(ref_number);
	res.render("admin/orders/view", { orders });
};

const AupdateOrder = async (req, res) => {
	const { ref_number } = req.params;
	const { order_status, payment_status } = req.body;
	const order = await orderService.updateOrder(
		{ order_status, payment_status },
		ref_number
	);

	if (typeof order === "boolean" && order === true) {
		res.redirect("/admin/orders");
	} else {
		res.redirect(`/admin/orders/${ref_number}`);
	}
};

module.exports = {
	orderSummary,
	orderSummaryParams,
	AgetAllOrders,
	AsingleOrder,
	AupdateOrder,
};
