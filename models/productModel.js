import mongoose from "mongoose";

  const productModel = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
})


export default mongoose.model("Product", productModel);