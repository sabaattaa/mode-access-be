import express from "express"
import { createCategoryCtrl, getCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl, } from "../controllers/categoryCtrl/categoryCtrl"

export const categoryRoutes = express.Router()

categoryRoutes.post("create-category", createCategoryCtrl)
categoryRoutes.post("get-category", getCategoryCtrl)
categoryRoutes.patch("update-category", updateCategoryCtrl)
categoryRoutes.delete("delete-category", deleteCategoryCtrl) 