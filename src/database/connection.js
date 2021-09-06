const mongoose = require('mongoose')
const trunks = require('trunks-log')

const log = new trunks('DBCONN')

mongoose.connection.on('connecting', () => {
  log.info(`Connecting to Mongo at ${process.env.MONGO_URI}`)
})

mongoose.connection.on('connected', () => {
  log.info('Mongo connection established')
})

mongoose.connection.on('error', (error) => {
  log.error('Mongo connection error', error)
})

function establishDbConnection() {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (error) {
    log.error('Mongo Connection Error:, {}', error)
  }
}

module.exports = { establishDbConnection }
