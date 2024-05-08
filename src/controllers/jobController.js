const Job = require('../models/jobSchema')
const { validateParams } = require('../Util/globalFunction')
const jobValidation = require("../ValidationSchema/jobValidation")
const Question = require('../models/questionSchema');
const moment = require('moment')

// @desc Create new job
// @route POST /api/job
// @access public

const createJob = async (req, res) => {
    try{
        const validation = await validateParams(jobValidation, req?.body)
        const response = await Job.create(req?.body)


        if(response){
            const questions = req.body.questions;
            if(questions && questions.length > 0){
                for(const question of questions){
                    question.jobId = response._id
                    const response2 = await Question.create(question)
                }
            }
            else{
                return res.json({ message: 'Something went wrong !!!', code : 204 })
            }
            return res.json({ message: 'Job Created !!', code : 200 })
        }
        else{
            return res.json({ message: 'Something went wrong !!!', code : 204 })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error', error,  });
    }
}

// @desc UPDATE job
// @route PUT /api/job/:id
// @access public

const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const jobData = req.body;

        const existingJob = await Job.findById(jobId);
        if (!existingJob) {
            return res.status(404).json({ message: 'Job not found', code: 404 });
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, { new: true });

        if (!updatedJob) {
            return res.status(500).json({ message: 'Failed to update job', code: 500 });
        }

        const questions = req.body.questions;
        if (questions && questions.length > 0) {
            for (const question of questions) {
                question.jobId = jobId;
                await Question.findOneAndUpdate({ _id: question._id }, question, { upsert: true });
            }
        }

        return res.json({ message: 'Job Updated !!', code: 200 });
    } catch (error) {
        console.error('Error updating job:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}

// @desc DELETE a job
// @route DELETE /api/job/:id
// @access public

const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const existingJob = await Job.findById(jobId);
        if (!existingJob) {
            return res.status(404).json({ message: 'Job not found', code: 404 });
        }

        const response = await Job.deleteOne({ _id: jobId });

        if (response.deletedCount > 0) {
            await Question.deleteMany({ jobId });

            return res.json({ message: 'Job Deleted !!', code: 200 });
        } else {
            return res.json({ message: 'Something went wrong !!!', code: 204 });
        }
    } catch (error) {
        console.error('Error deleting job:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}

// @desc Get all jobList
// @route GET /api/jobs
// @access public

const getAllJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 3; 
        const search = req.query.search || '';
        const city = req.query.city || '';
        const dateTimeFilter = req.query.filterDateTime || '';

        console.log(dateTimeFilter)

        let query = {
            $or: [
                { jobTitle: { $regex: search, $options: "i" } }
            ],

        }

        if (city) {
            query={...query, city}
        }

        let startDate, now;

        switch (dateTimeFilter) {
            case 'PastMonth':
                startDate = moment().subtract(1, 'months').startOf('month').toISOString();
                now = moment().format();
                break;
            case 'PastWeek':
                startDate = moment().subtract(1, 'weeks').startOf('week').toISOString();
                now = moment().format()
                break;
            case 'Past24Hours':
                startDate = moment().subtract(1, 'days').startOf('day').toISOString();
                now = moment().format()
                break;
            default:
                break;
        }

        if (startDate) {
            query.createdAt = { $gte: startDate, $lte: now };
        }

        const skip = (page - 1) * limit;

        const totalJobs = await Job.countDocuments({ ...query });
        const totalPages = Math.ceil(totalJobs / limit);
        
        const jobs = await Job.find({ ...query })
                            .sort({ createdAt: -1 })
                            .skip(skip)
                            .limit(limit);

        return res.json({
            message: 'Successfully GET !!',
            data: jobs,
            pagination: {
                totalPages,
                currentPage: page,
                totalJobs
            },
            code: 200
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc Get a job
// @route GET /api/job/id
// @access public

const getSingleJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.json({ message: 'Job not found !!!', code: 404 });
        }

        const questions = await Question.find({ jobId: jobId });

        const responseData = {
            job: job,
            questions: questions
        };

        return res.json({ message: 'Successfully GET !!', data: responseData, code: 200 });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};


module.exports = { createJob, updateJob, deleteJob, getAllJobs, getSingleJob };