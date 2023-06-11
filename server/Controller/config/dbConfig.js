const mongoose = require("mongoose");

const connectDb = async (url) => {
  mongoose.set("strictQuery", false);
  try {
    const db = { dbName: "skillwhiz" };
    await mongoose.connect(url, db);
    console.log(`Database connected to ${db.dbName} Successfully`);
  } catch (error) {
    console.log("Connection Error: " + error);
  }
};
module.exports = connectDb;
