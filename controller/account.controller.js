const express = require("express");
const session = require("express-session");
const accountService = require("../service/account.service");
const bcrypt = require("bcryptjs");
const withErrors = require("../utils/withErrors");
const EJS_INFO = require("../constants/ejs");
const clearSession = require("../utils/clearSession");
const loggedinSession = require("../utils/loginSession");

// ADMIN SIDE
const index = async (req, res) => {
	const users = await accountService.getAllUsers();
	clearSession(req);
	if (users) {
		res.render("admin/users/index", {
			users,
      user: req.session.user,
		});
	} else {
		console.log("error");
	}
};

const add = async (req, res) => {
	const { name, email,address, mobile, password, userType } = req.body;

	const user = await accountService.register(
		name,
		email,
		address,
		mobile,
		password,
		userType
	);

	const users = await accountService.getAllUsers();

	if (typeof user === "boolean" && user === true) {
		res.redirect("/admin/users");
	} else {
		return "have error";
	}
};

const remove = async (req, res) => {
	const { id } = req.params;
	await accountService.deleteUser(id);
	res.redirect("/admin/users");
};

const restore = async (req, res) => {
	const { id } = req.params;
	await accountService.restore(id);
	res.redirect("/admin/users");
};

const edit = async (req, res) => {
  if (req.session.user.userType !== 'Admin') res.redirect("/admin/users")
	const { id } = req.params;
	const result = await accountService.getOneUser(id);
	const { isSuccess, errors } = req.session;

	if (result) {
		res.render("admin/users/edit", {
			id: result.id,
			name: result.name,
			email: result.email,
			address: result.address,
			mobile: result.mobile,
			userType: result.userType,
			isSuccess,
			errors,
      user: req.session.user,
		});
	} else {
		res.redirect("/admin/users");
	}
};

const update = async (req, res) => {
	clearSession(req);
	const { id, name, email, address, mobile, userType } = req.body;
	const result = await accountService.update(id, name, email,address, mobile, userType);

	if (typeof result === "object" && result[0] === 1) {
		req.session.isSuccess = true;
		res.redirect(`/admin/users/edit/${id}`);
	} else {
		req.session.isSuccess = false;

		let errors = [];
		if ("parent" in result && result.parent.errno === 1062) {
			errors.push("User already exists");
		} else {
			for (let error of Object.values(withErrors(result))) {
				errors.push(error);
			}
		}

		req.session.errors = errors;
		res.redirect(`/admin/users/edit/${id}`);
	}
};

const adminLogin = async (req, res) => {
	const { email, password } = req.body;
	const result = await accountService.login(email);

	if (!result.length) {
		res.locals.msg = "Invalid email or password.";
		res.render("admin/login");
	} else {
		const [user] = result;
		const match = await bcrypt.compare(password, user.password);

    if (!["Admin", "Staff"].includes(user.userType)) {
      res.locals.msg = "Invalid email or password.";
			return res.render("admin/login");
    }

		if (match) {
			req.session.user = user;
			req.session.userType = user.userType;
			req.session.isLoggedIn = true;
			res.redirect("/admin");
		} else {
			res.locals.msg = "Invalid email or password.";
			res.render("admin/login");
		}
	}
};

// CUSTOMER SIDE
const login = async (req, res) => {
  const { email, password } = req.body;

   const result = await accountService.login(email);

  if (!result.length) {
    res.render("customer/login", {
      ejsModalDisplay: "block",
      ejsPageTitle: "Register",
      ejsHeadBackground: "bg-danger",
      ejsMessageTitle: `Email Does not Exist `,
      ejsServerMessage: `${email} does not exist, Please check carefully. If you do not have account yet, Click register`,
      ejsRedirectPage: `/login`,
      ejsMessageButton: "Close",
    });
  }

  if (result) {
    const [data] = result;
    const match = await bcrypt.compare(password, data.password);

    if (match) {
      req.session.isLoggedIn = true;
      req.session.username = data.name;
      req.session.user = data;

	  const orders = await []

      res.render("customer/ordersummary", {
        orders,
        userName: data.name,
        logInOut : "Logout"
      });
    } else {
      res.render("customer/login", {
        ejsModalDisplay: "block",
        ejsPageTitle: "Register",
        ejsHeadBackground: "bg-danger",
        ejsMessageTitle: `Wrong Password `,
        ejsServerMessage: `You have entered wrong password, Please check before submitting`,
        ejsRedirectPage: `/login`,
        ejsMessageButton: "Close",
      });
    }
  }
};

const register = async (req, res) => {
  const { name, email,address, mobile, password } = req.body;

  const result = await accountService.register(
    name, 
    email,
	address,
    mobile, 
    password, 
    "customer"
  );

  if (typeof result === "boolean" && result === true) {
    res.render("customer/register", {
      ejsModalDisplay: "block",
      ejsPageTitle: "Register Success",
      ejsHeadBackground: "bg-success",
      ejsMessageTitle: "Registered Successfully",
      ejsServerMessage:
        "Welcome You have Successfully Registered to Eclick, Please click button to Login",
      ejsRedirectPage: "/login",
      ejsMessageButton: "Go to Login Page",
    });
    console.log("New user Created");
  } else {
    res.locals.errors = withErrors(result);
    res.locals.oldValue = { name, email,address, mobile, password };
    res.render("customer/register", { ...EJS_INFO });
  }
};

module.exports = {
	login,
	register,
	adminLogin,
	index,
	add,
	remove,
	edit,
	update,
	restore,
};
