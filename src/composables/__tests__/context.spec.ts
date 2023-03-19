import { expect, test } from 'vitest'
import { normalizeOptions } from '../context'

test('normalizeOptions', () => {
  expect(normalizeOptions({ v2SiteKey: 'foo' })).toEqual({
    v2SiteKey: 'foo',
    loaderOptions: {
      params: {
        render: 'explicit',
      },
    },
  })

  expect(normalizeOptions({ v3SiteKey: 'bar' })).toEqual({
    v3SiteKey: 'bar',
    loaderOptions: {
      params: {
        render: 'bar',
      },
    },
  })

  expect(() => normalizeOptions({})).toThrow()
})
