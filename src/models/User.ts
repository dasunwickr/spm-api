import mongoose, { Schema, Document } from "mongoose";
import { User } from "../types/User";

export interface IUserModel extends User, Document {}

const UserSchema: Schema = new Schema({
  uid: { type: String, required: true, unique: true },
  fname: { type: String },
  lname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUserModel>("User", UserSchema);
