import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/user.model.js";
import customError from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "Hi from server" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(customError(401, "You can only update your account"));

  // console.log(req.body);

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userid: req.body.userid,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    // console.log(rest);
    res.status(200).json(rest);
  } catch (error) {
    // console.log(error);
    return next(customError(401, error.message));
  }
};
