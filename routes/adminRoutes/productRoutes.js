import express from "express"
import { upload } from "../../middlewares/multer/index.js"
import { addProductCtrl, deleteProductCtrl, exportProductCtrl, getAllProductsCtrl, importProductCtrl, updateProductCtrl } from "../../controllers/adminCtrl/productCtrl/productCtrl.js"
import { unAuthMiddleware } from "../../middlewares/authMiddleware/authMiddleware.js";

export const productRoutes = express.Router()

productRoutes.post("/add-product", upload.array('product_imgs', 20), addProductCtrl);
productRoutes.get("/get-all-product", unAuthMiddleware,getAllProductsCtrl);
productRoutes.put("/update-product", upload.array('product_imgs', 20), updateProductCtrl);
productRoutes.delete("/delete-product/:id", deleteProductCtrl); 
productRoutes.post("/import-products", importProductCtrl); 
productRoutes.get("/export-product", exportProductCtrl); 