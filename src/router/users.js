const express = require("express")
const UsersController = require("../controller/users")
const router = express.Router()

router.get("/:id", UsersController.getUserById)
router.get("/", UsersController.getUsers)
router.post("/", UsersController.InputUser)
router.put("/:id", UsersController.PutUser)
router.delete("/:id", UsersController.DeleteUser)

module.exports = router