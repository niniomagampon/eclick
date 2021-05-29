const express = require("express");
const createService = require("../service/createUser");
const retrieveUser = require("../service/retrieveUser");
const bcrypt = require("bcryptjs");
const withErrors = require("../utils/withErrors");
const EJS_INFO = require("../constants/ejs");

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await retrieveUser.login(email);

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

  const result = await createService(name, email, mobile, password , "customer");

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
    console.log(result)
    res.locals.errors = withErrors(result);
    res.locals.oldValue = { name, email, mobile, password };
    res.render("register", { ...EJS_INFO });
  }
};

module.exports = { login, register };
