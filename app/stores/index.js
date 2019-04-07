/**
 * Axel Boberg © 2019
 */

/**
 * Require all stores that
 * the app should use
 */
const STORES = [
  require('./message')
]

module.exports = app => {
  for (let store of STORES) {
    store(app.state, app.emitter)
  }
}
