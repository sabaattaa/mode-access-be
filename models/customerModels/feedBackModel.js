import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },

    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },
    total_price: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

feedBackSchema.index({ user_id: 1, product_id: 1 });

const feedBack = mongoose.model("feedBack", feedBackSchema);
export default feedBack;

