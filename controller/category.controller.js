const categoryService = require("../service/category.service");
const withErrors = require("../utils/withErrors");
const clearSession = require("../utils/clearSession");

const index = async (req, res) => {
	clearSession(req);
	const categories = await categoryService.indexCategory();
	res.render("admin/categories/index", { categories, user: req.session.user });
};

const add = async (req, res) => {
	const { name, slug } = req.body;
	const result = await categoryService.addCategory(name, slug);

	if (typeof result === "boolean" && result === true) {
		res.locals.isSuccess = true;
		res.render("admin/categories/add", { user: req.session.user });
	} else {
		res.locals.isSuccess = false;

		let errors = [];

		if ("parent" in result && result.parent.errno === 1062) {
			errors.push("Category name already exists");
		} else {
			for (let error of Object.values(withErrors(result))) {
				errors.push(error);
			}
		}

		res.locals.oldValue = { name, slug };
		res.render("admin/categories/add", { errors, user: req.session.user });
	}
};

const edit = async (req, res) => {
	const { id } = req.params;
	const result = await categoryService.getOneCategory(id);
	const { isSuccess, errors } = req.session;
	if (result) {
		res.render("admin/categories/edit", {
			id: result.id,
			name: result.name,
			slug: result.slug,
			isSuccess,
			errors,
			user: req.session.user,
		});
	} else {
		res.redirect("/admin/categories");
	}
};

const update = async (req, res) => {
	clearSession(req);
	const { id, name, slug } = req.body;
	const result = await categoryService.updateCategory(id, name, slug);

	if (typeof result === "object" && result[0] === 1) {
		req.session.isSuccess = true;
		res.redirect(`/admin/categories/edit/${id}`);
	} else {
		req.session.isSuccess = false;

		let errors = [];

		if ("parent" in result && result.parent.errno === 1062) {
			errors.push("Category name already exists");
		} else {
			for (let error of Object.values(withErrors(result))) {
				errors.push(error);
			}
		}

		req.session.errors = errors;
		res.redirect(`/admin/categories/edit/${id}`);
	}
};

const remove = async (req, res) => {
	const { id } = req.params;
	await categoryService.deleteCateogry(id);
	res.redirect("/admin/categories");
};

const restore = async (req, res) => {
	const { id } = req.params;
	await categoryService.restoreCateogry(id);
	res.redirect("/admin/categories");
};

module.exports = { add, index, remove, restore, edit, update };
