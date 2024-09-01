import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("mongodb connected");
    return true;
  } catch (error) {
    console.log("Failed to connect to mongodb", error);
  }
}

export default dbConnect;
