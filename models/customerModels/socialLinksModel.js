import mongoose from "mongoose";

const socialLinksModal = new mongoose.Schema({
  phone_no: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: null
  },
  instagram: {
    type: String,
    default: null
  },
  tiktok: {
    type: String,
    default: null
  },
  whatsapp: {
    type: String,
    default: null
  },
  youtube: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default mongoose.model("socilaLinks", socialLinksModal);
