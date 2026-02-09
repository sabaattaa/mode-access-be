import express from "express";
import { 
    addfeedBackCtrl,
    getAllfeedBacksCtrl,
    deletefeedBackCtrl,
    updatefeedBackCtrl, 
    addWishlistCtrl,
    getWishlistCtrl, 
} from   "../../controllers/customerCtrl/feedbackCtrl.js";
import { authMiddleware } from "../../middlewares/authMiddleware/authMiddleware.js"
 

export const feedBackRoutes = express.Router();
 

feedBackRoutes.post("/add-to-wishlist/:id", authMiddleware, addWishlistCtrl);
feedBackRoutes.get("/get-wishlist", authMiddleware, getWishlistCtrl);
feedBackRoutes.delete("/delete-from-wishlist/:id", authMiddleware, deleteWishlistCtrl);

// All feedBack routes with auth
feedBackRoutes.post("/add-feedBack", authMiddleware, addfeedBackCtrl);
feedBackRoutes.get("/get-all-feedBack", authMiddleware, getAllfeedBacksCtrl);
feedBackRoutes.put("/update-feedBack/:id", authMiddleware, updatefeedBackCtrl);
feedBackRoutes.delete("/delete-feedBack/:id", authMiddleware, deletefeedBackCtrl);

