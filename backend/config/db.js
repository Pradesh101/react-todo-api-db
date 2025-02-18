const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGO_URI ||
      "mongodb+srv://gwachhapradesh:Poplol999@cluster0.uwqhm.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0";
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // process code 1 means exit with failure , 0 means success
  }
};

module.exports = { connectDB };
