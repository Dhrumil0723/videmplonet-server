const express = require('express')
const router = express.Router()
const { signUp, login, adminLogin } = require('../controllers/userController')

//  Auth Routes
router.route('/signup').post(signUp)
router.route('/login').post(login)
router.route('/admin/login').post(adminLogin)

module.exports = router