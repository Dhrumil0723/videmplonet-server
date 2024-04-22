const express = require('express')
const router = express.Router()
const { createRecording, updateRecording, deleteRecording, getSingleRecording, getAllRecording } = require('../controllers/recordingController')

// Recording Routes
router.route('/').post(createRecording).get(getAllRecording)
router.route('/:id').put(updateRecording).delete(deleteRecording).get(getSingleRecording)


module.exports = router