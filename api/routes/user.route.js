import express from "express";
import { test, updateUser } from "../controller/user.controller.js";
import verifyUser from "../utils/verifyUser.js";

const route = express.Router();

route.get("/test", test);

route.post("/update/:id", verifyUser, updateUser);

export default route;
