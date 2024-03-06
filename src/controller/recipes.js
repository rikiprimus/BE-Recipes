const { v4: uuidv4 } = require("uuid");
const {
	getRecipeDetailModel,
	getRecipeDetailCountModel,
    getRecipesModel,
    getRecipeByIdModel,
    createRecipe,
    updateRecipe,
    deleteRecipe,
} = require("../model/recipes");

const RecipesController = {
    getRecipeDetail: async (req, res, next) => {
        try {
			// check searchBy
			let searchBy = "title"
			if(req.query.searchBy){
                const validSearchByValues = ["title", "ingredient", "category"];
                if(validSearchByValues.includes(req.query.searchBy)){
                    searchBy = req.query.searchBy
                }
            }
			// check sortBy
			let sortBy = 'created_at'
            if (req.query.sortBy) {
                const validSortByValues = ["created_at", "updated_at"];
                if(validSortByValues.includes(req.query.sortBy)){
                    sortBy = req.query.sortBy
                }
            }
			// check sort
			let sort = 'ASC'
			if (req.query.sort) {
                const validSortValues = ["ASC", "DESC"];
                if(validSortValues.includes(req.query.sort)){
                    sort = req.query.sort
                }
            }
			let search = req.query.search || ""
			let limit = req.query.limit || 3
			let offset = ((req.query.page || 1) - 1) * parseInt(limit)

			let data = {searchBy,search,sortBy,sort,limit,offset}

            let recipes = await getRecipeDetailModel(data);
            let count = await getRecipeDetailCountModel(data);
			let total = count.rowCount
            let result = recipes.rows;
			let page_next
			if(req.query.page == Math.round(total/parseInt(limit))){
				page_next = 0
			} else {
				page_next = parseInt(req.query.page) + 1
			}
			
			let pagination = {
				page_total : Math.round(total/parseInt(limit)),
				page_prev: parseInt(req.query.page) - 1,
                page_current: parseInt(req.query.page),
				page_next,
				total_data : total
			}
            
            return res
                .status(200)
                .json({ message: "success getRecipeDetail", data: result ,pagination});
        } catch (err) {
            console.log("getRecip error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getRecipeDetail Controller" });
        }
    },
    getRecipe: async (req, res, next) => {
        try {
            let recipes = await getRecipesModel();
            let result = recipes.rows;
            console.log(result);
            return res
                .status(200)
                .json({ message: "success getRecipe", data: result });
        } catch (err) {
            console.log("getRecip error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getRecipe Controller" });
        }
    },
    getRecipeById: async (req, res, next) => {
        try {
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let recipes = await getRecipeByIdModel(id);
            let result = recipes.rows;
            if (!result.length) {
                return res
                    .status(404)
                    .json({ message: "recipe not found or id invalid" });
            }
            console.log(result);
            return res
                .status(200)
                .json({ message: "success getRecipeById", data: result[0] });
        } catch (err) {
            console.log("getRecipeById error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getRecipeById Controller" });
        }
    },
    InputRecipe: async (req, res, next) => {
        try {
            let { title, ingredient, photo, video, category } = req.body;
            if (
                !title ||
                title === "" ||
                !ingredient ||
                ingredient === "" ||
                !photo || 
                photo === "" || 
                !video || 
                video === "" 
            ) {
                return res.json({ code: 404, message: "input invalid" });
            }
            let data = { id: uuidv4(), title, ingredient, photo, video, category };
            let result = await createRecipe(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success input data" });
            }
            return res
                .status(401)
                .json({ code: 401, message: "failed input data" });
        } catch (err) {
            console.log("InputRecipe error");
            console.log(err.message);
            return res
                .status(404)
                .json(err.message);
        }
    },
    PutRecipe: async (req, res, next) => {
        try {
            // check params & body
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let { title, ingredient, photo, video, category } = req.body;
            // check recipe
            let recipes = await getRecipeByIdModel(id);
            let resultRecipe = recipes.rows;
            if (!resultRecipe.length) {
                return res
                    .status(404)
                    .json({ message: "recipe not found or id invalid" });
            }
            let recipe = resultRecipe[0];
            let data = {
                id,
                title: title || recipe.title,
                ingredient: ingredient || recipe.ingredient,
                photo: photo || recipe.photo,
                video: video || recipe.video,
                category: category || recipe.category,
            };

            let result = await updateRecipe(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success update data" });
            }
            return res.status(401).json({code:401,message:"failed update data"})
        } catch (err) {
            console.log("InputRecipe error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed InputRecipe Controller" });
        }
    },
    DeleteRecipe: async(req, res, next) => {
        try {
            // check params & body
            let { id } = req.params;
            if (!id) {
                return res.status(404).json({ message: "params id invalid" });
            }
            
            // check recipe
            let recipes = await getRecipeByIdModel(id);
            let resultRecipe = recipes.rows;
            if (!resultRecipe.length) {
                return res
                    .status(404)
                    .json({ message: "recipe not found" });
            }
            
            await deleteRecipe(id);
            return res
                    .status(200)
                    .json({ code: 200, message: "success delete data"});
        } catch (err) {
            console.log("DeleteRecipe error");
            console.log(err);
            return res
                .status(500)
                .json({ message: "failed DeleteRecipe Controller" });
        }
    },
};

module.exports = RecipesController;
