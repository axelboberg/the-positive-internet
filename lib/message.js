/**
 * Axel Boberg © 2019
 */

const MAX_COUNT = 200

const store = [
  {
    text: 'You\'re looking great today',
    country: 'Sweden'
  },
  {
    text: 'Hey you, you\'re awesome',
    country: 'Denmark'
  },
  {
    text: 'I like you',
    country: 'Finland'
  },
  {
    text: 'I ate a burger today, it was delicious',
    country: 'Sweden'
  },
  {
    text: 'Have an awesome day!',
    country: 'Sweden'
  },
  {
    text: 'I like your shirt :)',
    country: 'England'
  },
  {
    text: 'Wanna be friends?',
    country: 'Ireland'
  }
]

exports.store = message => {
  store.push(message)
  if (store.length > MAX_COUNT) {
    store.shift()
  }
}

exports.retrieve = () => {
  const rnd = Math.floor(Math.random() * store.length)
  return store[rnd]
}