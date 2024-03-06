const express = require("express")
const CategoryController = require("../controller/category")
const router = express.Router()

router.get("/", CategoryController.getCategory)
router.post("/", CategoryController.InputCategory)
router.put("/:id", CategoryController.PutCategory)
router.delete("/:id", CategoryController.DeleteCategory)

module.exports = router