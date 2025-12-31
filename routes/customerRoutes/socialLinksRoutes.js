import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware/authMiddleware.js";
import {  getSocialLinksModal, updateSocialLinksModal } from "../../controllers/customerCtrl/socialLinksCtrl.js";
 
export const socialLinksRoutes = express.Router();
  
socialLinksRoutes.post("/", authMiddleware,  updateSocialLinksModal);
socialLinksRoutes.get("/", authMiddleware,  getSocialLinksModal);
 