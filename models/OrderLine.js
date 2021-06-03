const sequelize = require("../configs/database");
const { Model, DataTypes } = require("sequelize");

class OrderLineItem extends Model {}
OrderLineItem.init(
	{
		qty: {
      type: DataTypes.INTEGER,
			allowNull: false,
    },
		price: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "order_line_items",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = OrderLineItem;
