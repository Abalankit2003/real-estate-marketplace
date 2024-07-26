import User from "../models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import customError from "../utils/error.js";

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({userid: username, email, password : hashPassword });
    try {
        await newUser.save();
        res.status(200).json("signup successful...");
    } catch(err) {
        // res.status(500).send(err.message);
        return next(err);
    }
}
