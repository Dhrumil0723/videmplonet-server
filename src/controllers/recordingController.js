const { model } = require('mongoose')
const Recording = require('../models/recordingSchema')
const { validateParams } = require('../Util/globalFunction')
const recordingValidation = require("../ValidationSchema/recordingValidation")

// @desc Create new recording
// @route POST /api/recording
// @access public

const createRecording = async (req, res) => {
    try{
        const validation = await validateParams(recordingValidation, req?.body)

        const response = await Recording.create(req?.body)

        if(response){
            return res.json({ message: 'Recording Created !!'});
        }else{
            return res.json({ message: 'Something went wrong !!!', code : 204 });
        }
   
    } catch (error) {
        return res.status(500).status(500).json({ message: 'Internal Server Error', error });
     }
}

// @desc Update recording
// @route PUT /api/recording/:id
// @access public

const updateRecording = async(req,res) => {
    try{
        const RecordingId = req.params.id;

        const validation = await validateParams(req?.body)

        const response = await Recording.findByIdAndUpdate(RecordingId, req?.body, { new: true })
  
        if(response){
            return res.json({ message: 'Recording Updated !!', code : 200 })
        }else{
            return res.json({ message: 'Something went wrong !!!', code : 204 })
        }
    } catch(error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}

// @desc DELETE a recording
// @route DELETE /api/recording/:id
// @access public

const deleteRecording = async(req,res) => {

    try{
        const RecordingId = req.params.id
    
        const response = await Recording.deleteOne({ _id: RecordingId})

        if(response){
            return res.json({ message: 'Recording Deleted !!', code: 200 })
        }else{
            return res.json({ message: 'Something went wrong !!!', code: 204 })
        }
    }catch(error){
        return res.status(500).json({ message:'Internal Server Error' })
    }

}

// @desc Get all RecordingsList
// @route GET /api/Recordings
// @access public

const getAllRecording = async(req,res) => {

    try{
        const response = await Recording.find();
        if(response){
            return res.json({ message: 'Successfully GET !!', data: response, code: 200 })
        }else{
            return res.json({ message: 'Something went wrong !!!', code: 204 })
        }
    }catch(error){
        return res.status(500).json({ message:'Internal Server Error' })
    }

}

// @desc Get a Recording
// @route GET /api/Recording/:id
// @access public

const getSingleRecording = async(req,res) => {

    try{
        const RecordingId = req.params.id
        
        const response = await Recording.findById(RecordingId)
        if(response){
            return res.json({ message: 'Successfully GET !!', data: response, code: 200 })
        }else{
            return res.json({ message: 'Something went wrong !!!', code: 204 })
        }
    }catch(error){
        return res.status(500).json({ message:'Internal Server Error' })
    }
}

module.exports = { createRecording, updateRecording, deleteRecording, getAllRecording, getSingleRecording }