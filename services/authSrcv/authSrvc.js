import User from "../../models/authModel/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { api_response } from "../../utils/response.js";

export const createUserSrcv = async (data) => {
  const isUserExist = await User.findOne({ email: data.email });
  if (isUserExist) {
    return api_response("FAIL", "Email already exists", null);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return api_response("SUCCESS", "User registered successfully", user);
};

export const loginUserSrvc = async ({ email, password }) => {
  const user = await User.findOne({ email });
  
  if (!user) {
    return api_response("FAIL", "Invalid email or password1", null);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return api_response("FAIL", "Invalid email or password2", null);
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    // { expiresIn: "1h" }
  );

  return api_response("SUCCESS", "Login successful", {
    token,
    user,
  });
};
