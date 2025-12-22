
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
        const { user_id, total_price, payment_method, shipping_address, order_items,order_no } = req.body;


        const response = await addOrderSrvc({
            user_id, total_price, payment_method, shipping_address, order_items,order_no
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

// Add to Order
export const addOrderItmsCtrl = async (req, res) => {
    try {
        const { order_id, order_items } = req.body;



        console.log("sssss", order_id, order_items)



        // const product = await findProduct(product_id);
        // if (!product) {
        //     return res.status(400).json(
        //         api_response("FAIL", "Product not found", null)
        //     );
        // }

        // const { price, stock_quantity } = product;

        // if (quantity > stock_quantity) {
        //     return res.status(400).json(
        //         api_response(
        //             "FAIL",
        //             `${quantity} product not available, stock is ${stock_quantity}`,
        //             null
        //         )
        //     );
        // }

        // const totalPrice = quantity * price;

        // const response = await addOrderSrvc({
        //     user_id,
        //     guest_id,
        //     product_id,
        //     quantity,
        //     price,
        //     total_price: totalPrice,
        // });

        // return res
        //     .status(response.status === "SUCCESS" ? 200 : 400)
        //     .json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error.message)
        );
    }
};




// Get All Orders
export const getAllOrdersCtrl = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json(
                api_response("FAIL", "User ID is required", null, null)
            );
        }


        const response = await getOrdersSrvc(id);
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
        
        
        const response = await deleteOrderSrvc(id);
        return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

    } catch (error) {
        return res.status(500).json(
            api_response("FAIL", "Delete failed", null, error.message)
        );
    }
};




// // Clear All Order Items
// export const updateOrderCtrl = async (req, res) => {
//     try {
//         const { quantity, userId } = req.body;
//         const { id } = req.params;
//         if (!id) {
//             return api_response("FAIL", "ID is required.", null,)
//         }
//         if (quantity < 1) {
//             return api_response("FAIL", "Quentity must grater then 1.", null,)
//         }
//         const response = await updateOrderSrvc(id, quantity, userId);
//         return res.status(response.status === "SUCCESS" ? 200 : 400).json(response);

//     } catch (error) {
//         return res.status(500).json(
//             api_response("FAIL", "Clear Order failed", null, error.message)
//         );
//     }
// };