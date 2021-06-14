const { Sequelize } = require("sequelize");

// module.exports = new Sequelize("eclick", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

module.exports = new Sequelize("eclick", "jhlbdj3betw100xa", "v5jm81alh13uqt70", {
  host: "klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  dialect: "mariadb",
});