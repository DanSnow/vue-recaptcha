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
      const value = 42

      deferred.promise.then(fn)

      expect(fn).not.toBeCalled()
      deferred.resolve(value)
      expect(fn).toBeCalledWith(value)
    })

    it('Wont resolve twice', () => {
      const deferred = defer()
      const fn = jest.fn()
      const value = 42
      const value2 = 24

      deferred.promise.then(fn)

      deferred.resolve(value)
      deferred.resolve(value2)
      expect(fn).toBeCalledWith(value)
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
