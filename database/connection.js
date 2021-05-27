const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "eclick",
};

const db = mysql.createConnection(dbConfig);

module.exports = (query) => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        reject(err);
      } else {
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
};
