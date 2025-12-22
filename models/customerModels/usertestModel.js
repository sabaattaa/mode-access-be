import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    agree_terms_and_conditions: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.index({ name: 1, email: 1 });

const User = mongoose.model("TestUser", userSchema);
export default User;
