import mongoose from "mongoose";
import Feedback from "../../models/customerModels/feedBackModel.js"; 
import { api_response } from "../../utils/response.js";

export const addfeedBackSrvc = async (data) => {
    try {
        const { userId, orderId, userReviews } = data;

        // 1. Basic Validation
        if (!userId || !orderId || !userReviews || userReviews.length === 0) {
            return api_response("FAIL", "Missing required fields (userId, orderId, or reviews)", null);
        }

        const savedReviews = [];
        const errors = [];

        // 2. Process each review in the array (The 'Cart' to 'Feedback' transformation)
        for (const item of userReviews) {
            // Frontend sent 'product_id', but we must verify it
            if (!item.product_id) {
                errors.push({ item: "Missing Product ID" });
                continue;
            }

            // Check for undefined rating (Fixing your frontend console error)
            if (item.rating === undefined || item.rating === null || item.rating < 1 || item.rating > 5) {
                errors.push({ product: item.product_id, reason: "Invalid Rating (Must be 1-5)" });
                continue; // Skip this item or throw error
            }

            // Logic: Check if review already exists (Upsert)
            const filter = {
                user_id: userId,
                order_id: orderId,
                product_id: item.product_id
            };

            const update = {
                rating: item.rating,
                message: item.message || "" // Handle empty messages safely
            };

            const options = { new: true, upsert: true, setDefaultsOnInsert: true };

            // Save to DB
            const review = await Feedback.findOneAndUpdate(filter, update, options);
            savedReviews.push(review);
        }

        if (savedReviews.length === 0) {
            return api_response("FAIL", "No valid reviews were saved. Check input.", { errors });
        }

        return api_response("SUCCESS", "Feedback submitted successfully", savedReviews);

    } catch (error) {
        console.error("Add feedBack Service Error:", error);
        
        // Handle Duplicate Key Error (if unique index is hit)
        if (error.code === 11000) {
            return api_response("FAIL", "You have already reviewed this product for this order.", null);
        }

        return api_response("FAIL", error.message || "Service failed", null);
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



