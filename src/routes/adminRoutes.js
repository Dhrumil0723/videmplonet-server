const express = require('express')
const router = express.Router()
const { changePassword, updateUser, deleteUser } = require('../controllers/adminController')

//  Admin Routes
router.route('/user').delete(deleteUser).put(updateUser)
router.route('/change-password').put(changePassword)

module.exports = router