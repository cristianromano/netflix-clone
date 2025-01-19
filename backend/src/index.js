import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import authRouter from "./router/auth.routes.js";
// import cors from "cors";
import cookieParser from "cookie-parser";
import movieRouter from "./router/movie.routes.js";
import tvShowsRouter from "./router/tvshows.routes.js";
import searchRouter from "./router/search.routes.js";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(express.json());
// app.use(cors());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/tv", tvShowsRouter);
app.use("/api/v1/search", searchRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
  connectDB();
});
