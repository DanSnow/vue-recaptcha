import type {} from 'typed-query-selector'
import { cleanup, render } from '@testing-library/vue'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { createHeadRecaptcha } from '../head'

describe('createHeadRecaptcha', () => {
  afterEach(() => {
    cleanup()
  })

  it('should not add script if element with id "vue-recaptcha" already exists', () => {
    // Setup: Add a script element with id 'vue-recaptcha' to the document
    const existingScript = document.createElement('script')
    existingScript.id = 'vue-recaptcha'
    document.head.appendChild(existingScript)

    render(
      defineComponent(() => {
        createHeadRecaptcha({
          recaptchaApiURL: 'https://example.com/recaptcha',
          params: {
            render: 'explicit',
          },
        })()

        return () => null
      }),
    )

    // Assert: No new script should be added
    const scripts = document.querySelectorAll('script')
    expect(scripts.length).toBe(1)

    // Cleanup
    document.head.removeChild(existingScript)
  })

  it('should add script if element with id "vue-recaptcha" does not exist', () => {
    render(
      defineComponent(() => {
        createHeadRecaptcha({
          recaptchaApiURL: 'https://example.com/recaptcha',
          params: {
            render: 'explicit',
          },
        })()

        return () => null
      }),
    )

    // Assert: A new script should be added
    const script = document.querySelector('script#vue-recaptcha')
    expect(script).not.toBeNull()
    expect(script?.src).toContain('https://example.com/recaptcha')

    // Cleanup
    if (script) document.head.removeChild(script)
  })
})
