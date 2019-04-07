/**
 * Axel Boberg © 2019
 */

const Message = require('./message')
const Perspective = require('./perspective')
const country = require('./country')

const iplocation = require('iplocation').default

function checkText (text) {
  if (/[<>]/.test(text)) throw { message: 'Text may contain code', code: 400 }
  if (text.length > 45) throw { message: 'Text cannot be more than 45 characters long', code: 400 }
  if (text.length < 5) throw { message: 'Text needs to be atleast 5 characters long', code: 400 }
  return text
}

module.exports = {
  '/api': {
    '/message': {
      'get': req => Promise.resolve(Message.retrieve()),
      'post': req => {
        if (!req.body.text) throw { message: 'Missing message text', code: 400 }

        const text = String(req.body.text)
        checkText(text)

        return Perspective.toxicity(text)
          .then(({ safe }) => {
            if (!safe) throw { message: 'Text is not positive', code: 400 }
            return true
          })
          .then(() => iplocation(req.ip, []))
          .then(loc => {
            Message.store({
              text: text,
              country: country.byCode(loc.countryCode) || ''
            })
          })
          .then(() => {
            return { status: 'OK' }
          })
      }
    },
    '/check': {
      'get': req => Perspective.toxicity(checkText(req.query.text))
    }
  }
}