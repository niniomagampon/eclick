const Account = require("../models/Account");

module.exports = async (email, password) => {

  try {
    const accountData =  await Account.findAll({
        where : {
            email : email
        }
    });

    return accountData

  } catch (err) {
    console.log(err);
    return false;
  }
};
