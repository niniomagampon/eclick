const e = require("express");
const { Category } = require("../models");
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
	res.render("admin/products/index", { products });
};

const add = async (req, res) => {
	const categories = await indexCategory("name", "ASC");
	res.render("admin/products/add", {
		categories,
		imageError: req.session.imageError,
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

	if (typeof result === "boolean") res.redirect("/admin/products");
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
	res.render("admin/products/view", { products, currentProduct });
};

const addQty = async (req, res) => {
	const { id } = req.params;
	const { qty } = req.body;
	await productService.addQty(id, qty);
	res.redirect("/admin/products/view/" + id);
};

// Customer SIDE

const getAll = async (req, res) => {
	if (req.session.isLoggedIn) {
		userName = req.session.username;
		logInOut = "Logout";
	}
	const categories = await indexCategory("name", "ASC");

	const products = await productService.all();

	res.render("product/index", {
		userName,
		logInOut,
		products,
		categories,
		ejsCategory: "All Products",
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
