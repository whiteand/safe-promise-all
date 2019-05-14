const isPromise = promise => {
  const isNotNil = Boolean(promise)
  const hasThen = typeof promise.then === 'function'
  const hasCatch = typeof promise.catch === 'function'
  return Boolean(promise)
    && hasThen
    && hasCatch
}

const populateWithIndexes = (element, index) => ({ element, index })

/**
 * @typedef {{
 *   result: *,
 *   error: *
 * }} Result
 *
 * @param {Promise[]}promises
 * @param {function(Promise[]): Promise} unsafePromiseAll
 * @returns {*} Promise.<Result[]> - that returns array of results of all promises
 */
function safePromiseAll (promises, unsafePromiseAll = promises => Promise.all(promises)) {
  if (!Array.isArray(promises)) {
    throw new TypeError('promises - must be an Promise[]')
  }

  if (typeof unsafePromiseAll !== 'function') {
    throw new TypeError('unsafePromiseAll - must be a function(Promise[]): Promise')
  }

  if (!promises.every(isPromise)) {
    throw new TypeError('promises - must contain only a promises (Promise[])')
  }
  const safePromises = []
  for (const promise of promises) {
    const withThen = promise.then(result => ({ result, error: null }))
    if (!isPromise(withThen)) {
      throw new TypeError('promise.then must return a promise')
    }
    const withCatch = withThen.catch(error => ({ result: null, error }))
    if (!isPromise(withCatch)) {
      throw new TypeError('promise.catch must return a promise')
    }
    safePromises.push(withCatch)
  }
  const res = unsafePromiseAll(safePromises)
  if (!isPromise(res)) {
    throw new TypeError('unsafePromiseAll - must return promise. Must be a function(Promise[]): Promise')
  }
  return res
}

module.exports = promiseAllSafe

