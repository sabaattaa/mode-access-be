
import Category from "../../models/adminModel/categoryModel.js"; 
import { buildCategoryTree } from "../../utils/buildTree.js";
import { api_response } from "../../utils/response.js";
import XLSX from "xlsx";

export const addCategorySrvc = async (data) => {

    try {
        const newCategory = await Category.create(data);
 
        return api_response(
            "SUCCESS",
            "New category added successfully.",
            newCategory
        );
    } catch (e) {
        console.log("error", e)
        return api_response(
            "FAIL",
            "Category add failed.",
            null,
            e
        );
    }
};



export const getCategorySrvc = async (query) => {
    try {
        const { id, search, status, featured, customOrder } = query;

        // Build dynamic filter
        const filter = {};
        if (id) filter._id = id;
        if (search) filter.name = { $regex: search, $options: "i" };
        if (status && status !== "all") filter.status = status;
        if (featured !== undefined) filter.featured = featured === "true";

        // Build sort object
        let sort = {};
        if (customOrder === "name-asc") sort = { name: 1 };
        else if (customOrder === "name-desc") sort = { name: -1 };
        else if (customOrder === "newest") sort = { createdAt: -1 };

        // Fetch flat categories
        const categories = await Category.find(filter).sort(sort);

        // 🔥 Build tree structure
        const categoryTree = buildCategoryTree(categories);

        // Counts (unchanged)
        const [
            totalCategories,
            activeCategories,
            inactiveCategories,
            draftCategories,
            parentCategories,
            subCategories,
        ] = await Promise.all([
            Category.countDocuments(),
            Category.countDocuments({ status: "active" }),
            Category.countDocuments({ status: "inactive" }),
            Category.countDocuments({ status: "draft" }),
            Category.countDocuments({ parent_category: null }),
            Category.countDocuments({ parent_category: { $ne: null } }),
        ]);

        return api_response(
            "SUCCESS",
            "Categories fetched successfully.",
            {
                counts: {
                    totalCategories,
                    activeCategories,
                    inactiveCategories,
                    draftCategories,
                    parentCategories,
                    subCategories,
                },
                categories: categoryTree,  
            }
        );
    } catch (e) {
        console.error("Get categories error:", e);
        return api_response(
            "FAIL",
            "Failed to fetch categories.",
            null,
            e.message || e
        );
    }
};


export const updateCategorySrvc = async (req) => {
    try {
        const data = req.body;
        // if (req.file) {
        //     data.category_img = req.file.path;
        // }
        const { id } = req.query;
        // category_img,
        const { name, slug, featured, 
             parent_category, status, description } = data;
        if (!id) {
            return api_response("FAIL", "Category ID is required for update.", null);
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (slug) updateData.slug = slug;
        if (featured !== undefined) updateData.featured = featured === "true";
        // if (category_img) updateData.category_img = category_img;
        if (parent_category !== undefined) updateData.parent_category = parent_category;
        if (status) updateData.status = status;
        if (description) updateData.description = description;


        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        if (!updatedCategory) {
            return api_response("FAIL", "Category not found.", null);
        }

        return api_response("SUCCESS", "Category updated successfully.", updatedCategory);
    } catch (e) {
        console.error("Update category error:", e);
        return api_response("FAIL", "Failed to update category.", null, e.message || e);
    }
};


export const deleteCategorySrvc = async (id) => {
    try {
        if (!id) {
            return api_response("FAIL", "Category ID is required.", null);
        }

        const delCategory = await Category.deleteOne({ _id: id });

        if (delCategory.deletedCount === 0) {
            return api_response("FAIL", "Category not found.", null);
        }

        return api_response(
            "SUCCESS",
            "Category deleted successfully.",
            delCategory
        );
    } catch (e) {
        console.error("Delete category error:", e);
        return api_response("FAIL", "Failed to delete category.", null, e.message || e);
    }
};


export const exportToExcelSrvc = async (req,res) => {
  try {
    const categories = await Category.find().lean();
 
    const worksheet = XLSX.utils.json_to_sheet(categories);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");

    
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

     
    res.setHeader("Content-Disposition", "attachment; filename=categories.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
 
    res.send(buffer);
  } catch (err) {
    console.error("Excel export error:", err);
    res.status(500).json({ status: "FAIL", message: "Failed to export Excel." });
  }
};