import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware/authMiddleware.js";
 
import {
    addOrderCtrl, 
    getAllOrdersCtrl,
    deleteOrderCtrl,
    updateOrderCtrl, 
} from "../../controllers/customerCtrl/orderCtrl.js"
import { validate } from "../../middlewares/validations/valdiationMiddleware.js";
import { OrderSchema } from "../../validationSchemas/orderValidation.js";

export const orderRoutes = express.Router();
 
// All Order routes with auth
orderRoutes.post("/checkout-order", authMiddleware,validate(OrderSchema), addOrderCtrl);
orderRoutes.get("/get-all-order/:id", authMiddleware, getAllOrdersCtrl);
orderRoutes.get("/get-all-order", authMiddleware, getAllOrdersCtrl);
orderRoutes.patch("/update-Order/:id", authMiddleware, updateOrderCtrl);
orderRoutes.delete("/delete-order/:id", authMiddleware, deleteOrderCtrl);

