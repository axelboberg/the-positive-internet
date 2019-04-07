/**
 * Axel Boberg © 2019
 */

module.exports = (state, emitter) => {
  emitter.on('message:random', () => {
    state.expect('/api/message', 'message')
      .then(message => state.message = message)
      .then(() => emitter.emit('render'))
  })

  if (!state.message) {
    state.message = {}
    emitter.emit('message:random')
  }
}