const express = require('express')
const router = express.Router()
const AuthController = require('../controller/auth')
// const {role} = require('../middleware/auth')
router.post('/register', AuthController.register)
router.post('/register/:role', AuthController.register)
router.post('/login',AuthController.login)

module.exports = router