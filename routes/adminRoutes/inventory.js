import express from "express"
import { getInventoryAlertsCtrl, inventoryCountCtrl } from "../../controllers/adminCtrl/inventoryCtrl/inventoryCtrl.js";
 
export const inventoryRoutes = express.Router()

inventoryRoutes.get("/",inventoryCountCtrl); 