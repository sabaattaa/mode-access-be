import jwt from "jsonwebtoken";
import User from "../../models/authModel/userModel.js";
import Guest from "../../models/customerModels/guestModel.js";

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

    console.log("decodeddecoded", decoded)

    let authEntity = null;

    // User authentication
    if (decoded?.id) {
    console.log("1111111iser", decoded)

      authEntity = await User.findById(decoded.id).select("-password");
    }

    //   Guest authentication
    if (!authEntity && decoded?.guest_id) {
    console.log("222222iser", decoded)

      authEntity = await Guest.findOne({ guest_id: decoded.guest_id }).select("-password");
    }
    console.log("33333", authEntity)

    if (!authEntity) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.user = authEntity;
    req.authType = decoded?.id ? "user" : "guest";

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
