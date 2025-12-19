// services/customerSrvc/cartSrvc.js
import Cart from "../../models/customerModels/cartModel.js";
import Product from "../../models/adminModel/productModel.js";
import { api_response } from "../../utils/response.js";
import mongoose from "mongoose";
 
//  Add to Cart Service
export const addCartSrvc = async (data) => {
    try {
        const { user, guest_id, product_id, quantity, price, total_price, is_active } = data;


        const productExist = await Product.findById(product_id);
        if (!productExist) {
            return api_response("FAIL", "Product not found", null);
        }

        let query = { product_id };
        if (user) {
            query.user = user;
        } else if (guest_id) {
            query.guest_id = guest_id;
        }

        const existingCartItem = await Cart.findOne(query);

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            existingCartItem.total_price = existingCartItem.quantity * existingCartItem.price;
            await existingCartItem.save();

            const populatedCart = await Cart.findById(existingCartItem._id)
                .populate("product_id", "name price product_imgs");

            return api_response("SUCCESS", "Cart updated successfully", populatedCart);
        }

        const cartData = {
            product_id,
            quantity,
            price,
            total_price: total_price || price * quantity,
            is_active
        };

        if (user) {
            cartData.user = user;
        } else if (guest_id) {
            cartData.guest_id = guest_id;
        }

        const newCart = await Cart.create(cartData);

        const populatedCart = await Cart.findById(newCart._id)
            .populate("product_id", "name price product_imgs");

        return api_response("SUCCESS", "Product added to cart", populatedCart);

    } catch (error) {
        return api_response("FAIL", error.message || "Add to cart failed", null, error);
    }
};

// Get All Carts Service
export const getCartsSrvc = async (id) => {
    try {
        let filter = {};
        if (mongoose.Types.ObjectId.isValid(id)) {
            filter = { user_id: id };
        } else {
            filter = { guest_id: id };
        }


        const carts = await Cart.find(filter)
            .populate("product_id", "name price product_imgs description")
            .sort({ createdAt: -1 });

        // Calculate cart summary
        const cartSummary = {
            total_items: carts.length,
            total_quantity: carts.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: carts.reduce((sum, item) => sum + item.total_price, 0)
        };

        return api_response("SUCCESS", "Cart fetched successfully", {
            items: carts,
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
