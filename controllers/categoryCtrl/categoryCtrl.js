
// 111111111 create category 111111111111

export const createCategoryCtrl = (req, res) => {

    console.log("Body", req.body)
    res.status(200).json({
        "message": "Create Category"
    })
}


// 222222222222 get gategory 2222222222222
export const getCategoryCtrl = (req, res) => {

    console.log("Body", req.body)
    res.status(200).json({
        "message": "getCategoryCtrl  Category"
    })
}






// 3333333333 update category 3333333333333
export const updateCategoryCtrl = (req, res) => {

    console.log("Body", req.body)
    res.status(200).json({
        "message": "updateCategoryCtrl  Category"
    })
}


// 444444444 delete category 44444444444
export const deleteCategoryCtrl = (req, res) => {

    console.log("Body", req.body)
    res.status(200).json({
        "message": "deleteCategoryCtrl Category"
    })
}