import express from 'express'
import API from '@butlerlogic/common-api'

const app = express()

// Simple Dev Configuration
API.applySimpleCORS(app)
API.applyCommonConfiguration(app, false)

// Basic Middleware
app.use(API.log)

// Planning/Mocking Phase
app.get('/token', API.NOT_IMPLEMENTED)
app.get('/user', API.NOT_IMPLEMENTED)
app.get('/directory', API.NOT_IMPLEMENTED)
app.get('/discussion', API.NOT_IMPLEMENTED)
app.get('/notification', API.NOT_IMPLEMENTED)

const server = app.listen(8888, () => console.log(`Server is running at http://localhost:${server.address().port}.`))
