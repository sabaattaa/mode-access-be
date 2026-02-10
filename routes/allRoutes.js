import express from "express";
import { authRouter } from "./adminRoutes/authRoutes.js";
import { categoryRoutes } from "./adminRoutes/categoryRoutes.js";
import { productRoutes } from "./adminRoutes/productRoutes.js";
import { inventoryRoutes } from "./adminRoutes/inventory.js";
import { mediaRoutes } from "./adminRoutes/media.js";
import { CartRoutes } from "./customerRoutes/cartRoutes.js";
import { orderRoutes } from "./customerRoutes/oredrRoutes.js"; 
import { socialLinksRoutes } from "./customerRoutes/socialLinksRoutes.js";
import { userAddressRoutes } from "./customerRoutes/userAdressRoutes.js";
import { feedBackRoutes } from "./customerRoutes/feedbackRoutes.js"; 

export const AllRoutes = express.Router();

// ADMIN ROUTES 
AllRoutes.use("/auth", authRouter);
AllRoutes.use("/category", categoryRoutes);
AllRoutes.use("/product", productRoutes);
AllRoutes.use("/inventory", inventoryRoutes);
AllRoutes.use("/media", mediaRoutes);


// CUSTOMER ROUTES 

AllRoutes.use("/cart", CartRoutes);
AllRoutes.use("/oredr", orderRoutes);
AllRoutes.use("/social-links", socialLinksRoutes);
AllRoutes.use("/user-address", userAddressRoutes);

AllRoutes.use("/feedback", feedBackRoutes);