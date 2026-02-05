
// Add Product

import { addProductSrvc, deleteProductSrvc, getProductsSrvs, getSingleProductsSrvs, updateProductSrvc } from "../../../services/adminSrvc/productSrvc.js"
import { api_response } from "../../../utils/response.js";

export const addProductCtrl = async (req, res) => {
    const { name, sku, description, category, price, original_price, stock_quantity, status, featured } = req.body;

    const images = req.files?.map(file => file.path);

    if (!images || images.length === 0) {
        throw new Error("Product images are required");
    }

    const data = { name, sku, description, category, price, original_price, stock_quantity, status, featured, product_imgs: images, };

    const addProductRes = await addProductSrvc(data)

    res.status(200).json(addProductRes)
}


//  Get All Products

export const getAllProductsCtrl = async (req, res) => {
    try {

        const userId = req.user?.userId || null;

        const { id, search, category, status, customOrder, priceRange } = req.query;

        let filter = {};

        if (id) filter._id = id;
        if (category) filter.category = category;
        if (status) filter.status = status;
        if (priceRange) {
            filter.price = { $gte: Number(priceRange) }
        }


        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { sku: { $regex: search, $options: "i" } },
            ];
        }

        let sort = {};

        switch (customOrder) {
            case "newest":
                sort = { createdAt: -1 };
                break;

            case "oldest":
                sort = { createdAt: 1 };
                break;

            case "price-high":
                sort = { price: -1 };
                break;

            case "price-low":
                sort = { price: 1 };
                break;

            case "name-asc":
                sort = { name: 1 };
                break;

            case "name-desc":
                sort = { name: -1 };
                break;

            case "stock-low":
                sort = { stock_quantity: 1 };
                break;

            case "stock-high":
                sort = { stock_quantity: -1 };
                break;

            default:
                sort = { createdAt: -1 };
        }

        const result = await getProductsSrvs(filter, sort, userId);
        res.status(200).json(result);

    } catch (error) {
        console.log("error is:", error)
        res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error)
        );
    }
};
//  Get All Products

export const getSingleProductsCtrl = async (req, res) => {
    try {

        const userId = req.user?.userId || null;

        const { id } = req.query;

        let filter = {};

        if (id) filter._id = id;

        const result = await getSingleProductsSrvs(filter, userId);
        res.status(200).json(result);

    } catch (error) {
        console.log("error is:", error)
        res.status(500).json(
            api_response("FAIL", "Something went wrong", null, error)
        );
    }
};






export const updateProductCtrl = async (req, res) => {
    try {
        const { id } = req.query;

        const { name, sku, description, category, price, original_price, stock_quantity, status, featured, } = req.body;

        const images = req.files?.map(file => file.path);

        const data = { name, sku, description, category, price, original_price, stock_quantity, status, featured, };

        if (images && images.length > 0) {
            data.product_imgs = images;
        }

        const response = await updateProductSrvc(id, data);

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(
            api_response("FAIL", "Update failed", null, error)
        );
    }
};


//   Delete Product  
export const deleteProductCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteProductSrvc(id);
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(
            api_response("FAIL", "Delete failed", null, error)
        );
    }
};

export const importProductCtrl = (req, res) => {

    res.status(200).json({
        "message": "deleteProductCtrl Product"
    })
}

export const exportProductCtrl = (req, res) => {

    res.status(200).json({
        "message": "deleteProductCtrl Product"
    })
}