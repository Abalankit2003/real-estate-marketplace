import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listing from "./routes/listing.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log(err));

// Define __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Define API routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listing);

// Serve static files from the "client/dist" directory
app.use(express.static(path.join(__dirname, "client", "dist")));

// Catch-all route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(3000, () => console.log("Server listening at port 3000"));
