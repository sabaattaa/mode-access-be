
import {
    addfeedBackSrvc,
    getfeedBacksSrvc,
    deletefeedBackSrvc,
    updatefeedBackSrvc,
} from "../../services/customerSrvc/feedBackSrvc.js";
 
import { api_response } from "../../utils/response.js";


export const addfeedBackCtrl = async (req, res) => {
    try {
        const { userReviews, orderId } = req.body;
        const { userId } = req.user;

        console.log(`Incoming feedback for Order: ${orderId} from User: ${userId}`);

        // 1. Validate Request Body
        if (!orderId) {
            return res.status(400).json(api_response("FAIL", "Order ID is required", null));
        }

        if (!userReviews || !Array.isArray(userReviews) || userReviews.length === 0) {
            return res.status(400).json(api_response("FAIL", "userReviews array is required", null));
        }

        // 2. Sanitize/Pre-check data before sending to service (Good for Security)
        const cleanedReviews = userReviews.map(review => {
            // Ensure rating is a number, handle the 'undefined' case gracefully
            return {
                ...review,
                rating: Number(review.rating) 
            };
        });

        // Check specifically for invalid ratings to prevent DB error
        const invalidReview = cleanedReviews.find(r => isNaN(r.rating) || r.rating < 1 || r.rating > 5);
        if (invalidReview) {
            return res.status(400).json(api_response("FAIL", "One or more items have invalid ratings (1-5 required)", invalidReview));
        }

        const response = await addfeedBackSrvc({
            userId,
            orderId,
            userReviews: cleanedReviews,
        });

        return res
            .status(response.status === "SUCCESS" ? 200 : 400)
            .json(response);

    } catch (error) {
        console.log("Controller Error:", error);
        return res.status(500).json(
            api_response("FAIL", "Internal Server Error", null, error.message)
        );
    }
};

// Get All feedBacks
export const getAllfeedBacksCtrl = async (req, res) => {
    try {
        const { userId } = req.user;

        if (!userId) {
            return res.status(400).json(
                api_response("FAIL", "User ID or Guest ID is required", null, null)
            );
        }

        const response = await getfeedBacksSrvc(userId);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
};

// Clear All feedBack Items
export const updatefeedBackCtrl = async (req, res) => {
    try {
        const { quantity, userId } = req.body;
        const { id } = req.params;
        if (!id) {
            return api_response("FAIL", "ID is required.", null,)
        }
        if (quantity < 1) {
            return api_response("FAIL", "Quentity must grater then 1.", null,)
        }
        const response = await updatefeedBackSrvc(id, quantity, userId);
        return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Clear feedBack failed", null, error.message)
        );
    }
};

// Delete feedBack Item
export const deletefeedBackCtrl = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json(
                api_response("FAIL", "feedBack ID is required", null)
            );
        }

        const response = await deletefeedBackSrvc(id);
        return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Delete failed", null, error.message)
        );
    }
};



