require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("Failed to connect to database" + error);
    process.exit(1);
  }
};
module.exports = connectDB;
