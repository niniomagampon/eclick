const bcrypt = require("bcryptjs");
const Account = require("../models/Account");
let hashedPass;

module.exports = async (name, email, mobile, password, userType) => {

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
