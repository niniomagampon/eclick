const Account = require("../models/Account");

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

module.exports = {login, getAllUsers}