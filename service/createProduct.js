
const Product = require("../models/Product");

module.exports = async (name, description, category, image, price) => {

  try {
    await Product.create({name, description, category, image, price});
    
    return true;

  } catch (err) {

    console.log(`catch error: ${err}`);

    return false;
  }
};
