import express from "express"
import { upload } from "../middlewares/multer/index.js"
import { addProductCtrl, deleteProductCtrl, exportProductCtrl, getAllProductsCtrl, importProductCtrl, updateProductCtrl } from "../controllers/productCtrl/productCtrl.js"

export const productRoutes = express.Router()

productRoutes.post("/add-product", upload.array('product_imgs', 15), addProductCtrl);
productRoutes.get("/get-all-product", getAllProductsCtrl);
productRoutes.put("/update-product", updateProductCtrl);
productRoutes.delete("/delete-product", deleteProductCtrl); 
productRoutes.post("/import-products", importProductCtrl); 
productRoutes.get("/export-product", exportProductCtrl); 