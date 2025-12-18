export const inventoryCountCtrl = (req, res) => {

    const { id, search, status, orderType } = req.query
    console.log("search", search)
    if (id) {

    } else {

    } 
    res.status(200).json({
        "message": "getAllCategoryCtrl  Category"
    })
}

export const getInventoryAlertsCtrl = (req, res) => {

    const { id, search, status, orderType } = req.query
    console.log("search", search)
    if (id) {

    } else {

    } 
    res.status(200).json({
        "message": "getAllCategoryCtrl  Category"
    })
}

