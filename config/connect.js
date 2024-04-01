const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected to db')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connect
