require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { establishDbConnection } = require('./database/connection')
const { cors } = require('./middleware/cors')
const { log } = require('./utils/logger')
const { apiRoutes } = require('./routes/index')

const port = process.env.SERVER_PORT || 3000

const app = express()

// Establish Connection to MongoDB
establishDbConnection()

// Mount logging middleware
app.use(morgan(process.env.MORGAN_LOG_TEMPLATE || 'tiny'))

// Turn on CORS Middleware
app.use(cors)

// Start Parsing request bodies as json
app.use(express.json())

// Register our API Routes
app.use('/api', apiRoutes)

// Spin up the Application
app.listen(port, () => {
  log.info(`Server Running on port ${port}`)
})
