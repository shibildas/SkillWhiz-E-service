const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // set upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // set unique filename
  },
});

const upload = multer({ storage: storage });

// Middleware function for handling file uploads
const handleFileUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ message: "Error uploading file" });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ message: "Error uploading file" });
    }
    // File upload successful. Add file object to request object.
    req.file = req.file || {};
    req.file.path = req.file.path || "";
    next();
  });
};

module.exports = handleFileUpload;
