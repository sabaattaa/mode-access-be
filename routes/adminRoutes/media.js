import express from "express"
import { getmediaAlertsCtrl, mediaCountCtrl } from "../../controllers/mediaCtrl/mediaCtrl.js";

export const mediaRoutes = express.Router()
 
mediaRoutes.get("/get-media", getmediaAlertsCtrl);
mediaRoutes.delete("/delete-media", getmediaAlertsCtrl);
mediaRoutes.get("/download-media", getmediaAlertsCtrl);
mediaRoutes.put("/stared-media", getmediaAlertsCtrl);
