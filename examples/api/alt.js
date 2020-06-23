import express from 'express'
import API from '@butlerlogic/common-api'
import authorized from './lib/htpasswd.js'

const app = express()

// Simple Dev Configuration
API.applySimpleCORS(app)
API.applyCommonConfiguration(app, false)

// Basic Middleware
app.use(API.log)

const AccessToken = 'TOKENABC'

app.get('/token', API.basicauth((user, pwd, granted, denied) => {
  if (authorized(user, pwd)) {
    console.log(`granted ${user} access`)
    granted()
  } else {
    console.log(`denied ${user} access`)
    denied()
  }
}), (req, res) => {
  console.log(req.get('authorization'), API.atob(req.get('authorization')))
  res.send(`${req.user}_${AccessToken}`)
})

// Secure all of the core components
app.use((req, res, next) => {
  if (!req.get('authorization')) {
    return res.sendStatus(401)
  }

  const token = req.get('authorization').split(/\s+/).pop()
  if (token.indexOf(AccessToken)) {
    return next()
  }

  res.sendStatus(401)
})

// Implement a makeshift reply
app.get('/user', (req, res) => {
  const user = req.get('authorization').split(' ').pop().split('_').shift()
  res.json({
    username: user,
    givenName: user,
    surname: 'Doe',
    displayName: `${user} Doe`,
    title: 'Software Developer'
  })
})

app.get('/directory', API.NOT_IMPLEMENTED)
app.get('/discussion', API.NOT_IMPLEMENTED)
app.get('/notification', API.NOT_IMPLEMENTED)

const server = app.listen(8888, () => console.log(`Server is running at http://localhost:${server.address().port}.`))
