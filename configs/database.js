const { Sequelize } = require("sequelize");

module.exports = new Sequelize("eclick", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
