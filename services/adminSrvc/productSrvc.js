import Product from "../../models/productModel.js";
import { api_response } from "../../utils/response.js";


export const addProductSrvc = async (data) => {
    try {


        const newProduct = await Product.create(data);

        return api_response(
            "SUCCESS",
            "New product added successfully",
            newProduct
        );

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Product add failed",
            null,
            error
        );
    }
};


export const getProducts = async (filter, sort) => {
    try {


        const [
            totalProducts,
            activeProducts,
            inactiveProducts,
            draftProducts,
            outofstockProducts,
        ] = await Promise.all([
            Product.countDocuments(),
            Product.countDocuments({ status: "active" }),
            Product.countDocuments({ status: "inactive" }),
            Product.countDocuments({ status: "draft" }),
            Product.countDocuments({ status: "outofstock" }),

        ]);
        const counts = {
            totalProducts,
            activeProducts,
            inactiveProducts,
            draftProducts,
            outofstockProducts,
        }


        const products = await Product
            .find(filter)
            .sort(sort)
            .populate("category", "name");

        return api_response(
            "SUCCESS",
            "All products fetched successfully",
            {
                counts,
                products
            }
        );

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Product fetch failed",
            null,
            error
        );
    }
};



export const updateProductSrvc = async (id, data) => {
    try {
        const product = await Product.findById(id);

        if (!product) {
            return api_response(
                "FAIL",
                "Product not found",
                null
            );
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        );

        return api_response(
            "SUCCESS",
            "Product updated successfully",
            updatedProduct
        );

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Product update failed",
            null,
            error
        );
    }
};




export const deleteProductSrvc = async (id) => {
    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return api_response(
                "FAIL",
                "Product not found",
                null
            );
        }

        return api_response(
            "SUCCESS",
            "Product deleted successfully",
            product
        );

    } catch (error) {
        return api_response(
            "FAIL",
            error.message || "Product delete failed",
            null,
            error
        );
    }
};
