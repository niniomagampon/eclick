const orderService = require("../service/order.service")
const EJS_INFO = require("../constants/ejs")
const orderSummary = async (req, res) => {

    if (req.session.isLoggedIn) {
  
      const orders = await orderService.getAllOrder
  
      res.render("customer/ordersummary", {
        userName: req.session.username,
        logInOut: "Logout",
        orders
      });
  
    } else {
      res.render("customer/login", EJS_INFO);
    }
  };
  
  const orderSummaryParams = async (req, res) => {
    const { status } = req.params
  
    const orders = await orderService.orderStatus(status)
  
    if (req.session.isLoggedIn) {
  
      res.render("customer/ordersummarysort",
      { 
        userName: req.session.username,
        logInOut: "Logout",
        orders
      })
  
    }else {
      res.render("customer/login", EJS_INFO);
    }
}

module.exports = {
    orderSummary, 
    orderSummaryParams
}