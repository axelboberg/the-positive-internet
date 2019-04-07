/**
 * Axel Boberg © 2019
 */

const html = require('choo/html')
const raw = require('choo/html/raw')
const header = require('../components/header')

const bubbles = require('../assets/bubbles')

module.exports = (state, emit) => {
  return html`
    <div class="View">
      ${header()}
      <div class="u-align--center u-margin--40">
        <div class="u-margin--40 u-align--center">
          ${raw(bubbles)}
        </div>
        <h1>What is this?</h1>
        <article class="u-align--center u-align-text--left u-margin--40">
          The Internet is a valuable but dangerous resource, and we have misused it badly.
          <p>
            Cyberbullying has become part of the daily agenda. It is easy to hide behind a screen and with the stroke of a few buttons break eachother down.  
          </p>
          <p>
            <a href="https://internetstiftelsen.se/docs/Motverka-natmobbning.pdf" target="_blank" rel="noopener noreferrer">In a study conducted by BRIS</a> as many as 61% of children said they had been targets for mean comments online.
          </p>
          <p>
            That made me wonder.<br>
            Would it be possible to bring people together and bridge the gaps while still being anonymous on the internet?
          </p>
          <p>
            I created this site, "the positive internet", as a place where you can go to get a positive boost, and return the favor to other visitors without knowing who you are writing to.
          </p>
          <p>
            Before submitting a message it is analyzed using machine learning as a step to verify that you are indeed writing something good.
          </p>
          <p>
            <a href="/">Leave a kind message</a> for the next person visiting this website.
          </p>
        </article>
        <div class="u-padding--20"></div>

        <div class="u-align--center u-align-items--center u-width--250">
          <img src="${require('../assets/profile.png')}" class="u-circle u-margin--right--20" width="65" height="65" alt="Axel Boberg">
          <div class="u-align-text--left">
            Axel Boberg
            <br><a href="https://boberg.io" target="_blank" rel="noopener noreferrer">boberg.io</a>
          </div>
        </div>
        <div class="u-padding--20"></div>
      </div>
    </div>
  `
}