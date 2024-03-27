const { v4: uuidv4 } = require("uuid");
const {
    getCommentsByRecipeModel,
    getCommentByIdModel,
    createComment,
    updateComment,
    deleteComment,
} = require("../model/comment");

const CommentsController = {
    getCommentByRecipe: async (req, res, next) => {
        try {
            let {recipes_id} = req.body;
            let comments = await getCommentsByRecipeModel(recipes_id);
            let result = comments.rows;
            console.log(result);
            return res
                .status(200)
                .json({ message: "success getComment", data: result });
        } catch (err) {
            console.log("getComment error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getComment Controller" });
        }
    },
    getCommentById: async (req, res, next) => {
        try {
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let comments = await getCommentByIdModel(id);
            let result = comments.rows;
            if (!result.length) {
                return res
                    .status(404)
                    .json({ message: "comment not found or id invalid" });
            }
            console.log(result);
            return res
                .status(200)
                .json({ message: "success getCommentById", data: result[0] });
        } catch (err) {
            console.log("getCommentById error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getCommentById Controller" });
        }
    },
    InputComment: async (req, res, next) => {
        try {
            let { fill_comment, recipes_id } = req.body;
            let users_id = req.payload.id
            let data = { id: uuidv4(), fill_comment, recipes_id, users_id };
            let result = await createComment(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success input data" });
            }
            return res
                .status(401)
                .json({ code: 401, message: "failed input data" });
        } catch (err) {
            console.log("InputComment error");
            console.log(err.message);
            return res
                .status(404)
                .json(err.message);
        }
    },
    PutComment: async (req, res, next) => {
        try {
            // check params & body
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let { fill_comment } = req.body;
            // check comment
            let comments = await getCommentByIdModel(id);
            let resultComment = comments.rows;
            if (!resultComment.length) {
                return res
                    .status(404)
                    .json({ message: "comment not found or id invalid" });
            }
            let comment = resultComment[0];
            let data = {
                id,
                fill_comment: fill_comment || comment.fill_comment
            };

            let result = await updateComment(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success update data" });
            }
            return res.status(401).json({code:401,message:"failed update data"})
        } catch (err) {
            console.log("InputComment error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed InputComment Controller" });
        }
    },
    DeleteComment: async(req, res, next) => {
        try {
            // check params & body
            let { id } = req.params;
            if (!id) {
                return res.status(404).json({ message: "params id invalid" });
            }
            
            // check comment
            let comments = await getCommentByIdModel(id);
            let resultComment = comments.rows;
            if (!resultComment.length) {
                return res
                    .status(404)
                    .json({ message: "comment not found" });
            }
            
            await deleteComment(id);
            return res
                    .status(200)
                    .json({ code: 200, message: "success delete data"});
        } catch (err) {
            console.log("DeleteComment error");
            console.log(err);
            return res
                .status(500)
                .json({ message: "failed DeleteComment Controller" });
        }
    },
};

module.exports = CommentsController;
