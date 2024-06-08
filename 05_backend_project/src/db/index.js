import mongoose from "mongoose";

// Database is on another continent, thats why we need to use async/await

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`Connected to MongoDB!!! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error: ", error);    
    process.exit(1);
  }
};

export default connectDB;