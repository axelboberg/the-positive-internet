/**
 * Axel Boberg © 2019
 */

const path = require('path')
const ignoreStyles = require('ignore-styles')

/**
 * Ignore required modules that are either
 * image files or css files, since those
 * should be required on the client side only.
 */
ignoreStyles.default(undefined, (module, filename) => {
  const ext = /(?:([^.]+))?$/.exec(filename)[0]

  if (['jpg', 'png', 'jpeg', 'svg'].includes(ext)) {
    module.exports = '/assets/' + path.basename(filename)
  }
  if (ext === 'css') return false
})

const app = require('./index.js')

const ASSET_TEMPLATES = {
  'css': path => {
    return `<link rel="stylesheet" href="${path}" type="text/css">`
  },
  'js': path => {
    return `<script src="${path}" type="application/javascript" defer></script>`
  }
}

module.exports = (route, opts) => {

  /**
   * Render HTML-tags for any assets
   */
  const assets = (opts.assets || [])
    .map(asset => {
      const ext = /(?:([^.]+))?$/.exec(asset)[0]
      if (!ASSET_TEMPLATES[ext]) return ''
      return ASSET_TEMPLATES[ext](asset)
    })
    .join('')

  /**
   * Insert the api-location to the state
   * if it is provided as an option.
   * This allows for running Webpack Dev Server
   * while still calling the correct API
   */
  const state = (function () {
    const state = opts.state || {}
    if (opts.api) state.api = opts.api

    return state
  })()

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>The positive internet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <base href="/">
        <link href="https://fonts.googleapis.com/css?family=Shrikhand" rel="stylesheet">
        <link rel="stylesheet" href="https://use.typekit.net/pjj5esf.css">
        <script>
          window.initialState = ${JSON.stringify(state)}
        </script>
        ${assets}
      </head>
      <body>
        ${app.toString(route, opts.state || {})}
      </body>
    </html>
  `
}