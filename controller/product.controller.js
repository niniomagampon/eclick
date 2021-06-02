const e = require("express");
const { indexCategory, getOneCategoryParams } = require("../service/category.service");
const productService = require("../service/ProductService");
const clearSession = require("../utils/clearSession");
const deleteFile = require("../utils/deleteFile");

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


// Customer SIDE

const getAll = async (req, res) =>{
  const categories = await indexCategory("name", "ASC");

  const products = await productService.all();
  // if(req.session.isLoggedIn){
    res.render("product/index",{

      ejsName : req.session.username,
      ejsProducts : products,
      categories,
      ejsCategory : "All Products"
    })
  // }else{
  //   res.redirect("/")
  // }
}

const getPerCategory = async (req, res) =>{
  const {slug} = req.params
  const categories = await indexCategory("name", "ASC");

  const result = await productService.perCategoryProd(slug)


  const categoryName = await getOneCategoryParams(slug)

  console.log(categoryName)

  // if(req.session.isLoggedIn){
    res.render("product/index",{

      ejsName : req.session.username,
      ejsProducts : result,
      categories,
      ejsCategory : categoryName.name

    })
  // }else{
  //   res.redirect("/")
  // }
}


module.exports = { index, 
  addProduct, 
  add, 
  remove, 
  restore, 
  edit, 
  update, 
  getAll,
  getPerCategory
};
