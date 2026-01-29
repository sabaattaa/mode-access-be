import mongoose from "mongoose";


export const addressSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    isDefault: {
        type: Boolean,
        required: false
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        min: 5
    },

    addressType: {
        type: String,

    }
},
    { timestamps: true });



addressSchema.pre("save", async function () {

    if (!this.isModified("isDefault") || this.isDefault === false) {
        return ;
    }

    try {

        await this.model("Address").updateMany({
            user_id: this.user_id,
            _id: { $ne: this._id }
        }, { isDefault: false });

    } catch (e) {
        console.log("error in adrees modal", e);
        next(e)
    }



})

const Address = mongoose.model("Address", addressSchema);

export default Address;


