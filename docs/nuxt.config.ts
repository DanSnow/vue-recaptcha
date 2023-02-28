import { defineNuxtConfig } from 'nuxt/config'
import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  alias: {
    '#recaptcha': resolver.resolve('../src'),
  },
  modules: ['@unocss/nuxt', '@vueuse/nuxt', ['../src/nuxt', { _globalComponent: true }]],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,

    // core options
    shortcuts: [],
    rules: [],
  },
  runtimeConfig: {
    public: {
      recaptcha: {
        v2SiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        v3SiteKey: '6LejC9kZAAAAAFQyq2IjCq0eK4g88GkixXr4_BGs',
      },
    },
  },
})
