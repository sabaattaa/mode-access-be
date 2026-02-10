import express from "express";
import { 
    addfeedBackCtrl,
    getAllfeedBacksCtrl,
    deletefeedBackCtrl,
    updatefeedBackCtrl,  
} from   "../../controllers/customerCtrl/feedbackCtrl.js";
import { authMiddleware } from "../../middlewares/authMiddleware/authMiddleware.js"
 

export const feedBackRoutes = express.Router();
 

 
feedBackRoutes.post("/add-feedback", authMiddleware, addfeedBackCtrl);
feedBackRoutes.get("/get-all-feedback", authMiddleware, getAllfeedBacksCtrl);
feedBackRoutes.put("/update-feedback/:id", authMiddleware, updatefeedBackCtrl);
feedBackRoutes.delete("/delete-feedback/:id", authMiddleware, deletefeedBackCtrl);

