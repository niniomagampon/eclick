const express = require("express");
const createService = require("../service/createUser");
const loginService = require("../service/retrieveUser");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;


  const result = await loginService(email, password);

  if (!result) {
    console.log("error");
  }

  if(result){

    const [data] = result 

    const match = await bcrypt.compare(password, data.password);
    
        if(match) {
            res.render("cart", {
                ejsProducts: [],
                ejsName: data.name,
              });
        }
        else{
            res.send("You have Entered a Wrong Password")
        }
  }
};

const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const result = await createService(name, email, mobile, password);

  const userData = await loginService(email, password);

  const [userDataArray] = userData

  if (result) {
    res.status(200).render("cart", {
      ejsProducts: [],
      ejsName : userDataArray.name
    });
  } else {
    console.log(err);
  }
};

module.exports = { login, register };
