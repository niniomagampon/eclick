const { Product, Category } = require("../models");
const deleteFile = require("../utils/deleteFile");
const { join } = require("path");
const { Sequelize } = require("../configs/database");
// const { where } = require("sequelize/types");

const all = async (column = "createdAt", sort = "DESC", paranoid = "false") => {
	try {
		return await Product.findAll({
			paranoid,
			include: [Category],
			order: [[column, sort]],
		});
	} catch (err) {
		return err;
	}
};

const create = async (payload) => {
	try {
		const product = await Product.create(payload);
		return { success: true, product };
	} catch (err) {
		console.log(`catch error: ${err}`);
		return err;
	}
};

const getOneProduct = async (id, include = "") => {
	try {
		return await Product.findOne({
			include,
			where: { id },
		});
	} catch (err) {
		return err;
	}
};

const update = async (id, payload) => {
	try {
		if ("image" in payload) {
			const { image } = await getOneProduct(id);
			console.log(`hello`, image);
			await deleteFile(join(__dirname, `../public${image}`));
		}

		return await Product.update(payload, { where: { id } });
	} catch (err) {
		return err;
	}
};

const deleteProduct = async (id) => {
	try {
		await Product.destroy({
			where: { id },
		});
	} catch (err) {
		return err;
	}
};

const restoreProduct = async (id) => {
	try {
		await Product.restore({
			where: {
				id,
			},
		});
	} catch (err) {
		return err;
	}
};

const perCategoryProd = async (slug) => {
	try {
		return await Product.findAll({
			include: {
				model: Category,
				where: {
					slug,
				},
			},
		});
	} catch (err) {
		return err;
	}
};

const addQty = async (id, qty) => {
	try {
		return await Product.update(
			{ qty: Sequelize.literal(`qty + ${qty}`) },
			{ where: { id } }
		);
	} catch (err) {
		return err;
	}
};

const searchProduct = async (payload) => {
	try {
    const Op = Sequelize.Op;

		return await Product.findAll({
			where: {
				name: {
          [Op.like]: `${payload}%`
        },
			},
		});
	} catch (err) {
		return err;
	}
};

module.exports = {
	create,
	all,
	deleteProduct,
	restoreProduct,
	getOneProduct,
	update,
	perCategoryProd,
	addQty,
	searchProduct,
};
