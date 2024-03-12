const express = require("express");
const router = express.Router();
const recipes = require("./recipes")
const users = require("./users")
const category = require("./category")
// const profile = require("./profile")
const comment = require("./comment")
const auth = require("./auth")

router.use("/users",users)
router.use("/recipes",recipes)
router.use("/category",category) 
// router.use("/profile", profile)
router.use("/comment", comment)
router.use("/auth", auth)

module.exports = router