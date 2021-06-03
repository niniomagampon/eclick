const sequelize = require("../configs/database");
const { Model, DataTypes } = require("sequelize");

class Order extends Model {}
Order.init(
	{
		ref_number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				msg: "Address is required.",
			},
		},
		payment_type: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				msg: "Payment Type is required.",
			},
		},
		payment_status: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				msg: "Payment Status is required.",
			},
		},
		order_status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		total: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "orders",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = Order;
