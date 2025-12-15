import express from "express";
import { authRouter } from "./authRoutes.js";
import { categoryRoutes } from "./categoryRoutes.js";
import { productRoutes } from "./productRoutes.js";
import { inventoryRoutes } from "./inventory.js";
import { mediaRoutes } from "./media.js";
// import { orderRoutes } from "./orders.js";
 
export const AllRoutes = express.Router();

AllRoutes.use("/auth", authRouter);  
AllRoutes.use("/category", categoryRoutes);  
AllRoutes.use("/product", productRoutes);  
AllRoutes.use("/inventory", inventoryRoutes);  
AllRoutes.use("/media", mediaRoutes);  
// AllRoutes.use("/order", orderRoutes);  

 