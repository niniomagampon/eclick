const Account = require("../models/Account");

module.exports = async (email) => {

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
