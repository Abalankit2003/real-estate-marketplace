import User from "../models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import customError from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });
        if (!validUser) return next(customError(405, "User not found"));
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(customError(401, "Wrong credential"));
        const session_id = jwt.sign(
          { id: validUser._id },
          process.env.JWT_SECRET_KEY
        );

        const { password : pass, ...rest} = validUser._doc;
        res
          .cookie("access_token", session_id, { httpOnly: true })
          .status(200)
          .json(rest);
    } catch (error) {
        next(error);
    }
}


// export default {signup, signin };
