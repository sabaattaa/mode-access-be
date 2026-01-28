
import { findProduct } from "../../services/adminSrvc/productSrvc.js";
import {
    addOrderSrvc,
    getOrdersSrvc,
    deleteOrderSrvc,
    updateOrderSrvc
} from "../../services/customerSrvc/orderSrvc.js";


// import { findProduct } from "../../../services/adminSrvc/productSrvc.js";
import { api_response } from "../../utils/response.js";


// Add to Order
export const addOrderCtrl = async (req, res) => {
    try {


        const {userId} = req.user;
        const response = await addOrderSrvc(userId, req.body);

        return res
            .status(response.status === "SUCCESS" ? 200 : 400)
            .json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
};


// Get All Orders
export const getAllUserOrdersCtrl = async (req, res) => {
    try {

        const order_id = req.params?.id || null
        const {userId} = req.user;

        const filter = {
            userId
        };
        if (order_id) filter._id = order_id; 
        const response = await getOrdersSrvc(filter);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
};


// Get All Orders
export const getAllOrdersCtrl = async (req, res) => {
    try {

        const { search, status, time, customOrder } = req.query
   const filter = {};
        if (status) {
            filter.status = status;
        }

        if (search) {
            filter.$or = [
                { order_no: { $regex: search, $options: "i" } },
                { shipping_address: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { guest_id: { $regex: search, $options: "i" } },
            ];
        }

        if (time && time !== "all") {
            const now = new Date();
            let startDate;

            if (time === "today") {
                startDate = new Date(now.setHours(0, 0, 0, 0));
            }

            if (time === "week") {
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
            }

            if (time === "month") {
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 1);
            }

            filter.createdAt = { $gte: startDate };
        }

        let sort = { createdAt: -1 };

        if (customOrder === "oldest") {
            sort = { createdAt: 1 };
        }

        if (customOrder === "highest") {
            sort = { total_price: -1 };
        }

        if (customOrder === "lowest") {
            sort = { total_price: 1 };
        }
         const response = await getOrdersSrvc(filter, sort);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
};


// Delete Order Item
export const deleteOrderCtrl = async (req, res) => {
    try {

        const { id } = req.params;
        const {userId} = req.user
        if (!id || !userId) {
            return res.status(500).json(
                api_response("FAIL", "Order id nad User id is required", null, error.message)
            );
        }

        const response = await deleteOrderSrvc(id, userId);
        return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Delete failed", null, error.message)
        );
    }
};




// Update Order Items
export const updateOrderCtrl = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json(api_response("FAIL", "Order ID is required.", null));
        }

        const response = await updateOrderSrvc(id, status);

        return res
            .status(response.status === "SUCCESS" ? 200 : 400)
            .json(response);

    } catch (error) {
        return res
            .status(500)
            .json(api_response("FAIL", "Update Order failed", null, error.message));
    }
};
