import { expectTypeOf, test } from 'vitest'
import { normalizeScriptLoaderOptions } from '../common'

test('ScriptLoaderOptionsInput', () => {
  expectTypeOf(normalizeScriptLoaderOptions).toBeCallableWith({ params: { render: 'explicit' } })
})
