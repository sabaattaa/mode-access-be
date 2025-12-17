import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  guest_id: { type: String, default: null, index: true },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Price must be greater than 0"],
    },

    total_price: {
      type: Number,
      required: true,
      min: [0, "Total price must be greater than 0"],
    },

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
