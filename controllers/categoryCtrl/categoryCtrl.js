
//   create category  

export const createCategoryCtrl = (req, res) => {

    console.log("Body", req.body);
    console.log("File:", req.file);
    res.status(200).json({
        "message": "Create Category",
        file: req.file,
        body: req.body,
    })
}


//   get gategory  
export const getAllCategoryCtrl = (req, res) => {

    const { id, search, status, orderType } = req.query
    console.log("search", search)
    if (id) {

    } else {

    } 
    res.status(200).json({
        "message": "getAllCategoryCtrl  Category"
    })
}






//   update category  
export const updateCategoryCtrl = (req, res) => {

    console.log("Body", req.body)
    res.status(200).json({
        "message": "updateCategoryCtrl  Category"
    })
}


//   delete category  
export const deleteCategoryCtrl = (req, res) => {

    console.log("Body", req.body)
    res.status(200).json({
        "message": "deleteCategoryCtrl Category"
    })
}


export const categoryCounts = (req,res) => {
    res.status(200).json({
        "message": " Category counts"
    })
}

export const exportCategory=(req,res)=>{
res.status(200).json({
        "message": " Categories exported"
    })

}