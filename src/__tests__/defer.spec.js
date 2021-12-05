import defer from '../defer'

describe('defer', () => {
  it('Return defer object', () => {
    const deferred = defer()
    expect(deferred).toMatchSnapshot()
  })

  describe('#resolve', () => {
    it('Resolve with given value', () => {
      const deferred = defer()
      const fn = jest.fn()

      deferred.promise.then(fn)

      expect(fn).not.toBeCalled()
      deferred.resolve()
      expect(fn).toBeCalled()
    })

    it('Wont resolve twice', () => {
      const deferred = defer()
      const fn = jest.fn()

      deferred.promise.then(fn)

      deferred.resolve()
      deferred.resolve()
      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('#resolved', () => {
    it('Return state', () => {
      const deferred = defer()

      expect(deferred.resolved()).toBe(false)
      deferred.resolve()
      expect(deferred.resolved()).toBe(true)
    })
  })
})
