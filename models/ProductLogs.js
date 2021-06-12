const sequelize = require("../configs/database");
const { Model, DataTypes } = require("sequelize");

class ProductLogs extends Model {}

ProductLogs.init(
  {
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          msg: "Product Qty is required",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "product_logs",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = ProductLogs;
