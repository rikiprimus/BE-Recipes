const express = require("express")
const router = express.Router()
const CategoryController = require("../controller/category")
const authMiddleware = require("../middleware/auth")

router.get("/", CategoryController.getCategory)
router.post("/", authMiddleware.protect, CategoryController.InputCategory)
router.put("/:id", authMiddleware.protect, CategoryController.PutCategory)
router.delete("/:id", authMiddleware.protect, CategoryController.DeleteCategory)

module.exports = router