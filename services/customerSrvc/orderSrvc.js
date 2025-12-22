
import Order from "../../models/customerModels/orderModels/orderModel.js";
import OrderItem from "../../models/customerModels/orderModels/orderItemModel.js";
import { api_response } from "../../utils/response.js";
import mongoose from "mongoose";


//  Add to Order Service
export const addOrderSrvc = async (data) => {
    try {
        const {
            user_id,
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
export const getOrdersSrvc = async (filter) => {
    try {
        const Orders = await Order.find(filter).sort({ createdAt: -1 });
        console.log("sssssslk;lk;", Orders)

        if (!Orders || Orders.length === 0) {
            return api_response("FAIL", "No orders found", null);
        }

        // Map each order with its items
        const ordersWithItems = await Promise.all(
            Orders.map(async (order) => {
                const items = await OrderItem.find({ order_id: order._id })
                    .populate("product_id", "name price product_imgs description");
                console.log("itemsssss", items)
                return {
                    id: order._id,
                    order_no: order.order_no,
                    user_id: order.user_id,
                    total_price: order.total_price,
                    payment_method: order.payment_method,
                    shipping_address: order.shipping_address,
                    coupon_code: order.coupon_code,
                    status: order.status,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt,
                    order_items: items.map((item) => ({
                        product_id: item.product_id,
                        // name: item.product_id.name,
                        price: item.price,
                        quantity: item.quantity,
                        // product_imgs: item.product_id.product_imgs,
                        // description: item.product_id.description,
                    })),
                };
            })
        );

        // Summary calculation
        const OrderSummary = {
            total_orders: Orders.length,
            total_quantity: ordersWithItems.reduce((sum, order) => {
                return sum + order.order_items.reduce((s, i) => s + i.quantity, 0);
            }, 0),
            subtotal: ordersWithItems.reduce((sum, order) => sum + order.total_price, 0),
        };

        return api_response("SUCCESS", "Orders fetched successfully", {
            orders: ordersWithItems,
            summary: OrderSummary,
        });

    } catch (error) {
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
        if ( mongoose.Types.ObjectId.isValid(user_id)) {
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
