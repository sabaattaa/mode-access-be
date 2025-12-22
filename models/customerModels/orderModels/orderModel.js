import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_no: {
    type: String,
    unique: true,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  payment_method: {
    type: String,
    enum: ["COD", "ONLINE"],
    required: true
  },
  shipping_address: {
    type: String,
    required: true
  },
  coupon_code: {
    type: String,
    default: null
  }
}, { timestamps: true });

orderSchema.index({ user_id: 1 });
orderSchema.index({ guest_id: 1 });

export default mongoose.model("Order", orderSchema);
