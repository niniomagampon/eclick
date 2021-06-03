const sequelize = require("../configs/database");
const { Model, DataTypes } = require("sequelize");

class Cart extends Model {}
Cart.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		isCheckedOut: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		qty: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Quantity is required.",
				},
			},
		},
	},
	{
		sequelize,
		modelName: "carts",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = Cart;
