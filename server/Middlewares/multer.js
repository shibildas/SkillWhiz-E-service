const multer = require("multer")
const path = require("path")

function checkFileType(file, cb) {

    const filetypes = /jpeg|jpg|png|gif/;

    const mimetype = filetypes.test(file.mimetype);

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Invalid file type.'));
    }
  }
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  });
  
  module.exports = upload