/**
 * Axel Boberg © 2019
 */

const fs = require('fs')

const MAX_COUNT = 200
const DATA_FILEPATH = './data.json'
const MAX_NOT_SAVED = 10

let notSaved = 0
let store = [
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

function save () {
  return new Promise(resolve => {
    fs.writeFile(DATA_FILEPATH, JSON.stringify(store), err => {
      if (err) throw err
      resolve()
    })
  })
}

function load () {
  fs.stat(DATA_FILEPATH, (err, stat) => {
    if (err) return
    fs.readFile(DATA_FILEPATH, (err, data) => {
      if (err) return
      store = JSON.parse(data)
    })
  })
}
load()

exports.store = message => {
  store.push(message)
  if (store.length > MAX_COUNT) {
    store.shift()
  }

  notSaved += 1
  if (notSaved === MAX_NOT_SAVED) {
    save()
      .then(() => notSaved = 0)
      .catch(console.error)
  }
}

exports.retrieve = () => {
  const rnd = Math.floor(Math.random() * store.length)
  return store[rnd]
}