const { v4: uuidv4 } = require("uuid")

const { 
    getCategoryByIdModel,
    getCategoryModel,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../model/category")

const CategoryController = {
    getCategory: async (req, res, next) => {
        try {
            let category = await getCategoryModel();
            let result = category.rows;
            console.log(result);
            return res
                .status(200)
                .json({ message: "success getCategory", data: result });
        } catch (err) {
            console.log("getCategory error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getCategory Controller" });
        }
    },
    InputCategory: async (req, res, next) => {
        try {
            let { name } = req.body;
            if (
                !name ||
                name === ""
            ) {
                return res.json({ code: 404, message: "input invalid" });
            }
            let data = { id: uuidv4(), name };
            let result = await createCategory(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success input data" });
            }
            return res
                .status(401)
                .json({ code: 401, message: "failed input data" });
        } catch (err) {
            console.log("InputCategory error");
            console.log(err.message);
            return res
                .status(404)
                .json(err.message);
        }
    },
    
    PutCategory: async (req, res, next) => {
        try {
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let { name } = req.body;
            let categorys = await getCategoryByIdModel(id);
            let resultCategory = categorys.rows;
            if (!resultCategory.length) {
                return res
                    .status(404)
                    .json({ message: "category not found or id invalid" });
            }
            let category = resultCategory[0];
            let data = {
                id,
                name: name || category.name
            };

            let result = await updateCategory(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success update data" });
            }
            return res.status(401).json({code:401,message:"failed update data"})
        } catch (err) {
            console.log("UpdateCategory error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed UpdateCategory Controller" });
        }
    },


    DeleteCategory: async(req, res, next) => {
        try {
            let { id } = req.params;
            if (!id) {
                return res.status(404).json({ message: "params id invalid" });
            }
            
            let category = await getCategoryByIdModel(id);
            let resultCategory = category.rows;
            if (!resultCategory.length) {
                return res
                    .status(404)
                    .json({ message: "Category not found" });
            }
            
            await deleteCategory(id);
            return res
                    .status(200)
                    .json({ code: 200, message: "success delete data" });
        } catch (err) {
            console.log("DeleteCategory error");
            console.log(err);
            return res
                .status(500)
                .json({ message: "failed DeleteCategory Controller" });
        }
    },
}

module.exports = CategoryController