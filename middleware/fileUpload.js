const multer = require("multer");
const { join } = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  req.session.imageError = undefined;
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    req.session.imageError = "Not an image! Please upload image";
    cb(null, true);
  }
};

module.exports = multer({ storage: fileStorage, fileFilter });
