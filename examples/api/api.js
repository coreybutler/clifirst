import express from 'express'
import API from '@butlerlogic/common-api'

const app = express()

API.applySimpleCORS(app)
API.applyCommonConfiguration(app)
app.use(API.log)

const AccessToken = 'TOKEN1234567890'

app.get('/token', API.basicauth('dev', 'opensesame'), API.reply(AccessToken))
app.get('/user', API.NOT_IMPLEMENTED)
app.get('/directory', API.NOT_IMPLEMENTED)
app.get('/wall', API.NOT_IMPLEMENTED)
app.get('/notification', API.NOT_IMPLEMENTED)

const server = app.listen(8888, () => console.log(`Server is running at http://localhost:${server.address().port}`))
