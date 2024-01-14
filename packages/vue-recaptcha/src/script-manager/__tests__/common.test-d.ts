import { expectTypeOf, it } from 'vitest'
import { normalizeScriptLoaderOptions } from '../common'

it('scriptLoaderOptionsInput', () => {
  expectTypeOf(normalizeScriptLoaderOptions).toBeCallableWith({ params: { render: 'explicit' } })
})
