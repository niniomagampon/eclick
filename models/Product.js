const sequelize = require("../configs/database")
const { Model, DataTypes } = require("sequelize")

class Product extends Model { }

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull : false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Product Name is required"
            }
        }
    },

    description: {
        type: DataTypes.STRING,
        allowNull : false,
        validate: {
            notEmpty: {
                msg: "Description is required"
            }
        }
    },

    category: {
        type: DataTypes.STRING,
        allowNull : false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Product Name is required"
            }
        }
    },

    image: {
        type: DataTypes.STRING,
        allowNull : false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Product Name is required"
            }
        }
    },

    price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Price is required"
            }
        }
    }
}, {
    sequelize,
    modelName: 'products',
    timestamps: true,
    paranoid: true,
  })

module.exports = Product;