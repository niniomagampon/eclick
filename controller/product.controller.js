const e = require("express");
const { Category, ProductLogs, Account } = require("../models");
const {
	indexCategory,
	getOneCategoryParams,
} = require("../service/category.service");
const productService = require("../service/ProductService");
const { getSingleProduct } = require("../service/order.service");
const clearSession = require("../utils/clearSession");
const deleteFile = require("../utils/deleteFile");

let userName = "Guest";
let logInOut = "Login";

// ADMIN Side
const index = async (req, res) => {
	clearSession(req);
	const products = await productService.all();
	res.render("admin/products/index", { products, user: req.session.user });
};

const add = async (req, res) => {
	const categories = await indexCategory("name", "ASC", true);
	res.render("admin/products/add", {
		categories,
		imageError: req.session.imageError,
		user: req.session.user,
	});
};

const addProduct = async (req, res) => {
	if (req.session.imageError != undefined) {
		await deleteFile(req.file.path);
		res.redirect("/admin/products/create");
	}
	const { name, qty, description, categoryId, price } = req.body;
	const { filename } = req.file;
	const data = {
		name,
		qty,
		description,
		categoryId,
		price,
		image: `/uploads/${filename}`,
	};

	const result = await productService.create(data);
	await ProductLogs.create({
		qty,
		productId: result.product.id,
		accountId: req.session.user.id,
	});

	if ("success" in result) res.redirect("/admin/products");
	else res.redirect("/admin/products/add");
};

const edit = async (req, res) => {
	const { id } = req.params;
	const result = await productService.getOneProduct(id);
	const categories = await indexCategory("name", "ASC");
	const { isSuccess, errors } = req.session;
	if (result) {
		res.render("admin/products/edit", {
			product: result,
			categories,
			isSuccess,
			errors,
			user: req.session.user,
		});
	} else {
		res.redirect("/admin/products");
	}
};

const update = async (req, res) => {
	clearSession(req);
	const { id } = req.body;
	delete req.body.id;
	const data = { ...req.body };

	if (typeof req.file !== "undefined") {
		data.image = `/uploads/${req.file.filename}`;
	} else {
		delete data.image;
	}

	const result = await productService.update(id, data);

	if (typeof result === "object" && result[0] === 1) {
		req.session.isSuccess = true;
		res.redirect(`/admin/products/edit/${id}`);
	} else {
		req.session.isSuccess = false;

		let errors = [];

		req.session.errors = errors;
		res.redirect(`/admin/products/edit/${id}`);
	}
};

const remove = async (req, res) => {
	const { id } = req.params;
	await productService.deleteProduct(id);
	res.redirect("/admin/products");
};

const restore = async (req, res) => {
	const { id } = req.params;
	await productService.restoreProduct(id);
	res.redirect("/admin/products");
};

const viewProduct = async (req, res) => {
	const { id } = req.params;
	const products = await getSingleProduct({ id });
	const currentProduct = await productService.getOneProduct(id);

	const productLogs = await ProductLogs.findAll({
		include: Account,
		where: { productId: id },
	});
	res.render("admin/products/view", {
		products,
		currentProduct,
		user: req.session.user,
		productLogs,
	});
};

const addQty = async (req, res) => {
	const { id } = req.params;
	const { qty } = req.body;
	await productService.addQty(id, qty);
	await ProductLogs.create({
		qty,
		productId: id,
		accountId: req.session.user.id,
	});
	res.redirect("/admin/products/view/" + id);
};

// Customer SIDE

const getAll = async (req, res) => {
	if (req.session.isLoggedIn) {
		userName = req.session.username;
		logInOut = "Logout";
	}
	const categories = await indexCategory("name", "ASC", true);

	const products = await productService.all();

	res.render("product/index", {
		userName,
		logInOut,
		products,
		categories,
		ejsCategory: "All Products",
		user: req.session.user,
	});
};

const getPerCategory = async (req, res) => {
	const { slug } = req.params;
	// Display Categories on Select
	const categories = await indexCategory("name", "ASC");
	// Fetch Product base on slug
	const products = await productService.perCategoryProd(slug);
	// Get Categories using slug
	const categoryName = await getOneCategoryParams(slug);

	if (req.session.isLoggedIn) {
		userName = req.session.username;
		logInOut = "Logout";
	}

	res.render("product/index", {
		userName,
		logInOut,
		products,
		categories,
		ejsCategory: categoryName.name,
		user: req.session.user,
	});
};

const getProduct = async (req, res) => {
	const { id } = req.params;
	const product = await productService.getOneProduct(id, Category);

	if (product === null) {
		return res.redirect("/products/all");
	}

	if (req.session.isLoggedIn) {
		userName = req.session.username;
		logInOut = "Logout";
	}

	res.render("product/view", {
		userName,
		product,
		logInOut,
		user: req.session.user,
	});
};

module.exports = {
	index,
	addProduct,
	add,
	remove,
	restore,
	edit,
	update,
	getAll,
	getPerCategory,
	getProduct,
	viewProduct,
	addQty,
};
