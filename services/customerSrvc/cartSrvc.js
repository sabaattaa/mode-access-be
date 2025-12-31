// services/customerSrvc/cartSrvc.js
import Cart from "../../models/customerModels/cartModel.js";
import Product from "../../models/adminModel/productModel.js";
import { api_response } from "../../utils/response.js";
import mongoose from "mongoose";

//  Add to Cart Service
export const addCartSrvc = async (data) => {
    try {
        const {
            user_id,
            guest_id,
            product_id,
            price,
            quantity = 1,
        } = data;



        //   Build query (user OR guest)
        const query = { product_id };
        if (user_id) query.user_id = user_id;
        else if (guest_id) query.guest_id = guest_id;
        else {
            return api_response("FAIL", "User or guest required", null);
        }

        //  Check existing cart item
        let cartItem = await Cart.findOne(query);

        if (cartItem) {
            // Ensure quantity is valid number
            const qtyToAdd = Number(quantity) || 1;
            const price = Number(cartItem.price);

            if (isNaN(price)) {
                return api_response("FAIL", "Invalid product price in cart", null);
            }

            // Update quantity and total price
            cartItem.quantity += qtyToAdd;
            cartItem.total_price = cartItem.quantity * price;

            await cartItem.save();

            // Populate product details for response
            const populatedCart = await Cart.findById(cartItem._id)
                .populate("product_id", "name price product_imgs");

            return api_response("SUCCESS", "Cart updated successfully", populatedCart);
        }


        //   Create new cart item
        const newCart = await Cart.create({
            product_id,
            quantity:Number(quantity),
            price: Number(price),
            total_price:Number(price) * Number(quantity),
            is_active: true,
            ...(user_id && { user_id: user_id }),
            ...(guest_id && { guest_id }),
        });
        const populatedCart = await Cart.findById(newCart._id)
            .populate("product_id", "name price product_imgs");

        return api_response("SUCCESS", "Product added to cart", populatedCart);

    } catch (error) {
        console.error("Add Cart Error:", error);
        return api_response(
            "FAIL",
            error.message || "Add to cart failed",
            null
        );
    }
};

// Get All Carts Service
export const getCartsSrvc = async (guest_id,user_id) => {
    try {
        let filter = {};
        if (mongoose.Types.ObjectId.isValid(user_id)) {
            filter = { user_id};
        } else {
            filter = { guest_id };
        }


        const carts = await Cart.find(filter)
            .populate("product_id", "name price product_imgs description stock_quantity")
            .sort({ createdAt: -1 });

        // Calculate cart summary
        const cartSummary = {
            total_items: carts.length,
            total_quantity: carts.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: carts.reduce((sum, item) => sum + item.total_price, 0)
        };

        return api_response("SUCCESS", "Cart fetched successfully", {
            cart: carts,
            summary: cartSummary
        });

    } catch (error) {
        return api_response("FAIL", error.message || "Cart fetch failed", null, error);
    }
};



// update Cart Service (Soft delete all)
export const updateCartSrvc = async (cartId, quantity = 1, userId) => {
    try {

        let filter = { _id: cartId };

        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            filter.user_id = userId;
        } else if (userId) {
            filter.guest_id = userId; // uuid/string
        }

        const cart = await Cart.findOne(filter);

        if (!cart) {
            return api_response("FAIL", "Cart item not found or unauthorized", null);
        }

        if (quantity < 1) {
            return api_response("FAIL", "Quantity must be at least 1", null);
        }

        cart.quantity = quantity;
        cart.total_price = cart.price * quantity;

        await cart.save();

        const populatedCart = await Cart.findById(cart._id).populate(
            "product_id",
            "name price product_imgs"
        );

        return api_response("SUCCESS", "Cart updated successfully", populatedCart);

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Update cart failed",
            null,
            error
        );
    }
};
// Delete Cart Service (Soft delete) 
export const deleteCartSrvc = async (cartId, userId) => {
    try {

        const filter = { _id: cartId };

        // user vs guest handling (clean)
        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            filter.user_id = userId;
        } else if (userId) {
            filter.guest_id = userId;
        }

        const cart = await Cart.findOne(filter);

        if (!cart) {
            return api_response(
                "FAIL",
                "Cart item not found or unauthorized",
                null
            );
        }

        // hard delete (agar soft chahiye to neeche note dekho)
        await cart.deleteOne();

        return api_response(
            "SUCCESS",
            "Cart item removed successfully",
            null
        );

    } catch (error) {
        return api_response(
            "FAIL",
            "Delete cart failed",
            null,
            error.message
        );
    }
};
