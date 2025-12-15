import express from "express"
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoryCtrl,  updateCategoryCtrl ,categoryCounts, exportCategory} from "../controllers/categoryCtrl/categoryCtrl.js"
import { upload } from "../middlewares/multer/index.js"
 
export const categoryRoutes = express.Router()

categoryRoutes.post("/add-category", upload.single('category_img'), createCategoryCtrl)
categoryRoutes.get("/get-all-category", getAllCategoryCtrl)
categoryRoutes.put("/update-category", updateCategoryCtrl)
categoryRoutes.delete("/delete-category", deleteCategoryCtrl) 
categoryRoutes.get("/category-counts", categoryCounts) 
categoryRoutes.get("/export-category", exportCategory) 