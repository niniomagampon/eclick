const EJS_INFO = require("../constants/ejs");
const cartService = require("../service/cart.service");
const withErrors = require("../utils/withErrors");

const add = async (req, res) => {
  const { qty, productId } = req.body;
  const accountId =
    req.session.user === undefined ? undefined : req.session.user.id;

  if (accountId === undefined) return res.redirect("/login");

  const result = await cartService.add({ qty, productId, accountId });

  if (typeof result === "boolean" && result === true) {
    return res.json({
      message: "Success",
      status: 200,
    });
  } else {
    return res.json({
      message: "Failed",
      status: 400,
    });
  }
};

const index = async (req, res) => {
  if (req.session.isLoggedIn) {
    res.render("customer/cart", {
      userName: req.session.username,
      logInOut: "Logout",
      ejsOrders: [],
    });
  } else {
    res.render("customer/login", EJS_INFO);
  }
};

module.exports = { add, index };
