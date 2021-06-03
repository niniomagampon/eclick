const PAYMENT_TYPE = {
	GCASH: "GCash",
	COD: "COD",
};

const PAYMENT_STATUS = {
	PENDING: "Pending",
	PAID: "Paid",
};

const ORDER_STATUS = {
	PLACED: "Placed",
	PROCESSING: "Processing",
	DELIVERY: "Out for Delivery",
	DELIVERED: "Delivered",
	CANCELLED: "Cancelled",
	VOID: "Void",
};

module.exports = { PAYMENT_STATUS, PAYMENT_TYPE, ORDER_STATUS };
