import jwt from "jsonwebtoken";
import User from "../../models/authModel/userModel.js";
 
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    let authEntity = null;
 
    if (decoded?.id) {
      authEntity = await User.findById(decoded.id).select("-password");
    }
    if (!authEntity) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { _id, name, email, } = authEntity; 
    const user = {
      userId: _id, name, email
    }
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const unAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
               
    return next();

    }

    let authEntity = null;
 
    if (decoded?.id) {
      authEntity = await User.findById(decoded.id).select("-password");
    }
    if (!authEntity) {
        next();

    }

    const { _id, name, email, } = authEntity; 
    const user = {
      userId: _id, name, email
    }
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
