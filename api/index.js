import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();
const connection = mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("server connection successful"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => console.log("Server listening at 3000"));
