const bcrypt = require("bcryptjs");
const Account = require("../models/Account");

module.exports = async (name, email, mobile, password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = await bcrypt.hash(password, salt);

  try {
    await Account.create({name, email, mobile, password : hashedPass});
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
