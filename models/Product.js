const sequelize = require("../confgis/database")
const { Model, DataTypes } = require("sequalize")

class Product extends Model { }

Product.init({
    name: {
        type: Datatypes.STRING,
        allowNull : false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Product Name is required"
            }
        }
    },

    description: {
        type: Datatypes.STRING,
        allowNull : false,
        validate: {
            notEmpty: {
                msg: "Description is required"
            }
        }
    },

    category: {
        type: Datatypes.STRING,
        allowNull : false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Product Name is required"
            }
        }
    },

    image: {
        type: Datatypes.STRING,
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