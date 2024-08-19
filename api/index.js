import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listing from './routes/listing.route.js';
import cors from "cors";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


dotenv.config();
const connection = mongoose
.connect(process.env.MONGO)
.then(() => console.log("server connection successful"))
.catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listing);
app.get("/",(req,res) => {
  console.log("Hello");
  res.json({"HI from server" : "Ankit"});
  return res.end();
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success : false,
    statusCode,
    message,
  });
}) 

app.listen(3000, () => console.log("Server listening at 3000"));
