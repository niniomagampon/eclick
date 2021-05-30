const bcrypt = require("bcryptjs");
const Account = require("../models/Account");
let hashedPass;

const register = async (name, email, mobile, password, userType) => {

  if (password === ""){
    hashedPass = password
  }else{
    const salt = bcrypt.genSaltSync(10);
    hashedPass = await bcrypt.hash(password, salt);
  }

  try {
    await Account.create({ name, email, mobile, password: hashedPass, userType});

    return true;
  } catch (err) {
    return err;
  }
};


const login = async (email) => {

  try {
    const accountData =  await Account.findAll({
        where : {
            email : email
        }
    });

    return accountData

  } catch(err) {

    return err;

  }
};

const getAllUsers = async () =>{
  try{
    return await Account.findAll({
      paranoid: false,
      order: [["createdAt", "DESC"]]
    })
  }
  catch(err){
    return err
  }
} 

module.exports = {login, getAllUsers, register}