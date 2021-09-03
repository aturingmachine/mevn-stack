require('dotenv').config()
const express = require('express')
const { establishDbConnection } = require('./database/connection')
const { cors } = require('./middleware/cors')
const { log } = require('./utils/logger')
const { apiRoutes } = require('./routes/index')

const port = process.env.SERVER_PORT || 3000

const app = express()

// Establish Connection to MongoDB
establishDbConnection()

// Turn on CORS Middleware
app.use(cors)
app.use(express.json())

// Register our API Routes
app.use('/api', apiRoutes)

// Spin up the Application
app.listen(port, () => {
  log.info(`Server Running on port ${port}`)
})
