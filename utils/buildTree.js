export const buildCategoryTree = (categories) => {
    const map = new Map();
    const roots = [];

    categories.forEach(cat => {
        map.set(cat._id.toString(), { ...cat.toObject(), children: [] });
    });

    categories.forEach(cat => {
        if (cat.parent_category) {
            const parent = map.get(cat.parent_category.toString());
            if (parent) {
                parent.children.push(map.get(cat._id.toString()));
            }
        } else {
            roots.push(map.get(cat._id.toString()));
        }
    });

    return roots;
};
