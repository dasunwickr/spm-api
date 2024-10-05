import UserModel from "../models/User";
import { User } from "../types/User";

export const createUser = async (userData: User) => {
  const user = new UserModel(userData);
  return user.save();
};

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};
