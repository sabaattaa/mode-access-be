
import Cart from "../../models/customerModels/cartModel.js";
import Product from "../../models/productModel.js";
import { api_response } from "../../utils/response.js";


export const addCartSrvc = async ({ product_id, quantity, price, total_price, is_active }) => {
    try {

        const productExist = await Product.findById(product_id);
        if (!productExist) {
            return api_response("FAIL", "Product not found", null);
        }
         
        const newCart = await Cart.create({         
            product_id, quantity, price, total_price, is_active
        });

        return api_response(
            "SUCCESS",
            "Product added to cart",
            newCart
        );

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Add to cart failed",
            null,
            error
        );
    }
};
export const getCarts = async (userId) => {
    try {
        const carts = await Cart.find({ user: userId })
            .populate("product", "name price product_imgs")
            .sort({ createdAt: -1 });

        return api_response(
            "SUCCESS",
            "Cart fetched successfully",
            carts
        );

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Cart fetch failed",
            null,
            error
        );
    }
};

export const updateCartSrvc = async (id, data) => {
    try {
        const cart = await Cart.findById(id);

        if (!cart) {
            return api_response(
                "FAIL",
                "Cart item not found",
                null
            );
        }

        if (data.quantity <= 0) {
            return api_response(
                "FAIL",
                "Quantity must be greater than 0",
                null
            );
        }

        cart.quantity = data.quantity;
        await cart.save();

        return api_response(
            "SUCCESS",
            "Cart updated successfully",
            cart
        );

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Cart update failed",
            null,
            error
        );
    }
};


export const deleteCartSrvc = async (id) => {
    try {
        const cart = await Cart.findByIdAndDelete(id);

        if (!cart) {
            return api_response(
                "FAIL",
                "Cart item not found",
                null
            );
        }

        return api_response(
            "SUCCESS",
            "Cart item removed successfully",
            cart
        );

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Cart delete failed",
            null,
            error
        );
    }
};
