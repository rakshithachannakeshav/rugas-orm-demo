const { Sequelize } = require("sequelize");

const db = new Sequelize("order_management", "postgres", "Rakshitha@2004", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // Optional: Removes SQL logs from console
});

db.authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

module.exports = db;
