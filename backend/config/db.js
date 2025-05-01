const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("database connected".yellow));
  } catch (error) {
    console.log("config/db :: db connection error::".red, error);
    process.exit();
  }
};

module.exports = connectDb;
