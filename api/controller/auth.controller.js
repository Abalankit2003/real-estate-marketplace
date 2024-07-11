import User from "../models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

export const signup = async (req, res) => {
    const {userid, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({userid, email, password : hashPassword});
    try {
        await newUser.save();
        res.status(200).send("signup successfull...");
    } catch(err) {
        res.status(500).send(err.message);
    }
    res.status(200).send("signUp successful");
}
