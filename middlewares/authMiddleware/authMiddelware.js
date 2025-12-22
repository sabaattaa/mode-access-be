// middleware/optionalAuth.js 
import jwt from "jsonwebtoken";

// import User from "../../models/customerModels/userModel.js";
import User from "../../models/authModel/userModel.js";

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

                    console.log("my token", decoded)

                    const user = await User.findById(decoded.id).select("-password");
                    console.log("auth userr", user)
                    if (user) {
                        req.user = user;
                    } else {
                        return res.status(403).json({
                            message: "Unauthorized user"
                        });
                    }
                } catch (tokenError) {
                    console.log("Token invalid, continuing as guest");
                }
            }
        }

        next();

    } catch (error) {
        // next();
    }
};