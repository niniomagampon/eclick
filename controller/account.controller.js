const express = require("express");
const accountService = require("../service/account.service");
const bcrypt = require("bcryptjs");
const withErrors = require("../utils/withErrors");
const EJS_INFO = require("../constants/ejs");

// ADMIN 
const index = async (req, res) =>{
    const users = await accountService.getAllUsers();

    if(users){
        res.render("admin/users/index",{
            users
        })
    }
    else{
        console.log("error")
    }
}

const add = async (req, res)=>{

    const {name,email,mobile,password} = req.body

    const user = await accountService.register(name ,email ,mobile ,password, 'staff');

    const users = await accountService.getAllUsers();

    if (typeof user === "boolean" && user === true){
        res.render("admin/users/index",{
            users
        })
    }
    else{
       return("have error")
    }
}


const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await accountService.login(email);

  if (!result.length) {
    res.locals.msg = "Invalid email or password.";
    res.render("admin/login");
  } else {
    const [user] = result;
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.user = user;
      req.session.isLoggedIn = true;
      res.redirect("/admin");
    } else {
      res.locals.msg = "Invalid email or password.";
      res.render("admin/login");
    }
  }
};

// CUSTOMER
const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await accountService.login(email);

  if (!result.length) {
    res.render("login", {
      ejsModalDisplay: "block",
      ejsPageTitle: "Register",
      ejsHeadBackground: "bg-danger",
      ejsMessageTitle: `Email Does not Exist `,
      ejsServerMessage: `${email} does not exist, Please check carefully. If you do not have account yet, Click register`,
      ejsRedirectPage: `/`,
      ejsMessageButton: "Close",
    });
  }

  if (result) {
    const [data] = result;

    const match = await bcrypt.compare(password, data.password);

    if (match) {
      res.render("cart", {
        ejsOrders: [],
        ejsName: data.name,
      });
    } else {
      res.render("login", {
        ejsModalDisplay: "block",
        ejsPageTitle: "Register",
        ejsHeadBackground: "bg-danger",
        ejsMessageTitle: `Wrong Password `,
        ejsServerMessage: `You have entered wrong password, Please check before submitting`,
        ejsRedirectPage: `/`,
        ejsMessageButton: "Close",
      });
    }
  }
};

const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const result = await accountService.register(name, email, mobile, password, "customer");

  if (typeof result === "boolean" && result === true) {
    res.render("register", {
      ejsModalDisplay: "block",
      ejsPageTitle: "Register Success",
      ejsHeadBackground: "bg-success",
      ejsMessageTitle: "Registered Successfully",
      ejsServerMessage:
        "Welcome You have Successfully Registered to Eclick, Please click button to Login",
      ejsRedirectPage: "/",
      ejsMessageButton: "Go to Login Page",
    });
    console.log("New user Created");
  } else {
    console.log(result);
    res.locals.errors = withErrors(result);
    res.locals.oldValue = { name, email, mobile, password };
    res.render("register", { ...EJS_INFO });
  }
};

module.exports = { login, register, adminLogin ,index, add};
