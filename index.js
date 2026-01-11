import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";

import connectDb from "./config/db.js";
import postRoutes from "./routes/posts.js";
import generateAccessToken from "./config/token.js";
import authRoutes from "./routes/auth.routes.js";

// 1️⃣ Load env FIRST
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    withCredentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/posts", postRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
generateAccessToken();
const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};
startServer();
