import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_no: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  payment_method: {
    type: String,
    enum: ["COD", "ONLINE", "JazzCash"],
    required: true
  },
  shipping_address: {
    type: String,
    required: true
  },
  coupon_code: {
    type: String,
    default: null
  },
  total_price: {
    type: String,
    required: true
  }
}, { timestamps: true });

orderSchema.index({ user_id: 1 });
orderSchema.index({ guest_id: 1 });

export default mongoose.model("Order", orderSchema);
