const { Product, Category } = require("../models");
const deleteFile = require("../utils/deleteFile");
const { join } = require("path");

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
    await Product.create(payload);
    return true;
  } catch (err) {
    console.log(`catch error: ${err}`);
    return err;
  }
};

const getOneProduct = async (id) => {
  try {
    return await Product.findOne({ where: { id } });
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

module.exports = {
  create,
  all,
  deleteProduct,
  restoreProduct,
  getOneProduct,
  update,
};
