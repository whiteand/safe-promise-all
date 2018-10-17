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

module.exports = function promiseAllSafe (promises, unsafePromiseAll = promises => Promise.all(promises)) {
  if (!Array.isArray(promises)) {
    throw new TypeError('promises - must be an array')
  }

  if (!promises.every(isPromise)) {
    const explanation = promises.map((p, i) => ({
      notPromise: p,
      index: i
    }).filter(({ promise }) => !isPromise(promise)))
    throw new ExtraError('promises - must contain only a promises', { explanation })
  }

  return unsafePromiseAll(
    promises.map(
      promise => promise
        .then(result => ({ result, error: null }))
        .catch(error => ({ result: null, error }))
    )
  )
}