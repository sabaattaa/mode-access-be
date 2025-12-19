// services/customerSrvc/OrderSrvc.js
// import Order from "../../models/customerModels/OrderModel.js";
import Product from "../../models/adminModel/productModel.js";
import Order from "../../models/customerModels/orderModels/orderModel.js";
import { api_response } from "../../utils/response.js";
import mongoose from "mongoose";
 
//  Add to Order Service
export const addOrderSrvc = async (data) => {
    try {
        const { user_id, total_price, payment_method, shipping_address, order_items  } = data;


        // const productExist = await Product.findById(product_id);
        // if (!productExist) {
        //     return api_response("FAIL", "Product not found", null);
        // }

        // let query = { product_id };
        // if (user) {
        //     query.user = user;
        // } else if (guest_id) {
        //     query.guest_id = guest_id;
        // }

        // const existingOrderItem = await orderModel.findOne(query);

        // if (existingOrderItem) {
        //     existingOrderItem.quantity += quantity;
        //     existingOrderItem.total_price = existingOrderItem.quantity * existingOrderItem.price;
        //     await existingOrderItem.save();

        //     const populatedOrder = await Order.findById(existingOrderItem._id)
        //         .populate("product_id", "name price product_imgs");

        //     return api_response("SUCCESS", "Order updated successfully", populatedOrder);
        // }

        // const OrderData = {
        //     product_id,
        //     quantity,
        //     price,
        //     total_price: total_price || price * quantity,
        //     is_active
        // };

        // if (user) {
        //     OrderData.user = user;
        // } else if (guest_id) {
        //     OrderData.guest_id = guest_id;
        // }

        // const newOrder = await Order.create(OrderData);

        // const populatedOrder = await Order.findById(newOrder._id)
        //     .populate("product_id", "name price product_imgs");

        // return api_response("SUCCESS", "Product added to Order", populatedOrder);
        return api_response("SUCCESS", "Product added to Order", );

    } catch (error) {
        return api_response("FAIL", error.message || "Add to Order failed", null, error);
    }
};

// Get All Orders Service
export const getOrdersSrvc = async (id) => {
    try {
        let filter = {};
        if (mongoose.Types.ObjectId.isValid(id)) {
            filter = { user_id: id };
        } else {
            filter = { guest_id: id };
        }


        const Orders = await Order.find(filter)
            .populate("product_id", "name price product_imgs description")
            .sort({ createdAt: -1 });

        // Calculate Order summary
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

    console.log("ssssss", req.user)
    const filter = { _id: OrderId };

    // user vs guest handling (clean)
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      filter.user_id = userId;
    } else if (userId) {
      filter.guest_id = userId;
    }

    const Order = await Order.findOne(filter);

    if (!Order) {
      return api_response(
        "FAIL",
        "Order item not found or unauthorized",
        null
      );
    }

    // hard delete (agar soft chahiye to neeche note dekho)
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
