const express = require('express')
const router = express.Router()
const { createJob, updateJob, deleteJob, getAllJobs, getSpecificRecruiterJob,getSingleJob } = require('../controllers/jobController')

// Jobs Routes
router.route('/').post(createJob).get(getAllJobs)
router.route('/specific').get(getSpecificRecruiterJob)
router.route('/:id').put(updateJob).delete(deleteJob).get(getSingleJob)


module.exports = router