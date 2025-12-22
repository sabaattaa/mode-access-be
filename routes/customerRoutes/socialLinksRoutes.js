import express from "express";
import { authMiddelware } from "../../middlewares/authMiddleware/authMiddelware.js";
import {  getSocialLinksModal, updateSocialLinksModal } from "../../controllers/customerCtrl/socialLinksCtrl.js";
 
export const socialLinksRoutes = express.Router();
  
socialLinksRoutes.post("/", authMiddelware,  updateSocialLinksModal);
socialLinksRoutes.get("/", authMiddelware,  getSocialLinksModal);
 