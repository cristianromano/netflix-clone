import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
/**
 * Asynchronously connects to the MongoDB database using the connection string
 * specified in the environment variable `MONGO_URI`.
 *
 * @async
 * @function
 * @throws Will throw an error if the connection to the database fails.
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
