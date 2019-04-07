/**
 * Axel Boberg © 2019
 */

const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

require('./index.css')

const CHECK_TIMEOUT_MILLISECONDS = 2000

function checkString (str) {
  return window.fetch(`./api/check?text=${str}`)
    .then(res => res.json())
    .then(res => res.safe)
}

const INDICATORS_SAFE = [
  '<span class="u-emoji">🙂</span> That\'s nice',
  '<span class="u-emoji">🥰</span> Kinda sweet',
  '<span class="u-emoji">😃</span> Awesome!'
]

const INDICATORS_UNSAFE = [
  '<span class="u-emoji">😤</span> <span class="u-color--red">Hey, keep it nice.</span>',
  '<span class="u-emoji">🤨</span> <span class="u-color--red">That\'s not very nice</span>',
  '<span class="u-emoji">😡</span> <span class="u-color--red">Make it positive</span>'
]

module.exports = class Input extends Nanocomponent {
  createElement () {
    const indicatorEl = html`
      <div class="Input-indicator"></div>
    `

    const textareaEl = html`
      <textarea rows="2"
                cols="50"
                placeholder="Say something nice"
                maxlength="42"
                onkeyup="${check()}"></textarea>
    `

    const sendEl = html`
      <button class="Button" onclick="${send}" disabled>Send</button>
    `

    const inputEl = html`
      <div class="Input-field">
        ${textareaEl}
        <div class="u-align--spacebetween">
          ${indicatorEl}
          ${sendEl}
        </div>
      </div>
    `

    const buttonEl = html`
      <button class="Button--action" onclick="${openField}">
        Say something nice
      </button>
    `

    return html`
      <div class="Input">
        ${inputEl}
        ${buttonEl}
      </div>
    `

    function openField () {
      inputEl.classList.add('is-expanded')
      buttonEl.classList.add('is-expanded')
    }

    function check () {
      let timeout

      return function () {
        const val = textareaEl.value

        if (timeout) {
          clearTimeout(timeout)
          timeout = null
          indicatorEl.innerHTML = 'Checking...'
        }

        if (val.length === 0) {
          indicatorEl.innerHTML = ''
          return
        }

        if (val.length < 5) {
          indicatorEl.innerHTML = 'Too short'
          return
        }

        timeout = setTimeout(() => {
          checkString(val)
            .then(enableSend)
            .then(safe => safe ? INDICATORS_SAFE : INDICATORS_UNSAFE)
            .then(indicators => {
              const rnd = Math.floor(Math.random() * indicators.length)
              indicatorEl.innerHTML = indicators[rnd]
            })
        }, CHECK_TIMEOUT_MILLISECONDS)
      }
    }

    function enableSend (state) {
      sendEl.toggleAttribute('disabled', !state)
      return state
    }

    function send () {
      const opts = {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ text: textareaEl.value })
      }

      sendEl.textContent = 'Sent!'

      window.fetch('./api/message', opts)
        .catch(() => sendEl.innerHTML = '<span class="u-color--red">Unable to send</span>')
    }
  }

  update () {
    return false
  }
}