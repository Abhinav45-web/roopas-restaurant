const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      {
        serverSelectionTimeoutMS: 10000,
      }
    );

    console.log(
      `🍃 MongoDB Connected: ${conn.connection.host}`
    );

    return conn;
  } catch (error) {
    console.log("\n========== MONGODB ERROR ==========");
    console.log("NAME:", error.name);
    console.log("MESSAGE:", error.message);

    if (error.reason) {
      console.log(
        "REASON:",
        error.reason.message || error.reason
      );
    }

    console.log("====================================\n");

    throw error;
  }
};

module.exports = connectDB;