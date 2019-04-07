
/**
 * Axel Boberg © 2019
 */

require('dotenv').config()
const path = require('path')

const Router = require('obj-router')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const api = require('./lib/root.routes')
const router = new Router(api)

const expect = require('./app/expect')
const template = require('./app/template')
const assets = require('./assets.json')

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use('/api/*', (req, res, next) => {
  const payload = {
    'method': req.method,
    'body': req.body,
    'ip': req.headers['x-forwarded-for'] || req.connection.remoteAddress
  }

  router.execute(req.originalUrl, payload)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      if (err.code === 404) {
        return next()
      }
      next(err)
    })
})

/**
 * Setup Express to serve static files
 */
app.use(express.static(path.join(__dirname, './dist')))
app.get('/favicon.ico', (req, res, next) => {
  return res.send('Favicon not found').status(404)
})

/**
 * Collect the data expected by
 * the client for a specific request
 * @param { Request } req the request to satisfy
 * @returns { Promise<Object> } a satified state
 */
function satisfy(route, req, render, state = {}) {
  if (!expect.expecations(route)) render(route)

  const expecations = expect.expecations(route)
  const promises = expecations
    .map(ex => {
      req.body = ex.data
      
      const promise = router.execute(ex.identifier, {
        'method': req.method,
        'body': req.body
      })
      if (!promise) return
      
      return promise
        .then(data => expect.insert(state, ex.location, ex.transformation(data)))
    })

  return Promise.all(promises)
    .then(() => state)
    .catch(() => state)
}

function renderClient (req, res, next) {
  let route = req.path

  function render (route, state = {}) {
    return template({
      'state': state,
      'assets': assets.assets,
      'state': state,
      'route': route
    })
  }

  satisfy(route, req, render)
    .then(state => res.send(render(route, state)))
    .catch(next)
}

app.get('*', renderClient)

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
  }

  if (!err.code) {
    err.message = 'Internal server error'
  }
  
  res
    .status(err.code || 500)
    .send({
      description: err.message || err.msg,
      code: err.code || 500
    })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})