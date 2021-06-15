const bcrypt = require("bcryptjs");
const { Product } = require("../models");
const Account = require("../models/Account");
let hashedPass;


const getAllUsers = async () => {
  try {
    return await Account.findAll({
      paranoid: false,
      order: [["createdAt", "DESC"]]
    })
  }
  catch (err) {
    return err
  }
}

const register = async (name, email,address, mobile, password, userType) => {

  if (password === "") {
    hashedPass = password
  } else {
    const salt = bcrypt.genSaltSync(10);
    hashedPass = await bcrypt.hash(password, salt);
  }

  try {
    await Account.create({ name, email, address, mobile, password: hashedPass, userType });

    return true;
  } catch (err) {
    return err;
  }
};


const login = async (email) => {

  try {
    return await Account.findAll({
      where: {
        email: email
      }
    });

  } catch (err) {

    return err;

  }
};

const deleteUser = async (id) => {
  try {
    await Account.destroy({
      where:
        { id },
    })

  } catch (err) {
    return (err)
  }
}

const getOneUser = async (id) => {
  try {
    return await Account.findOne({ where: { id } });
  } catch (err) {
    return err;
  }
};

const update = async (id, name, email, address, mobile, userType) => {
  try {
    return await Account.update({
      name,
      email,
      address,
      mobile,
      userType
    }, { where: { id } })
  } catch (err) {
    return err
  }
}

const updatePassword = async (id, password) =>{
  try{
    return await Account.update({
      password
    }, {where : {id}})
  }catch(err){
    console.log(err, password)
  
  }
}

const restore = async (id) => {
  try {
    await Account.restore({
      where: {
        id
      }
    })
  }
  catch (err) {
    return err
  }
}


module.exports = {
  login,
  getAllUsers,
  register,
  deleteUser,
  getOneUser,
  update,
  restore,
  updatePassword
}