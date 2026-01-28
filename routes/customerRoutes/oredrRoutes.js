import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware/authMiddleware.js";

import {
    addOrderCtrl,
    getAllOrdersCtrl,
    deleteOrderCtrl,
    updateOrderCtrl,
    getAllUserOrdersCtrl,
} from "../../controllers/customerCtrl/orderCtrl.js"
import { validate } from "../../middlewares/validations/valdiationMiddleware.js";
import { OrderSchema } from "../../validationSchemas/orderValidation.js";

export const orderRoutes = express.Router();
// admin routes 
orderRoutes.get("/get-all-order", authMiddleware, getAllOrdersCtrl);


orderRoutes.post("/place-order", authMiddleware, validate(OrderSchema), addOrderCtrl);
orderRoutes.get("/get-all-user-order/", authMiddleware, getAllUserOrdersCtrl);
orderRoutes.patch("/update-Order/:id", authMiddleware, updateOrderCtrl);
orderRoutes.delete("/delete-order/:id", authMiddleware, deleteOrderCtrl);

