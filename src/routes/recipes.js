const express = require("express");
const RecipesController = require("../controller/recipes");
const validateFile = require("../middleware/validatePhoto");
const upload = require("../middleware/uploadPhoto")
const router = express.Router()
const authMiddleware = require("../middleware/auth")

router.get("/", RecipesController.getRecipe)
router.get("/detail",RecipesController.getRecipeDetail)
router.get("/:id", RecipesController.getRecipeById)
router.post("/", upload.single("photo"), validateFile, RecipesController.InputRecipe)
router.put("/:id", upload.single("photo"), validateFile, RecipesController.PutRecipe)
router.delete("/:id", RecipesController.DeleteRecipe)

module.exports = router