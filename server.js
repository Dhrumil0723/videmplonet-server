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
app.use(
  cors({
    origin: true,
    credentials: true
  })
)
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

connect()

app.use('/', require('./src/routes/userRoutes'))


//Start our server
app.listen(process.env.PORT)
