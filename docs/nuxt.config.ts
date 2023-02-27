import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  alias: {
    '#recaptcha': resolver.resolve('../src'),
  },
  modules: [['../src/nuxt', { _globalComponent: true }]],
  runtimeConfig: {
    public: {
      recaptcha: {
        v2SiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        v3SiteKey: '6LejC9kZAAAAAFQyq2IjCq0eK4g88GkixXr4_BGs',
      },
    },
  },
})
