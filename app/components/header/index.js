/**
 * Axel Boberg © 2019
 */

const html = require('choo/html')

require('./index.css')

module.exports = (links = [{ text: 'Leave a message!', href: '/' }]) => {
  
  links = links.map(link => {
    return html`
      <a href="${link.href}" class="Header-link">${link.text}</a>
    `
  })
  
  return html`
    <div class="Header">
      <div class="Header-links">
        ${links}
      </div>
    </div>
  `
}