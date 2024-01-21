import mongoose from "mongoose";
import { configData } from "../config/config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${configData.mongodb.url}/${configData.mongodb.dbname}`
    );
    console.log(`MongoDB database Connection SuccessFully..!`);
  } catch (error) {
    console.log(`MonoDB database connection Error..!:-> ${error.message}`);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log(`MongoDB database disconnected..!`);
  } catch (error) {
    console.log(`MongoDB database disconnection error..!:-> ${error.message}`);
  }
};

export { connectDB, disconnectDB };
