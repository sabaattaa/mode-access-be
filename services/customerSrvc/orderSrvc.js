
import Order from "../../models/customerModels/orderModels/orderModel.js";
import OrderItem from "../../models/customerModels/orderModels/orderItemModel.js";
import { api_response } from "../../utils/response.js";
import mongoose from "mongoose";
import { findProduct } from "../adminSrvc/productSrvc.js";
import Cart from "../../models/customerModels/cartModel.js";
import Feedback from "../../models/customerModels/feedBackModel.js";


//  Add to Order Service
export const addOrderSrvc = async (user_id, data) => {
    try {

        const { phone, coupon_code, shipping_method, payment_method, shipping_address, order_items, } = data;

        let total_price = 200;


        for (const item of order_items) {
            const product = await findProduct(item.product_id);
            const price = item.quantity * product.price;
            total_price += price;
        }

        const order_no = `ORD-${Date.now()}`;
        const payment_status = `pending`;

        const order = await Order.create({
            user_id,
            order_no,
            phone,
            user_id: user_id || null,
            total_price,
            coupon_code,
            payment_method,
            shipping_method,
            shipping_address,
            payment_status
        });


        const orderItemsPayload = order_items.map(item => ({
            order_id: order._id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            total_price: item.price * item.quantity,
        }));


        await OrderItem.insertMany(orderItemsPayload);


        await Cart.deleteMany({ user_id: user_id });

        return api_response("SUCCESS", "Order placed successfully", {
            order,
            order_items: orderItemsPayload
        });

    } catch (error) {
        return api_response("FAIL", error.message || "Order failed", null, error);
    }
};


export const getOrdersSrvc = async (filter = {}, sort = { createdAt: -1 }) => {
    try {
        // 1. Fetch Orders
        const Orders = await Order.find(filter)
            .sort(sort)
            .populate("user_id"); 

        if (!Orders?.length) {
            return api_response("FAIL", "No orders found", null);
        }

        const orderIds = Orders.map(o => o._id);
        const userId = filter.user_id; // Extract user ID from filter for security

        // 2. Fetch Feedback Status (Optimized)
        // We only need to know WHICH orders have feedback, not the details.
        // We check for this specific user AND these specific order IDs.
        const feedbackedOrderIds = await Feedback.distinct("order_id", {
            user_id: userId,
            order_id: { $in: orderIds }
        });


        console.log(
            "feedbackedOrderIds",feedbackedOrderIds
        )

        // Convert to a Set for O(1) (Instant) lookup time
        const feedbackSet = new Set(feedbackedOrderIds.map(String));
  console.log(
            "feedbackedOrderIds22",feedbackSet
        )

        // 3. Fetch Order Items
        const items = await OrderItem.find({ order_id: { $in: orderIds } })
            .populate({
                path: "product_id",
                select: "category name sku slug price product_imgs description stock_quantity status featured",
                populate: { path: "category", select: "name" }
            });

        // Group items by order
        const itemsByOrder = {};
        items.forEach(item => {
            const key = item.order_id.toString();
            if (!itemsByOrder[key]) itemsByOrder[key] = [];
            itemsByOrder[key].push(item);
        });

        // 4. Build Final Response
        const ordersWithItems = Orders.map(order => {
            const orderItems = itemsByOrder[order._id.toString()] || [];
            
            // 🔥 LOGIC: Check if this Order ID exists in our Feedback Set
            const isFeedbackGiven = feedbackSet.has(order._id.toString());

            return {
                id: order._id,
                order_no: order.order_no,
                user_id: order.user_id,
                guest_id: order.guest_id,
                total_price: order.total_price,
                payment_method: order.payment_method,
                shipping_address: order.shipping_address,
                coupon_code: order.coupon_code,
                status: order.status,
                phone: order.phone,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                payment_status: order.payment_status,
                // ⭐ Add the flag here
                is_feedback_submitted: isFeedbackGiven,
                order_items: orderItems.map(item => ({
                    product_id: item.product_id,
                    price: item.price,
                    quantity: item.quantity
                }))
            };
        });

        const summary = {
            total_orders: Orders.length,
            pending_orders: Orders.filter(o => o.status === "pending").length,
            processing_orders: Orders.filter(o => o.status === "processing").length,
            shipped_orders: Orders.filter(o => o.status === "shipped").length,
            delivered_orders: Orders.filter(o => o.status === "delivered").length,
            subtotal: ordersWithItems.reduce((sum, o) => sum + Number(o.total_price), 0)
        };


        return api_response("SUCCESS", "Orders fetched successfully", {
            orders: ordersWithItems,
            summary
        });

    } catch (error) {
        console.error("Order Service Error:", error); // Good practice: log the full error
        return api_response("FAIL", error.message || "Order fetch failed", null, error);
    }
};


// update Order Service (Soft delete all)
export const updateOrderSrvc = async (id, status) => {
    try {
        const order = await Order.findOne({ _id: id, });
        if (!order) {
            return api_response("FAIL", "Order item not found or unauthorized", null);
        }
        order.status = status;
        await order.save();
        const populatedOrder = await Order.findById(order._id);
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
export const deleteOrderSrvc = async (orderId, user_id) => {
    try {
        const filter = { _id: orderId, };
        if (mongoose.Types.ObjectId.isValid(user_id)) {
            filter.user_id = user_id;
        }
        const order = await Order.findOne(filter);
        if (!order) {
            return api_response(
                "FAIL",
                "Order item not found or unauthorized",
                null
            );
        }
        await Order.deleteOne();
        return api_response(
            "SUCCESS",
            "Order item Delete successfully",
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
