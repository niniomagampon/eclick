const sequelize = require("../configs/database");
const { Model, DataTypes } = require("sequelize");

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "This category name is already taken.",
      },
      validate: {
        notEmpty: {
          msg: "Category Name is required",
        },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category slug is required",
        },
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
    sequelize,
    modelName: "categories",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Category;
