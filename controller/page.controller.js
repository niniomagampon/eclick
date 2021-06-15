const e = require("express");
const productService = require("../service/ProductService");
const accountService = require("../service/account.service");
const categoryService  = require("../service/category.service")
const orderService = require("../service/order.service")
const EJS_INFO = require("../constants/ejs");
const loggedInSession = require("../utils/loginSession");
const bcrypt = require("bcryptjs");

let userName = "Guest";
let logInOut = "Login";

const home = async (req, res) => {
  if (req.session.isLoggedIn) {
    userName = req.session.username;
    logInOut = "Logout";
  }
  const categories = await categoryService.indexCategory()
  const products = await productService.all();

  res.render("customer/home", {
    ...EJS_INFO,
    userName,
    logInOut,
    products,
    categories
  });
};

const loginPage = async (req, res) => {
  loggedInSession(req);
  res.render("customer/login", { ...EJS_INFO });
};

const registerPage = async (req, res) => {
  res.render("customer/register", {
    ...EJS_INFO,
  });
};

const contact = async (req, res) => {
  if (req.session.isLoggedIn) {
    userName = req.session.username;
    logInOut = "Logout";
  }

  res.render("customer/contact", {
    userName,
    logInOut,
  });
};


const settingsPage = async (req, res) =>{
  if (req.session.isLoggedIn) {
    userName = req.session.username;
    logInOut = "Logout";
    data = req.session.user

    res.render("customer/settings", {
      userName,
      logInOut,
      data
    })
  }else{
    res.redirect("/login")
  }
}

const settingsEdit = async(req, res) =>{
  if (req.session.isLoggedIn) {
    userName = req.session.username;
    logInOut = "Logout";
    data = req.session.user

    res.render("customer/settingsEdit", {
      userName,
      logInOut,
      data
    })
  }else{
    res.redirect("/login")
  }
}

const settingsUpdate = async (req, res) =>{
    const {name, email, address, mobile} = req.body 
    const id = req.session.user.id
  
    const result = await accountService.update(id,name,email,address,mobile,"customer")
    const data = await accountService.getOneUser(id)
    req.session.user = data
    req.session.username = data.name
  if(result === 0){
    res.json({message : "Error"})
  }else{
    req.session.user.name = name
    res.render("customer/settings", {
      userName : data.name,
      logInOut : "Logout",
      data
    })
  }
}

const settingsPassword = async(req, res) =>{
  data = req.session.user

  res.render("customer/changePass",{
    ...EJS_INFO,
    userName : data.name,
    logInOut : "Logout",
    data
  })
}

const settingsPasswordUpdate = async (req, res) =>{

  const { oldpw, newpw, rppw } = req.body

  data = req.session.user

  const match = await bcrypt.compare(oldpw, data.password)

  if(match){
    if(newpw === rppw){
      const salt = await bcrypt.genSaltSync(10)
      const hashedPass = await bcrypt.hash(newpw, salt)
      console.log(hashedPass)
      const result = await accountService.updatePassword(data.id, hashedPass)
      console.log(result)
      if(result === 0){
        res.json({message: "Password not Change"})
      }else{
        res.render("customer/login", {
          ejsModalDisplay: "block",
          ejsPageTitle: "Change Password",
          ejsHeadBackground: "bg-success",
          ejsMessageTitle: `Change Password `,
          ejsServerMessage: `You have successfully change your password. Please login again using your new password`,
          ejsRedirectPage: `/login`,
          ejsMessageButton: "Close",
        });
      }
    }else{
      res.render("customer/changePass", {
        ejsModalDisplay: "block",
        ejsPageTitle: "Change Password",
        ejsHeadBackground: "bg-danger",
        ejsMessageTitle: `Password did not match `,
        ejsServerMessage: `New Password and Repeat Password did not match`,
        ejsRedirectPage: `/settings/change-password`,
        ejsMessageButton: "Close",
        userName : req.session.user.name,
        logInOut : "Logout",
        data
      });
    }
  }else{
    res.render("customer/changePass", {
      ejsModalDisplay: "block",
      ejsPageTitle: "Change Password",
      ejsHeadBackground: "bg-danger",
      ejsMessageTitle: `Wrong Password `,
      ejsServerMessage: `You have enetered wrong Old Password`,
      ejsRedirectPage: `/settings/change-password`,
      ejsMessageButton: "Close",
      userName : req.session.user.name,
      logInOut : "Logout",
      data
    });
  }

}

module.exports = {
  home,
  registerPage,
  contact,
  loginPage,
  settingsPage,
  settingsEdit,
  settingsUpdate,
  settingsPassword,
  settingsPasswordUpdate
};
