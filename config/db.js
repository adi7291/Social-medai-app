import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.CONNECTION_URL;

const connectDb = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("CONNECTION_URL is missing in .env file");
    }
    await mongoose.connect(MONGO_URI);
    console.log("Db connected Successfully!!");
  } catch (error) {
    console.log("DB Error", error);
  }
};

export default connectDb;
