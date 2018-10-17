const isPromise = promise => {
  return promise
    && promise.then === 'function'
    && promise.catch === 'function'
}

class ExtraError extends TypeError {
  constructor (message, extra) {
    super(message)
    this.extra = extra
  }
}

module.exports = function promiseAllSafe (promises) {
  if (!Array.isArray(promises)) {
    throw new ExtraError('Promises - must be an array', { promises })
  }

  if (!promises.every(isPromise)) {
    const notPromises = promises.filter(p => !isPromise(p))
    throw new ExtraError('Promises - must contain only a promises', { argument: promises, notPromises })
  }

  return Promise.all(
    promises.map(
      promise => promise
        .then(result => ({ result, error: null }))
        .catch(error => ({ result: null, error }))
    )
  )
}