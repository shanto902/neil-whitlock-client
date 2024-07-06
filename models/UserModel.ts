import { TUser } from "@/interface/user.interface";
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: [true, "Email Required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password Required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name Required"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
