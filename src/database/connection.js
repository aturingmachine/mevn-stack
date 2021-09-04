const mongoose = require('mongoose')
const { log } = require('../utils/logger')

function establishDbConnection() {
  log.info(`Connecting to Mongo at ${process.env.MONGO_URI}`)

  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (error) {
    log.error('Mongo Connection Error')
  }

  log.info('Mongo Connected')

  mongoose.connection.on('error', (err) => {
    log.error('MongoDB Error', err)
  })
}

module.exports = { establishDbConnection }
