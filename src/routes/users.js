const express = require("express")
const router = express.Router()
const UsersController = require("../controller/users")
const authMiddleware = require("../middleware/auth")
const upload = require("../middleware/uploadPhoto")
const validateFile = require("../middleware/validatePhoto");

router.get("/:id", authMiddleware.protect, UsersController.getUserById)
router.put("/:id", upload.single("photo_profile"), validateFile, authMiddleware.protect, UsersController.PutUser)
router.delete("/:id", UsersController.DeleteUser)
router.get("/", authMiddleware.protect, UsersController.getUsers)
// router.post("/", UsersController.InputUser)

module.exports = router