import express from "express";
import { authMiddelware } from "../../middlewares/authMiddleware/authMiddelware.js";
 
import {
    addOrderCtrl, 
    getAllOrdersCtrl,
    deleteOrderCtrl,
    updateOrderCtrl,
    addOrderItmsCtrl,  
} from "../../controllers/customerCtrl/orderCtrl.js"
import { validate } from "../../middlewares/validations/valdiationMiddleware.js";
import { OrderSchema } from "../../validationSchemas/orderValidation.js";

export const orderRoutes = express.Router();
 
// All Order routes with auth
orderRoutes.post("/checkout-order", authMiddelware,validate(OrderSchema), addOrderCtrl);
orderRoutes.post("/order-items", authMiddelware, addOrderItmsCtrl);
orderRoutes.get("/get-all-Order/:id", authMiddelware, getAllOrdersCtrl);
orderRoutes.delete("/update-Order/:id", authMiddelware, updateOrderCtrl);
orderRoutes.delete("/delete-Order/:id", authMiddelware, deleteOrderCtrl);

