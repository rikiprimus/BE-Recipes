const express = require("express")
const CommentsController = require("../controller/comment")
const router = express.Router()
const authMiddleware = require("../middleware/auth")

router.get("/:id", CommentsController.getCommentById)
router.get("/", CommentsController.getCommentByRecipe)
router.post("/", authMiddleware.protect, CommentsController.InputComment)
router.put("/:id", authMiddleware.protect, CommentsController.PutComment)
router.delete("/:id", authMiddleware.protect, CommentsController.DeleteComment)


module.exports = router