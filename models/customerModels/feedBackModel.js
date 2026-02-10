import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Usually feedback is only for logged-in users
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // Assuming you have an Order model
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Rating must be at least 1
        max: 5  // Rating must be at most 5
    },
    message: {
        type: String,
        trim: true,
        required: false // Optional comment
    }
}, { timestamps: true });

// Prevent duplicate reviews: One user, one product, one order
feedBackSchema.index({ user_id: 1, product_id: 1, order_id: 1 }, { unique: true });

const Feedback = mongoose.model("Feedback", feedBackSchema); // Use Capital F for Model
export default Feedback;