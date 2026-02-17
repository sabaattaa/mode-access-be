import mongoose from "mongoose";

const productModal = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      // minlength: [3, "Name must be at least 3 characters"],
    },

    sku: {
      type: String,
      required: [true, "Product SKU is required"],
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      // minlength: [10, "Description must be at least 10 characters"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },


    featured: {
      type: Boolean,
      default: false,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be greater than 0"],
    },

    original_price: {
      type: Number,
      required: [true, "Original price is required"],
      min: [0, "Original price must be greater than 0"],
    },

    stock_quantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
    },
    product_thumbnail: {
      type: String,
      required: [true, "Product thumbnil is required"],
      trim: true,
      unique: true,
    },
    product_imgs: [
      {
        type: String,
        required: true,
      },

    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productModal);
