/**
 * Axel Boberg © 2019
 */

const path = require('path')
const ignoreStyles = require('ignore-styles')

ignoreStyles.default(undefined, (module, filename) => {
  const ext = /(?:([^.]+))?$/.exec(filename)[0]

  if (['jpg', 'png', 'jpeg', 'svg'].includes(ext)) {
    module.exports = '/assets/' + path.basename(filename)
  }
  if (ext === 'css') return false
})

const app = require('./index.js')

const assetTemplates = {
  'css': path => {
    return `<link rel="stylesheet" href="${path}" type="text/css">`
  },
  'js': path => {
    return `<script src="${path}" type="application/javascript" defer></script>`
  }
}

module.exports = opts => {
  const assets = (opts.assets || [])
    .map(asset => {
      const ext = /(?:([^.]+))?$/.exec(asset)[0]
      if (!assetTemplates[ext]) return ''
      return assetTemplates[ext](asset)
    })
    .join('')

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
        ${ 
           opts.route ?
           app.toString(opts.route, opts.state || {}) : ''
        }
      </body>
    </html>
  `
}