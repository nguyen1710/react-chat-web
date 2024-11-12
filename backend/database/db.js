const mongoose = require('mongoose')
const dotenv = require('dotenv');

// Nạp các biến môi trường từ file .env
dotenv.config()

const connectToDB = async () => {
  console.log("Attempting to connect to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

// connectToDB()


module.exports = connectToDB