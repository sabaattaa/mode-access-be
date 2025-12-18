
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    guest_id: {
        type: String,
        default: null
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
 
userSchema.index({ user: 1, product_id: 1 });
userSchema.index({ guest_id: 1, product_id: 1 });

const User = mongoose.model("User", userSchema);
export default User;