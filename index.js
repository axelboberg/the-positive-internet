
/**
 * Axel Boberg © 2019
 */

require('dotenv').config()
const path = require('path')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Object router
const Router = require('obj-router')
const api = require('./lib/root.routes')
const router = new Router(api)

// Rendering dependencies
const ssr = require('./app/ssr')
const template = require('./app/template')
const assets = require('./assets.json')

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

/**
 * Set up the object-router on top of Express,
 * which allows for calling the API internally
 */
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
 * Populate a target object with data that
 * the client application expects for a
 * certain route
 * 
 * @param { Object } target 
 * @param { String } route 
 * @param { Function } render 
 * @returns { Promise<Object> }
 */
async function populate (target, route, render) {
  if (!ssr.expecations(route)) render(route)

  const expectations = ssr
    .expecations(route)
    .map (({ id, data, location, transformation }) => {
      router.execute(id, { method: 'GET', body: data })
        .then(data => {
          ssr.insert(target, location, transformation(data))
        })
    })

  await Promise.all(expectations)
  return target
}

/**
 * Render the client application as HTML
 * 
 * @param { String } route 
 * @param { Object } state 
 * @returns { Promise<String> }
 */
async function render (route, state = {}) {
  await populate(state, route, template)
  return template(route, {
    state: state,
    assets: assets.assets
  })
}

/**
 * Render the client-application for
 * all routes not yet covered by a handler
 */
app.get('*', (req, res, next) => {
  render(req.path, {})
    .then(html => res.send(html))
    .catch(next)
})

/**
 * Handle errors and make sure that a
 * JSON-object is returned to the client
 */
app.use((err, req, res, next) => {
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
