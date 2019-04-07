/**
 * Axel Boberg © 2018
 */

const renderer = require('./renderer')

/**
 * Declare all routes with their
 * respective path and view
 */
const ROUTES = {
  '/': renderer(require('./views/home')),
  '/about': renderer(require('./views/about'))
}

module.exports = app => {
  /**
   * Route all routes to the app
   */
  for (let route in ROUTES) {
    app.route(route, ROUTES[route])
  }
}
