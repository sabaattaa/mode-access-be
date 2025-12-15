import express from "express"
 
export const orderRoutes = express.Router()

orderRoutes.get("/get-orders", getorderAlertsCtrl);
orderRoutes.put("/update-order", orderCountCtrl);
 