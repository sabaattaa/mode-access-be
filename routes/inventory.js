import express from "express"
import { getInventoryAlertsCtrl, inventoryCountCtrl } from "../controllers/inventoryCtrl/inventoryCtrl.js";
 
export const inventoryRoutes = express.Router()

inventoryRoutes.get("/",inventoryCountCtrl); 