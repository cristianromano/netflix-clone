import express from "express";
import dotenv from "dotenv";
import connectDB from "../lib/db.js";
import authRouter from "../router/auth.routes.js";
dotenv.config();
const app = express();

app.use("/api/v1/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
  connectDB();
});
