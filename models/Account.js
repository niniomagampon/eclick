const sequelize = require('../configs/database');
const { Model, DataTypes } = require('sequelize');

class Account extends Model { }
Account.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "Email is required"
      },
      isEmail: {
        msg: "Must be a valid email address"
      }
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required'
      }
    },
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Mobile number is required'
      }
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password is required'
      }
    },
  }
}, {
  sequelize,
  modelName: 'accounts',
  timestamps: true,
  paranoid: true,
});

module.exports = Account;