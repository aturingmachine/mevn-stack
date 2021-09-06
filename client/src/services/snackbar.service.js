let listeners = []

export const SnackbarService = {
  on(cb) {
    listeners.push(cb)
  },
  off(cb) {
    const index = listeners.indexOf(cb)
    listeners = [...listeners.slice(0, index), ...listeners.slice(index + 1)]
  },
  proc(options) {
    Object.values(listeners).forEach((cb) => cb(options))
  },
}
