import express from "express"
import { addCartCtrl, deleteCartCtrl, getAllCartsCtrl, updateCartCtrl } from "../../customer/cartCtrl/cartCtrl.js";
 
export const CartRoutes = express.Router();

CartRoutes.post("/add-cart",  addCartCtrl);
CartRoutes.get("/get-all-cart", getAllCartsCtrl);
CartRoutes.put("/update-cart",  updateCartCtrl);
CartRoutes.delete("/delete-cart", deleteCartCtrl); 
 