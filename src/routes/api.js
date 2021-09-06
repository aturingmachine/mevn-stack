const express = require('express')
const userRoutes = require('./users')

const router = express.Router()

router.use('/users', userRoutes)

module.exports = router
