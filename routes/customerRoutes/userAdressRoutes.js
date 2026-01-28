import express from "express";

import { authMiddleware } from "../../middlewares/authMiddleware/authMiddleware.js"
import { addAddressCtrl, deleteAddressCtrl, getAllAddressCtrl, updateAddressCtrl } from "../../controllers/customerCtrl/userAddressCtrl.js";
import { addressValidationSchema } from "../../validationSchemas/addressValidation.js";
import { validate } from "../../middlewares/validations/valdiationMiddleware.js";

export const userAddressRoutes = express.Router();



userAddressRoutes.post("/add-address", authMiddleware, validate(addressValidationSchema), addAddressCtrl);
userAddressRoutes.get("/get-all-address", authMiddleware, getAllAddressCtrl);
userAddressRoutes.put("/update-address/:id", authMiddleware, updateAddressCtrl);
userAddressRoutes.delete("/delete-address/:id", authMiddleware, deleteAddressCtrl);

