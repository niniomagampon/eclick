const { Sequelize } = require("sequelize");

module.exports = new Sequelize("eclick", "root", "root", {
  host: "localhost",
  dialect: "mysql",
}); 
