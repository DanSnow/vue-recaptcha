const defer = () => {
  let state = false // Resolved or not
  let value
  const callbacks = []
  const resolve = (val) => {
    if (state) {
      return
    }

    state = true
    value = val
    callbacks.forEach((cb) => {
      cb(val)
    })
  }

  const then = (cb) => {
    if (!state) {
      callbacks.push(cb)
      return
    }
    cb(value)
  }

  const deferred = {
    resolved () {
      return state
    },
    resolve,
    promise: {
      then
    }
  }
  return deferred
}

export default defer
