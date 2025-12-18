// middleware/optionalAuth.js 
import jwt from "jsonwebtoken";

import User from "../../models/customerModels/userModel.js";

export const authMiddelware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            console.log("token", token)

            if (token) {
                try {
                    const key = process.env.JWT_SECRET;
                    const decoded = jwt.verify(token, key);
                    const user = await User.findById(decoded.id).select("-password");
                    if (user) {
                        req.user = user;
                    }
                } catch (tokenError) {
                    console.log("Token invalid, continuing as guest");
                }
            }
        }

        next();

    } catch (error) {
        next();
    }
};