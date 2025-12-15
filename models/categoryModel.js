import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
    },
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
        trim: true,
        minlength: [3, "Slug must be at least 3 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [5, "Description must be at least 5 characters"]
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        trim: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    category_img: {
        type: String,
        required: [true, "Category image is required"]
    }
}, { timestamps: true });

export default mongoose.model("Category", categoryModel);
