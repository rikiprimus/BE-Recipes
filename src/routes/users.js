const express = require("express")
const router = express.Router()
const UsersController = require("../controller/users")
const authMiddleware = require("../middleware/auth")

router.get("/id/", authMiddleware.protect, UsersController.getUserById)
router.put("/id/", authMiddleware.protect, UsersController.PutUser)
router.delete("/id/", UsersController.DeleteUser)
router.get("/", authMiddleware.protect, UsersController.getUsers)
// router.post("/", UsersController.InputUser)

module.exports = router