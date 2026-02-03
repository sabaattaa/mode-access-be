import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }
}, { timestamps: true });

 
// wishlistSchema.pre("save", function (next) {
//   if ((!this.user_id && !this.guest_id) || (this.user_id && this.guest_id)) {
//     return next(new Error("Either user_id or guest_id is required (not both)"));
//   }
//   next();
// });

 
wishlistSchema.index(
  { product_id: 1, user_id: 1, guest_id: 1 },
  { unique: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
