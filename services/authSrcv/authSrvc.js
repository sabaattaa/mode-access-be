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

  const { _id, name, email, agree_terms_and_conditions, } = await User.create({
    ...data,
    password: hashedPassword,
  });

  const token = genrateUserTOken({_id, name, email, agree_terms_and_conditions,})
  const response = { _id, name, email, agree_terms_and_conditions, token };

  return api_response("SUCCESS", "User registered successfully", response);
};

export const loginUserSrvc = async ({ email, password }) => {
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return api_response("FAIL", "Invalid email or password1", null);
  }
 
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return api_response("FAIL", "Invalid email or password2", null);
  }
 
  delete user.password;
  const token = genrateUserTOken(user);
  return api_response("SUCCESS", "Login successful", {
    token,
    user,
  });
};


export const genrateUserTOken = (user) => {
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    // { expiresIn: "1h" }
  );

  return token

}