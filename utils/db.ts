import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    throw new Error("Error connecting to MongoDB: " + error.message);
  }
};

export default connect;
