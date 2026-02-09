// services/customerSrvc/feedBackSrvc.js
import feedBack from "../../models/customerModels/feedBackModel.js";
import Product from "../../models/adminModel/productModel.js";
import { api_response } from "../utils/response.js";
import mongoose from "mongoose";
import wishListModel from "../models/customerModels/wishListModel.js";

//  Add to feedBack Service
export const addfeedBackSrvc = async (data) => {
    try {
        const {
            userId,
            product_id,
            price,
            quantity = 1,
        } = data;



        //   Build query (user OR guest)
        const query = { product_id };
        if (userId) query.user_id = userId;

        else {
            return api_response("FAIL", "User required", null);
        }

        //  Check existing feedBack item
        let feedBackItem = await feedBack.findOne(query);

        if (feedBackItem) {
            // Ensure quantity is valid number
            const qtyToAdd = Number(quantity) || 1;
            const price = Number(feedBackItem.price);

            if (isNaN(price)) {
                return api_response("FAIL", "Invalid product price in feedBack", null);
            }

            // Update quantity and total price
            feedBackItem.quantity += qtyToAdd;
            feedBackItem.total_price = feedBackItem.quantity * price;

            await feedBackItem.save();

            // Populate product details for response
            const populatedfeedBack = await feedBack.findById(feedBackItem._id)
                .populate("product_id", "name price product_imgs");

            return api_response("SUCCESS", "feedBack updated successfully", populatedfeedBack);
        }


        //   Create new feedBack item
        const newfeedBack = await feedBack.create({
            product_id,
            quantity: Number(quantity),
            price: Number(price),
            total_price: Number(price) * Number(quantity),
            is_active: true,
            ...(userId && { user_id: userId }),
        });
        const populatedfeedBack = await feedBack.findById(newfeedBack._id)
            .populate("product_id", "name price product_imgs");

        return api_response("SUCCESS", "Product added to feedBack", populatedfeedBack);

    } catch (error) {
        console.error("Add feedBack Error:", error);
        return api_response(
            "FAIL",
            error.message || "Add to feedBack failed",
            null
        );
    }
};

// Get All feedBacks Service
export const getfeedBacksSrvc = async (user_id) => {
    try {
        let filter = {};
        if (mongoose.Types.ObjectId.isValid(user_id)) {
            filter = { user_id };
        } else {
            filter = { guest_id };
        }

        const feedBacks = await feedBack.find(filter)
            .populate("product_id", "name price product_imgs description stock_quantity")
            .sort({ createdAt: -1 });

        // Calculate feedBack summary
        const feedBackSummary = {
            total_items: feedBacks.length,
            total_quantity: feedBacks.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: feedBacks.reduce((sum, item) => sum + item.total_price, 0)
        };

        return api_response("SUCCESS", "feedBack fetched successfully", {
            feedBack: feedBacks,
            summary: feedBackSummary
        });

    } catch (error) {
        return api_response("FAIL", error.message || "feedBack fetch failed", null, error);
    }
};



// update feedBack Service (Soft delete all)
export const updatefeedBackSrvc = async (feedBackId, quantity = 1, userId) => {
    try {

        let filter = { _id: feedBackId };

        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            filter.user_id = userId;
        } else if (userId) {
            filter.guest_id = userId; // uuid/string
        }

        const feedBack = await feedBack.findOne(filter);

        if (!feedBack) {
            return api_response("FAIL", "feedBack item not found or unauthorized", null);
        }

        if (quantity < 1) {
            return api_response("FAIL", "Quantity must be at least 1", null);
        }

        feedBack.quantity = quantity;
        feedBack.total_price = feedBack.price * quantity;

        await feedBack.save();

        const populatedfeedBack = await feedBack.findById(feedBack._id).populate(
            "product_id",
            "name price product_imgs"
        );

        return api_response("SUCCESS", "feedBack updated successfully", populatedfeedBack);

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Update feedBack failed",
            null,
            error
        );
    }
};
// Delete feedBack Service (Soft delete) 
export const deletefeedBackSrvc = async (feedBackId, userId) => {
    try {

        const filter = { _id: feedBackId };

        // user vs guest handling (clean)
        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            filter.user_id = userId;
        } else if (userId) {
            filter.guest_id = userId;
        }

        const feedBack = await feedBack.findOne(filter);

        if (!feedBack) {
            return api_response(
                "FAIL",
                "feedBack item not found or unauthorized",
                null
            );
        }

        // hard delete (agar soft chahiye to neeche note dekho)
        await feedBack.deleteOne();

        return api_response(
            "SUCCESS",
            "feedBack item removed successfully",
            null
        );

    } catch (error) {
        return api_response(
            "FAIL",
            "Delete feedBack failed",
            null,
            error.message
        );
    }
};


export const addWishlistSrvc = async (productId, userId) => {

    try {

        const wishlist = await wishListModel.create({ user_id: userId, product_id: productId })


        return api_response(
            "SUCCESS",
            "Product added in wish list  successfully",
            wishlist
        );

    } catch (error) {
        return api_response(
            "FAIL",
            "Product added in wish list failed",
            null,
            error.message
        );
    }





}
export const getWishlistSrvc = async (userId) => {
    try {

        const wishlist = await wishListModel
            .find({ user_id: userId })
            .populate("product_id", "name price product_imgs category")
            .lean();

        const finalWishlist = wishlist.map(item => ({
            ...item.product_id,
            isWishlisted: true
        }));

        return api_response(
            "SUCCESS",
            "Wishlist fetched successfully",
            finalWishlist
        );

    } catch (error) {
        return api_response(
            "FAIL",
            "Wishlist fetch failed",
            null,
            error.message
        );
    }
};


export const deleteWishlistSrvc = async (productId, userId) => {
    try {



        const wishlist = await wishListModel.findOne({ product_id: productId });

        if (!wishlist) {
            return api_response(
                "FAIL",
                "wishlist item not found or unauthorized",
                null
            );
        }

        await wishlist.deleteOne();

        return api_response(
            "SUCCESS",
            "Wishlist item removed successfully",
            null
        );

    } catch (error) {
        return api_response(
            "FAIL",
            "Delete wishlist failed",
            null,
            error.message
        );
    }
};