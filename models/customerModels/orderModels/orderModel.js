import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true
  },
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
    enum: ["pending", "confirmed", "processing", "paid", "shipped", "delivered", "cancelled", "refunded", "onTheWay"],
    default: "pending"
  },
  payment_method: {
    type: String,
    enum: ['COD', 'BANK', "JAZZCASH"],
    required: true
  },
  shipping_method: {
    type: String,
    enum: ['standard', 'express',],
    required: true
  },
  payment_status: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
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
