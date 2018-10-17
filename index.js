const isPromise = promise => {
  const isNotNil = Boolean(promise)
  const hasThen = typeof promise.then === 'function'
  const hasCatch = typeof promise.catch === 'function'
  return Boolean(promise)
    && hasThen
    && hasCatch
}

class ExtraError extends TypeError {
  constructor (message, extra) {
    super(message)
    this.extra = extra
  }
}

const populateWithIndexes = (element, index) => ({ element, index })

function promiseAllSafe (promises, unsafePromiseAll = promises => Promise.all(promises)) {
  if (!Array.isArray(promises)) {
    throw new TypeError('promises - must be an array')
  }

  if (!promises.every(isPromise)) {
    const explanation = promises
      .map(populateWithIndexes)
      .filter(({ element }) => !isPromise(element))
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

module.exports = promiseAllSafe

