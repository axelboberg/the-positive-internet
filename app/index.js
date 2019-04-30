/**
 * Axel Boberg © 2019
 */

const url = require('url')
const choo = require('choo')
const app = choo()
const ssr = require('./ssr')

if (!module.parent) {
  /**
   * Mount the app if it's run
   * in-browser
   */
  app.mount('body')
  app.state.isClient = true
} else {
  /**
   * Allow for isomorphic rendering
   */
  module.exports = app
}

/**
 * Require global styling
 */
require('./style.css')
require('./icons.css')

{
  /**
   * Wrap fetch and expect in a
   * single function on the state
   * @param { String } api The api to request
   * @param { String } loc The expected location on the state as dot notation
   * @param { Function? } trans A transformer function that will be applied to the response
   * @param { Object? } data Any payload data that will be sent in the request body
   */
  app.state.expect = (api, loc, trans, data) => {
    if (app.state.api) api = url.resolve(app.state.api, api)

    if (app.state.isClient) {
      const opts = {
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify(data),
        ...(app.state.api && { mode: 'no-cors' })
      }
      return window.fetch(api, opts)
        .then(res => {
          if (!res.ok) return res.json()
          return res.json()
        })
        .then(trans)
    }

    /**
     * Use expect if the code is
     * run on the server
     */
    ssr.expect(app.state.href || '/', loc, api, trans, data)
    return Promise.resolve()
  }
}

/**
 * Init stores
 */
require('./stores')(app)

/**
 * Init routes
 */
require('./routes')(app)