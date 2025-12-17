import { addCartSrvc } from "../../services/customerSrvc/cartSrvc.js";

// Add Cart

export const addCartCtrl = async (req, res) => {


    console.log("eeeee", req.body)
    // const userId = req.user._id; 
    const { product_id, quantity, price, total_price, is_active } = req.body;

    const response = await addCartSrvc({
        //   user: userId,
        product_id, quantity, price, total_price, is_active
    });

    res.status(200).json(response);


};


//  Get All Carts

export const getAllCartsCtrl = async (req, res) => {
    try {
        const userId = req.user._id;

        const carts = await getCarts({ user: userId });
        res.status(200).json(carts);

    } catch (error) {
        res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error)
        );
    }
};






export const updateCartCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const response = await updateCartSrvc(id, { quantity });
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(
            api_response("FAIL", "Update failed", null, error)
        );
    }
};


export const deleteCartCtrl = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await deleteCartSrvc(id);
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(
            api_response("FAIL", "Delete failed", null, error)
        );
    }
};

