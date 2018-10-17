module.exports = function promiseAllSafe (promises) {
  const _promiseAll = Promise.all(
    promises.map(
      promise => promise
        .then(result => ({ result, error: null }))
        .catch(error => ({ result: null, error }))
    )
  )
  return _promiseAll
}