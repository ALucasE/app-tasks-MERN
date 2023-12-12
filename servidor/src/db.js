import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27020/tasksdb");
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
