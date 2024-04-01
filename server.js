const express = require('express')
const cors = require('cors')
const connect = require('./config/connect')
const cookieParser = require('cookie-parser')
// const userController = require('./controllers/userController')
// const requireAuth = require('./middleware/requireAuth')

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

app.use('/', require('./routes/userRoutes'))

// app.get('/test', userController.test)
// app.post('/', userController.login)
// app.get('/logout', userController.logout) 

//Start our server
app.listen(process.env.PORT)
