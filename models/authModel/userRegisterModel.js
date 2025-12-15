
import mongoose from "mongoose";


const userRegisterModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        trim: true
    },
    termsCondition: {
        type: Boolean,
        required: [true, "Terms and condition must be true"]
    }
});

export default mongoose.model("UserRegister", userRegisterModel);




