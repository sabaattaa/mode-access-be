// services/customerSrvc/OrderSrvc.js
// import Order from "../../models/customerModels/OrderModel.js";
import Product from "../../models/adminModel/productModel.js";
import Order from "../../models/customerModels/orderModels/orderModel.js";
import OrderItem from "../../models/customerModels/orderModels/orderItemModel.js";
import { api_response } from "../../utils/response.js";
import mongoose from "mongoose";

//  Add to Order Service

export const addOrderSrvc = async (data) => {
    try {
        const {
            user_id,
            guest_id,
            payment_method,
            shipping_address,
            order_items
        } = data;

        if (!order_items || !order_items.length) {
            throw new Error("Order items are required");
        }


        let total_price = 0;
        order_items.forEach(item => {
            total_price += item.quantity * item.price;
        });


        const order_no = `ORD-${Date.now()}`;


        const order = await Order.create({
            order_no,
            user_id: user_id || null,
            guest_id: guest_id || null,
            total_price,
            payment_method,
            shipping_address
        });


        const orderItemsPayload = order_items.map(item => ({
            order_id: order._id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            total_price: item.price * item.quantity,
        }));


        await OrderItem.insertMany(orderItemsPayload);

        return api_response("SUCCESS", "Order placed successfully", {
            order,
            order_items: orderItemsPayload
        });

    } catch (error) {
        return api_response("FAIL", error.message || "Order failed", null, error);
    }
};


// Get All Orders Service
export const getOrdersSrvc = async (id) => {
    try {
         const Orders = await Order.find({ user_id: id })
            .populate("product_id", "name price product_imgs description")
            .sort({ createdAt: -1 });

       
        const OrderSummary = {
            total_items: Orders.length,
            total_quantity: Orders.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: Orders.reduce((sum, item) => sum + item.total_price, 0)
        };

        return api_response("SUCCESS", "Order fetched successfully", {
            items: Orders,
            summary: OrderSummary
        });

    } catch (error) {
        return api_response("FAIL", error.message || "Order fetch failed", null, error);
    }
};



// update Order Service (Soft delete all)
export const updateOrderSrvc = async (OrderId, quantity = 1, userId) => {
    try {

        let filter = { _id: OrderId };

        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            filter.user_id = userId;
        } else if (userId) {
            filter.guest_id = userId; // uuid/string
        }

        const Order = await Order.findOne(filter);

        if (!Order) {
            return api_response("FAIL", "Order item not found or unauthorized", null);
        }

        if (quantity < 1) {
            return api_response("FAIL", "Quantity must be at least 1", null);
        }

        Order.quantity = quantity;
        Order.total_price = Order.price * quantity;

        await Order.save();

        const populatedOrder = await Order.findById(Order._id).populate(
            "product_id",
            "name price product_imgs"
        );

        return api_response("SUCCESS", "Order updated successfully", populatedOrder);

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Update Order failed",
            null,
            error
        );
    }
};
// Delete Order Service (Soft delete) 
export const deleteOrderSrvc = async (OrderId, userId) => {
    try {
 
        const filter = { _id: OrderId };

        // user vs guest handling (clean)
        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            filter.user_id = userId;
        }  

        const Order = await Order.findOne(filter);

        if (!Order) {
            return api_response(
                "FAIL",
                "Order item not found or unauthorized",
                null
            );
        }

        await Order.deleteOne();

        return api_response(
            "SUCCESS",
            "Order item removed successfully",
            null
        );

    } catch (error) {
        return api_response(
            "FAIL",
            "Delete Order failed",
            null,
            error.message
        );
    }
};
