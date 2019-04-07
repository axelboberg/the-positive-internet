/**
 * Axel Boberg © 2019
 */

const util = require('util')
const request = util.promisify(require('request'))

const API_KEY = process.env.PERSPECTIVE_API_KEY
const THRESHOLD = 0.10

if (!API_KEY) {
  throw new Error('Missing perspective api-key')
}

function analyze (text) {
  const opts = {
    method: 'POST',
    body: JSON.stringify({
      comment: { text: text },
      languages: [ 'en' ],
      requestedAttributes: { TOXICITY:{} }
    })
  }

  return request(`https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`, opts)
    .then(res => JSON.parse(res.body))
    .then(res => {
      if (!res.attributeScores || !res.attributeScores.TOXICITY) {
        throw new Error('Unable to analyze text')
      }
      return res.attributeScores.TOXICITY.summaryScore.value
    })
}

exports.toxicity = (str = '', threshold = THRESHOLD) => {
  if (!str || String(str).length === 0) {
    return Promise.reject({ message: 'Invalid text', code: 400 })
  }

  return analyze(str)
    .then(score => {
      return {
        score: score,
        safe: score <= threshold
      }
    })
}
