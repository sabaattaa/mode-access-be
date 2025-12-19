
import mongoose from "mongoose";

const guestModal = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    guest_id: {
        type: String,
        default: null
    },
     
}, { timestamps: true });
 
guestModal.index({ user_id: 1,   });
guestModal.index({ guest_id: 1, });

const Guest = mongoose.model("Guest", guestModal);
export default Guest;