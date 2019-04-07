/**
 * Axel Boberg © 2019
 */

const html = require('choo/html')
const header = require('../components/header')

module.exports = (state, emit) => {
  return html`
    <div class="View">
      ${header()}
      <div class="u-align--center">
        <div class="u-padding--20"></div>
        <h1>What is this?</h1>
        <article class="u-align--center u-margin--40">
          The Internet is a valuable but dangerous resource.
          <p>
            Let’s use it to connect, share facts and spread positivity.
          </p>
          <p>
            <a href="/">Leave a kind message</a> for the next person visiting this website.
          </p>
        </article>
        <div class="u-padding--20"></div>

        <div class="u-align--center u-align-items--center u-width--250">
          <img src="${require('../assets/profile.png')}" class="u-circle u-margin--right--20" width="65" height="65" alt="Axel Boberg">
          <div class="u-align-text--left">
            Axel Boberg / hello@axelboberg.se
          </div>
        </div>
      </div>
    </div>
  `
}