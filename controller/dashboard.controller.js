const dashboardService = require("../service/dashboard.serivce");

const dashboard = async (req, res) => {
	const customer = await dashboardService.countCustomers();
	const product = await dashboardService.countProducts();
	const order = await dashboardService.countOrders();
	const recentOrders = await dashboardService.getRecentOrders();
	const tempOrder = await dashboardService.getOrderForChart();

	const chart = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	};

	tempOrder.forEach((o) => {
		chart.data[o.SalesMonth - 1] = o.TotalSales;
	});

	res.render("admin/index", {
		customer,
		product,
		order,
		recentOrders,
		chart,
	});
};

module.exports = {
	dashboard,
};
