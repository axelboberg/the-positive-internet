/**
 * Axel Boberg © 2019
 */

const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

require('./index.css')

module.exports = class Message extends Nanocomponent {
  createElement (state, emit) {
    this.state = state
    this.emit = emit

    this.message = state.message

    if (!this.message) {
      this.message = {
        text: '',
        country: ''
      }
    }
  
    return html`
      <div class="Message">
        <div class="Message-text">
          <div class="u-heading--1">
            ${this.message.text}
          </div>
          <div class="u-heading--5">
            By someone in ${this.message.country}
          </div>
        </div>
        <div class="u-margin--20">
          <button class="Button" onclick="${() => this.emit('message:random')}">
            Another
            <span data-icon="arrow-round" data-icon-placement="right"></span>
          </button>
        </div>
      </div>
    `
  }

  update () {
    return JSON.stringify(this.message) !== JSON.stringify(this.state.message)
  }
}