import express from "express";
import { 
    addCartCtrl,
    getAllCartsCtrl,
    deleteCartCtrl,
    updateCartCtrl, 
    addWishlistCtrl,
    deleteWishlistCtrl 
} from "../../controllers/customerCtrl/cartCtrl/cartCtrl.js";
import { authMiddleware } from "../../middlewares/authMiddleware/authMiddleware.js"

export const CartRoutes = express.Router();
 

CartRoutes.post("/add-to-wishlist/:id", authMiddleware, addWishlistCtrl);
CartRoutes.delete("/delete-from-wishlist/:id", authMiddleware, deleteWishlistCtrl);

// All cart routes with auth
CartRoutes.post("/add-cart", authMiddleware, addCartCtrl);
CartRoutes.get("/get-all-cart", authMiddleware, getAllCartsCtrl);
CartRoutes.put("/update-cart/:id", authMiddleware, updateCartCtrl);
CartRoutes.delete("/delete-cart/:id", authMiddleware, deleteCartCtrl);

