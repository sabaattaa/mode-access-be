
import mongoose from "mongoose";


const userModel = new mongoose.Schema(
    {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name too long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    //   select: false, 
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      index: true,
    },

    agree_terms_and_conditions: {
      type: Boolean,
      default: false,
    },

    is_active: {
      type: Boolean,
      default: true,
      index: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("User", userModel);




