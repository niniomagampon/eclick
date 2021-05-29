const Category = require("../models/Category");

const indexCategory = async () => {
  try {
    return await Category.findAll({
      paranoid: false,
      order: [["createdAt", "DESC"]],
    });
  } catch (err) {
    return err;
  }
};

const addCategory = async (name, slug) => {
  try {
    await Category.create({ name, slug });
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getOneCategory = async (id) => {
  try {
    return await Category.findOne({ where: { id } });
  } catch (err) {
    return err;
  }
};

const updateCategory = async (id, name, slug) => {
  try {
    return await Category.update({ name, slug }, { where: { id } });
  } catch (err) {
    return err;
  }
};

const deleteCateogry = async (id) => {
  try {
    await Category.destroy({
      where: {
        id,
      },
    });
  } catch (err) {
    return err;
  }
};

const restoreCateogry = async (id) => {
  try {
    await Category.restore({
      where: {
        id,
      },
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  addCategory,
  indexCategory,
  deleteCateogry,
  restoreCateogry,
  getOneCategory,
  updateCategory,
};
