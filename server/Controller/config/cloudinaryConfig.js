const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_API_Key,
  api_secret: process.env.Cloud_API_SECRET,
});

module.exports = cloudinary;
