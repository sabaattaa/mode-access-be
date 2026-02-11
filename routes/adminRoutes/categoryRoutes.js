import express from "express"
import { addCategoryCtrl, deleteCategoryCtrl, getAllCategoryCtrl, updateCategoryCtrl,  exportCategory }
 from "../../controllers/adminCtrl/categoryCtrl/categoryCtrl.js" 
import { upload } from "../../middlewares/multer/index.js"

export const categoryRoutes = express.Router();

categoryRoutes.post("/add-category", upload.single('category_img'), addCategoryCtrl);
categoryRoutes.get("/get-all-category", getAllCategoryCtrl);
categoryRoutes.put("/update-category", upload.single("category_img"), updateCategoryCtrl);
categoryRoutes.delete("/delete-category", deleteCategoryCtrl); 
categoryRoutes.get("/export-category", exportCategory); 