/**
 * Axel Boberg © 2019
 */

const html = require('choo/html')
const header = require('../components/header')
const Input = require('../components/input')
const Message = require('../components/message')

const input = new Input()
const message = new Message()

module.exports = (state, emit) => {
  return html`
    <div class="View--center">
      ${header([{ text: 'What is this?', href: '/about' }])}
      <div class="u-align--center u-width--rel--90">
        ${message.render(state, emit)}
      </div>
      ${input.render()}
    </div>
  `
}