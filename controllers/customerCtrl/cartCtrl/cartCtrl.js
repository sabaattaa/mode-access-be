// controllers/customerController/cartController.js
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import {
    addCartSrvc,
    getCartsSrvc,
    deleteCartSrvc,
    updateCartSrvc
} from "../../../services/customerSrvc/cartSrvc.js";
import { api_response } from "../../../utils/response.js";
import { findProduct } from "../../../services/adminSrvc/productSrvc.js";

// Generate Guest ID
export const generateGuest = async (req, res) => {
    try {
        const guestId = `guest_${uuidv4()}`;

        const key = process.env.JWT_SECRET;

        const token = jwt.sign(
            { guest_id: guestId, type: "guest" },
            key,
        );

        return res.status(200).json(
            api_response(
                "SUCCESS",
                "Guest token generated successfully",
                { token }
            )
        );

    } catch (error) {
        return res.status(500).json(
            api_response(
                "FAIL",
                "Failed to generate guest ID",
                null,
                error.message
            )
        );
    }
};

// Add to Cart
export const addCartCtrl = async (req, res) => {
    try {
        const { product_id, quantity = 1, guest_id, user_id } = req.body;

        if (!product_id || !quantity) {
            return res.status(400).json(
                api_response("FAIL", "Product ID and quantity are required", null)
            );
        }

        const product = await findProduct(product_id);
        if (!product) {
            return res.status(400).json(
                api_response("FAIL", "Product not found", null)
            );
        }

        const { price, stock_quantity } = product;

        if (quantity > stock_quantity) {
            return res.status(400).json(
                api_response(
                    "FAIL",
                    `${quantity} product not available, stock is ${stock_quantity}`,
                    null
                )
            );
        }

        const totalPrice = quantity * price;

        const response = await addCartSrvc({
            user_id,
            guest_id,
            product_id,
            quantity,
            price,
            total_price: totalPrice,
        });

        return res
            .status(response.status === "SUCCESS" ? 200 : 400)
            .json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
};


// Get All Carts
export const getAllCartsCtrl = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json(
                api_response("FAIL", "User ID or Guest ID is required", null, null)
            );
        }


        const response = await getCartsSrvc(id);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
};

// Clear All Cart Items
export const updateCartCtrl = async (req, res) => {
    try {
        const { quantity, userId } = req.body;
        const { id } = req.params;
        if (!id) {
            return api_response("FAIL", "ID is required.", null,)
        }
        if (quantity < 1) {
            return api_response("FAIL", "Quentity must grater then 1.", null,)
        }
        const response = await updateCartSrvc(id, quantity, userId);
        return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Clear cart failed", null, error.message)
        );
    }
};

// Delete Cart Item
export const deleteCartCtrl = async (req, res) => {
    try {

        console.log("wwwwwwwwwwsdsw", req.user)
        const { id } = req.params;



        if (!id) {
            return res.status(400).json(
                api_response("FAIL", "Cart ID is required", null)
            );
        }

        const response = await deleteCartSrvc(id);
        return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Delete failed", null, error.message)
        );
    }
};

