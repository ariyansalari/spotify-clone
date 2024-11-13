import { UserModel } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.currentUserId;

    const users = await UserModel.find({ clerkId: { $ne: currentUserId } });

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
