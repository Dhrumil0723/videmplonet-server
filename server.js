const express = require('express')
const cors = require('cors')
const connect = require('./src/config/connect')
const cookieParser = require('cookie-parser')

if (process.env.NODE_EVN != 'production') {
  require('dotenv').config()
}

const app = express()

//Configure express app
app.use(express.json())
app.use(express.static("public"));
app.use(
  cors({
    origin: true,
    credentials: true
  })
)
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

connect()

app.use('/api/user', require('./src/routes/userRoutes'))
app.use('/api/recruiter', require('./src/routes/recruiterRoutes'))
app.use('/api/job', require('./src/routes/jobRoutes'))
app.use('/api/question', require('./src/routes/questionRoutes'))
app.use('/api/recording', require('./src/routes/recordingRoutes'))


//Start our server
app.listen(process.env.PORT)
