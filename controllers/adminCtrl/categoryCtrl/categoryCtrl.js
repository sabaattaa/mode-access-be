import { addCategorySrvc, deleteCategorySrvc, exportToExcelSrvc, getCategorySrvc, updateCategorySrvc } 
from "../../../services/adminSrvc/categorySrvc.js";
 
//   create category  

export const addCategoryCtrl = async (req, res) => {

    const data = req.body;
 
    data.category_img = req.file.path;

    const categorySrvcRes = await addCategorySrvc(data);

    return res.status(200).json(

        categorySrvcRes

    );
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