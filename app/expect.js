/**
 * Axel Boberg © 2018
 */

const routes = {}

function emptyTransformation (data) {
  return data
}

/**
 * Expect certain data for a route
 * @param { String } route
 * @param { String } location The location on the state object where the data is expected to be retained, as dot-notation
 * @param { String } identifier An identifier used to know what data is requested
 * @param { Object } data Payload data that will be provided to the data source
 */
exports.expect = (route, location, identifier, transformation, data) => {
  if (!routes[route]) routes[route] = {}
  if (typeof transformation !== 'function') {
    transformation = emptyTransformation
  }

  routes[route][location] = {
    location: location,
    identifier: identifier,
    data: data || {},
    transformation: transformation
  }
}

/**
 * Get the expectations for a certain route
 * @param { String } route The route to lookup
 * @returns { Array } An array with expectations
 */
exports.expecations = route => {
  if (!routes[route]) {
    routes[route] = {}
    return null
  }

  return Object.values(routes[route])
}

/**
 * Insert data at location in object
 * specified with dot-notation
 * @param { Object } target The target object
 * @param { String } location The location at which to put the data, as dot-notation
 * @param { Any } data
 */
exports.insert = (target, location, data) => {
  if (location.length === 0) throw new Error('Invalid location')

  if (typeof location === 'string') {
    location = location.split('.')
  }

  /**
   * If the correct location is reached,
   * insert the data and return
   */
  if (location.length === 1) {
    target[location[0]] = data
    return
  }

  const current = location[0]
  if (!target[current] ||
      typeof target[current] !== 'object') target[current] = {}

  /**
   * Remove the current location and run
   * the function again, one level lower
   */
  location.splice(0, 1)
  exports.insert(target[current], location, data)
}
