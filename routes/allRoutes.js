import express from "express";
import { authRouter } from "./authRoutes.js";
import { categoryRoutes } from "./categoryRoutes.js";

const router = express.Router();

router.use("/auth", authRouter);  
router.use("/category", categoryRoutes);  

export const AllRouter = router;
