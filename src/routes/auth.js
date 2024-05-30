const express = require('express')
const router = express.Router()
const AuthController = require('../controller/auth')

router.post('/register', AuthController.register)
router.post('/register/:role', AuthController.register)
router.post('/login',AuthController.login)
router.post('/forgotpassword',AuthController.forgotpassword)
router.post('/sendpin',AuthController.sendpin)
router.post('/confirmpin',AuthController.confirmpin)
router.post('/changepassword',AuthController.changepassword)
router.get('/activated/:id/:otp',AuthController.verification)

module.exports = router