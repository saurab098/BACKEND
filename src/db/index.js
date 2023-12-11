import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionAny = await mongoose.connect(`${process.env.MONGODB_URI}`);
    conswole.log(
      `Connected MongoDB !! DB HOST: ${connectionAny.connection.host}`
    );
  } catch (error) {
    console.log("Error in connection of MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
