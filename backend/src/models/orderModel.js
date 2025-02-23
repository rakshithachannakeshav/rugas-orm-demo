const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Customer = require("./Customer");
const Product = require("./Product");

const Order = db.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: { type: DataTypes.STRING, defaultValue: "Pending" },
});

Order.belongsTo(Customer);
Order.belongsTo(Product);

module.exports = Order;
