const Question = require('../models/QuestionSchema')
const { validateParams } = require('../Util/globalFunction')
const questionValidation = require("../ValidationSchema/questionValidation")

// @desc Create new question
// @route POST /api/question
// @access public

const createQuestion = async (req, res) => {
    try{
        const validation = await validateParams(questionValidation, req?.body)

        const response = await Question.create(req?.body)

        if(response){
            return res.json({ message: 'Question Created !!', code: 200})
        }else{
            return res.json({ message: 'Something went wrong !!!', code : 204 })
        }
    } catch (error) {
        return res.json({ message: 'Internal Server Error' });
     }
}

// @desc Update job
// @route PUT /api/job/:id
// @access public

const updateQuestion = async(req,res) => {
    try{
        const QuestionId = req.params.id;

        const validation = await validateParams(req?.body)

        const response = await Question.findByIdAndUpdate(QuestionId, req?.body, { new: true })
  
        if(response){
            return res.json({ message: 'Question Updated !!', code : 200 })
        }
        else{
            return res.json({ message: 'Something went wrong !!!', code : 204 })
        }
    } catch(error) {
        return res.json({ message: 'Internal Server Error' });
    }
}

// @desc DELETE a job
// @route DELETE /api/job/:id
// @access public

const deleteQuestion = async(req,res) => {
    
    try{
        const QuestionId = req.params.id
    
        const response = await Question.deleteOne({ _id: QuestionId});

        if(response){
            return res.json({ message: 'Question Deleted !!', code : 200 })
        }else{
            return res.json({ message: 'Something went wrong !!!', code : 204 })
        }
    }catch(error){
        return res.json({ message: 'Internal Server Error', error });
    }
}

// @desc Get all questionsList
// @route GET /api/questions
// @access public

const getAllQuestion = async(req,res) => {
    try{
        const response = await Question.find();
        if(response){
            return res.json({ message: 'Successfully GET  !!', data: response, code: 200 })
        }else{
            return res.json({ message: 'Something went wrong !!!', code: 204 })
        }
    }catch(error){
        return res.json({ message:'Internal Server Error' })
    }
}

// @desc Get a question
// @route GET /api/question/:id
// @access public

const getSingleQuestion = async(req,res) => {

    try{
        const QuestionId = req.params.id
    
        const response = await Question.findById(QuestionId)

        if(response){
            return res.json({ message: 'Successfully GET !!', data: response, code: 200 })
        }else{
            return res.json({ message: 'Something went wrong !!!', code: 204 })
        }
    }catch(error){
        return res.json({ message:'Internal Server Error' })
    }
    
}

module.exports = { createQuestion, updateQuestion, deleteQuestion, getSingleQuestion, getAllQuestion }