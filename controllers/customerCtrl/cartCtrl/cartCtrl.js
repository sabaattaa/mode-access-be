
import {
    addCartSrvc,
    getCartsSrvc,
    deleteCartSrvc,
    updateCartSrvc,
    addWishlistSrvc,
    getWishlistSrvc,
    deleteWishlistSrvc
} from "../../../services/customerSrvc/cartSrvc.js";
import { api_response } from "../../../utils/response.js";
import { findProduct } from "../../../services/adminSrvc/productSrvc.js";
import Guest from "../../../models/customerModels/guestModel.js";
import User from "../../../models/authModel/userModel.js";
import mongoose from "mongoose";


// Add to Cart
export const addCartCtrl = async (req, res) => {
    try {
        const { product_id, } = req.body;
        const { userId, } = req.user;
        if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
            return api_response("FAIL", "Invalid product id", null);
        }

        let user = null;
        if (userId) {
            user = await User.findById({ _id: userId });

        }


        if (!user) { return api_response("FAIL", "user not found", null); }

        const product = await findProduct(product_id);
        if (!product) {
            return res.status(400).json(
                api_response("FAIL", "Product not found", null)
            );
        }

        const { price, } = product;
        const response = await addCartSrvc({
            userId,
            product_id,
            price,
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
        const { userId } = req.user;

        if (!userId) {
            return res.status(400).json(
                api_response("FAIL", "User ID or Guest ID is required", null, null)
            );
        }

        const response = await getCartsSrvc(userId);
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



export const addWishlistCtrl = async (req, res) => {

    try {     
        
        
        const { userId, } = req.user;
        
        const { id } = req.params;
        console.log(id,"rrrrr", userId)

        if (!id || !userId) {
            return res.status(400).json(
                api_response("FAIL", "ID is required or user unauthorized", null)
            );
        }
        const response = await addWishlistSrvc(id, userId);
        return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Add wishlist failed", null, error.message)
        );
    }


}
export const getWishlistCtrl = async (req, res) => {

    try {     
        
        
        const { userId, } = req.user;
          
        if (  !userId) {
            return res.status(400).json(
                api_response("FAIL", "Unaunthenticated user", null)
            );
        }
        const response = await getWishlistSrvc(userId);
        return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Add wishlist failed", null, error.message)
        );
    }


}


export const deleteWishlistCtrl = async (req, res) => {

    try {
        const { userId, } = req.user;

        const { id } = req.params;

        if (!id || !userId) {
            return res.status(400).json(
                api_response("FAIL", "ID is required or user unauthorized", null)
            );
        }
        const response = await deleteWishlistSrvc(id, userId);
        return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Add wishlist failed", null, error.message)
        );
    }


}
