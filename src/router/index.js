const express = require("express");
const router = express.Router();
const recipes = require("./recipes")
const users = require("./users")
const category = require("./category")

router.use("/users",users)
router.use("/recipes",recipes)
router.use("/category",category) 

module.exports = router