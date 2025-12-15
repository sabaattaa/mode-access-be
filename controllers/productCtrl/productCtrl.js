
// 111111111 create Product 111111111111

export const addProductCtrl = (req, res) => {

    console.log("Body", req.body);
    console.log("Files:", req.files);
    res.status(200).json({
        "message": "Create Product",
        file: req.files,
        body: req.body,
    })
}


// 222222222222 get gategory 2222222222222
export const getAllProductsCtrl = (req, res) => {

    const { id, search, status, orderType } = req.query
    console.log("search", search)

    res.status(200).json({
        "message": "getAllProductCtrl  Product"
    })
}






// 3333333333 update Product 3333333333333
export const updateProductCtrl = (req, res) => {

    console.log("Body", req.body)
    res.status(200).json({
        "message": "updateProductCtrl  Product"
    })
}


// 444444444 delete Product 44444444444
export const deleteProductCtrl = (req, res) => {

    console.log("Body", req.body)
    res.status(200).json({
        "message": "deleteProductCtrl Product"
    })
}

export const importProductCtrl = (req, res) => {

    console.log("Body", req.body)
    res.status(200).json({
        "message": "deleteProductCtrl Product"
    })
}

export const exportProductCtrl = (req, res) => {

    console.log("Body", req.body)
    res.status(200).json({
        "message": "deleteProductCtrl Product"
    })
}