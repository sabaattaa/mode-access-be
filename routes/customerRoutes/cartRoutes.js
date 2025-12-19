import express from "express";
import {
    generateGuest,
    addCartCtrl,
    getAllCartsCtrl,
    deleteCartCtrl,
    updateCartCtrl, 
    addWishlistCtrl, 
} from "../../controllers/customerCtrl/cartCtrl/cartCtrl.js";
import { authMiddelware } from "../../middlewares/authMiddleware/authMiddelware.js";

export const CartRoutes = express.Router();
 
CartRoutes.get("/generate-guest", generateGuest);
CartRoutes.post("/add-to-wishlist", authMiddelware, addWishlistCtrl);

// All cart routes with auth
CartRoutes.post("/add-cart", authMiddelware, addCartCtrl);
CartRoutes.get("/get-all-cart/:id", authMiddelware, getAllCartsCtrl);
CartRoutes.delete("/update-cart/:id", authMiddelware, updateCartCtrl);
CartRoutes.delete("/delete-cart/:id", authMiddelware, deleteCartCtrl);

