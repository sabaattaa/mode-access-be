import { addCategorySrvc, deleteCategorySrvc, exportToExcelSrvc, getCategorySrvc, updateCategorySrvc } 
from "../../../services/adminSrvc/categorySrvc.js";
import { api_response } from "../../../utils/response.js";
 
//   create category  

export const addCategoryCtrl = async (req, res) => {
  try {
    const data = req.body;
      
    if (!req.file) {
      return res.status(400).json(
        api_response(
          "FAIL",
          "Category Image is required.",
          null,
          "Category Image is required."
        )
      );
    }
 
    data.category_img = req.file.path;
 
    if (typeof data?.featured === 'string') {
      data.featured = data.featured === 'true';
    }
 
    if (data?.parentId === '' || data?.parentId === 'null') {
      data.parentId = null;
    }

    const categorySrvcRes = await addCategorySrvc(data);
    
    return res.status(categorySrvcRes.status === 'SUCCESS' ? 200 : 400).json(
      categorySrvcRes
    );
    
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json(
      api_response("FAIL", "Server error", null, error.message)
    );
  }
};


//   get gategory  
export const getAllCategoryCtrl = async (req, res) => {

    const getCategoryRes = await getCategorySrvc(req.query)

    return res.status(200).json(

        getCategoryRes

    );
}






//   update category  
export const updateCategoryCtrl = async (req, res) => {

    const updateCategoryRes = await updateCategorySrvc(req)

    return res.status(200).json(
        updateCategoryRes
    );
}


//   delete category  
export const deleteCategoryCtrl = async (req, res) => {
    const { id } = req.query;

    const deleteCategoryRes = await deleteCategorySrvc(id)

    return res.status(200).json(

        deleteCategoryRes

    );
}


export const exportCategory = async (req, res) => {

    const exportCategoryRes = await exportToExcelSrvc(req,res)

    return res.status(200).json(

        exportCategoryRes

    );

}