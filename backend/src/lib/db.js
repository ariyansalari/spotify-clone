import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongo db connected!");
  } catch (err) {
    console.log("Failed to connect to MongoDB ", err);
    process.exit(1) //1 is failure;
  }
};
