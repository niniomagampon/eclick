const fs = require("fs");

module.exports = (filePath) => {
  return new Promise((resolve) => {
    fs.unlink(filePath, () => {
      resolve(true);
    });
  });
};
