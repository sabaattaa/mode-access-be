
import { findProduct } from "../../services/adminSrvc/productSrvc.js";
import {
    addOrderSrvc,
    getOrdersSrvc,
    deleteOrderSrvc,
    updateOrderSrvc
} from "../../services/customerSrvc/orderSrvc.js";


// import { findProduct } from "../../../services/adminSrvc/productSrvc.js";
import { api_response } from "../../utils/response.js";


// Add to Order
export const addOrderCtrl = async (req, res) => {
    try {
        const {  payment_method, shipping_address, order_items, } = req.body;

        const user_id = req.user?._id;
        const response = await addOrderSrvc({
            user_id,  payment_method, shipping_address, order_items,
        });

        return res
            .status(response.status === "SUCCESS" ? 200 : 400)
            .json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
};

 


// Get All Orders
export const getAllOrdersCtrl = async (req, res) => {
    try {
       
        const order_id = req.params?.id||null
        const  user_id = req.user._id;
        
        const filter = { 
            user_id
        };
        if (order_id) filter._id = order_id;  
        console.log("ssssss", filter,req.user )
        const response = await getOrdersSrvc(filter);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
};


// Delete Order Item
export const deleteOrderCtrl = async (req, res) => {
    try {

        const { id } = req.params;
        const user_id = req.user._id
if(!id || !user_id){
   return res.status(500).json(
            api_response("FAIL", "Order id nad User id is required", null, error.message)
        ); 
}

        const response = await deleteOrderSrvc(id,user_id);
        return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Delete failed", null, error.message)
        );
    }
};




// Update Order Items
export const updateOrderCtrl = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json(api_response("FAIL", "Order ID is required.", null));
    }   

    const response = await updateOrderSrvc(id,status);

    return res
      .status(response.status === "SUCCESS" ? 200 : 400)
      .json(response);

  } catch (error) {
    return res
      .status(500)
      .json(api_response("FAIL", "Update Order failed", null, error.message));
  }
};
