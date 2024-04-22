const express = require('express')
const router = express.Router()
const { createQuestion, updateQuestion, deleteQuestion, getSingleQuestion, getAllQuestion } = require('../controllers/questionController')

// Question Routes
router.route('/').post(createQuestion).get(getAllQuestion)
router.route('/:id').put(updateQuestion).delete(deleteQuestion).get(getSingleQuestion)

module.exports = router