import dotenv from "dotenv";
dotenv.config();
import express from "express";

import bodyParser from "body-parser";
import cors from "cors";

import connectDb from "./config/db.js";
import postRoutes from "./routes/posts.js";

// 1️⃣ Load env FIRST
const app = express();

app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const port = process.env.PORT || 5000;

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
