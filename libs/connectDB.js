import mongoose from "mongoose";

let isConnected = false; // track connection

export async function connectDB() {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGODB_URL) {
    throw new Error("Please define the MONGO_URI environment variable");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
  } catch (err) {
    throw err;
  }
}
