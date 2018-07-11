// Dependencies
const cors = require('cors')
const express = require('express')

// Application
const app = express()

// Middlewars
app.use(cors())

// Routes
app.use('/calculator', require('./routes/calculator'))

// Export
module.exports = app
