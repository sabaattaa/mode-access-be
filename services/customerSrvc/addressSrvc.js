import userModel from "../../models/authModel/userModel.js";
import Address from "../../models/customerModels/addressModel.js"
import { api_response } from "../../utils/response.js";

export const addAddressSrvc = async (userId, data) => {
    try {
        if (!userId) {
            return api_response("FAIL", "Authentication required", null);
        }

        const allowedFields = [
            "isDefault",
            "address",
            "city",
            "city",
            "postalCode",
            "addressType",

        ];

        const payload = {
            user_id: userId,
        };

        allowedFields.forEach((field) => {
            if (data[field] !== undefined) {
                payload[field] = data[field];
            }
        });


        const newAddress = await Address.create(payload);
 const allUserAddresses = await Address.find({ user_id: userId });
         
        return api_response("SUCCESS", "Address added successfully", allUserAddresses);

    } catch (error) {
        if (error.name === "ValidationError") {
            return api_response("FAIL", "Validation Error: " + error.message, null);
        }

        console.error("Add Address Service Error:", error);
        return api_response("FAIL", "Internal Server Error", null);
    }
};


// Get All Carts Service
export const getAddressSrvc = async (user_id) => {
    try { 
        const address = await Address.find({ user_id }).sort({ createdAt: -1 });
        return api_response("SUCCESS", "Address fetched successfully", {
            address: address,
        });

    } catch (error) {
        console.error("Get Address Service Error:", error);
        return api_response("FAIL", error.message || "Address fetch failed", null, error);
    }
};



export const updateAddressSrvc = async (userId, addressId, updateData) => {
    try {

        const filter = {
            _id: addressId,
            user_id: userId
        };

        const updatedAddress = await Address.findOneAndUpdate(
            filter,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedAddress) {
            return api_response("FAIL", "Address not found or unauthorized", null);
        }

        return api_response("SUCCESS", "Address updated successfully", updatedAddress);

    } catch (error) {
        console.error("Update Address Service Error:", error);
        return api_response(
            "FAIL",
            error.message || "Update address failed",
            null,
            error
        );
    }
};


export const deleteAddressSrvc = async (addressId, userId) => {
    try {

        const filter = {
            _id: addressId,
            user_id: userId
        };

        const deletedAddress = await Address.findOneAndDelete(filter);

        if (!deletedAddress) {
            return api_response(
                "FAIL",
                "Address not found or unauthorized",
                null
            );
        }

        return api_response(
            "SUCCESS",
            "Address deleted successfully",
            null
        );

    } catch (error) {
        console.error("Delete Address Error:", error);
        return api_response(
            "FAIL",
            "Delete address failed",
            null,
            error.message
        );
    }
};
