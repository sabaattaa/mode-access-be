import { addAddressSrvc, deleteAddressSrvc, getAddressSrvc, updateAddressSrvc } from "../../services/customerSrvc/addressSrvc.js";
import { api_response } from "../../utils/response.js";


export const addAddressCtrl = async (req, res) => {
    try {
        const { userId } = req.user;
        const response = await addAddressSrvc(userId, req.body);
        return res
            .status(response.status === "SUCCESS" ? 200 : 400)
            .json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
}

export const getAllAddressCtrl = async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) {
            return res.status(401).json(
                api_response("FAIL", "Unauthorized: User ID missing", null)
            );
        }
        const response = await getAddressSrvc(userId, req.body);
        return res
            .status(response.status === "SUCCESS" ? 200 : 500)
            .json(response);

    } catch (error) {
        console.error("Get Address Controller Error:", error);
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
}




// update Address
export const updateAddressCtrl = async (req, res) => {
    try {
        const { userId } = req.user;     
        const { id } = req.params;        
        const bodyData = req.body;     

        if (!id) {
            return res.status(400).json(api_response("FAIL", "Address ID is required", null));
        }

        const response = await updateAddressSrvc(userId, id, bodyData);
         
        const statusCode = response.status === "SUCCESS" ? 200 : 400;
        return res.status(statusCode).json(response);

    } catch (error) {
        console.error("Update Address Controller Error:", error);
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
};

export const deleteAddressCtrl = async (req, res) => {
    try {
        const { id } = req.params;  
        const { userId } = req.user;
 
        if (!id || !userId) {
            return res.status(400).json(
                api_response("FAIL", "Address ID and User ID are required", null)
            );
        }

        const response = await deleteAddressSrvc(id, userId);
        
        const statusCode = response.status === "SUCCESS" ? 200 : 404;  
        return res.status(statusCode).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Delete failed", null, error.message)
        );
    }
};