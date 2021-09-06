require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { establishDbConnection } = require('./database/connection')
const { cors } = require('./middleware/cors')
const { apiRoutes } = require('./routes/index')
const trunks = require('trunks-log')

const log = new trunks('MAIN')

const port = process.env.SERVER_PORT || 3000

const app = express()

// Establish Connection to MongoDB
establishDbConnection()

// Turn on CORS Middleware
app.use(cors)

// Mount logging middleware
app.use(morgan(process.env.MORGAN_LOG_TEMPLATE || 'tiny'))

// Start Parsing request bodies as json
app.use(express.json())

// Register our API Routes
app.use('/api', apiRoutes)

// Register web routes
app.use('/client', express.static(path.resolve(__dirname, '../dist')))

// Spin up the Application
app.listen(port, () => {
  log.info(`Server Running on port ${port}`)
})
