/**
 * Axel Boberg © 2019
 */

const html = require('choo/html')

module.exports = view => {
  return (state, emit) => {
    return html`
      <body>
        ${view(state, emit)}
      </body>
    `
  }
}
