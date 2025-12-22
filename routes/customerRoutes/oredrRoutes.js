import express from "express";
import { authMiddelware } from "../../middlewares/authMiddleware/authMiddelware.js";
 
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
orderRoutes.post("/checkout-order", authMiddelware,validate(OrderSchema), addOrderCtrl);
orderRoutes.get("/get-all-order/:id", authMiddelware, getAllOrdersCtrl);
orderRoutes.get("/get-all-order", authMiddelware, getAllOrdersCtrl);
orderRoutes.patch("/update-Order/:id", authMiddelware, updateOrderCtrl);
orderRoutes.delete("/delete-order/:id", authMiddelware, deleteOrderCtrl);

