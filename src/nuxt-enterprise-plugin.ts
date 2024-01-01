import type { App } from 'vue'
import { VueRecaptchaPlugin } from './enterprise'

// @ts-expect-error no types
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(({ vueApp }: { vueApp: App }) => {
  const {
    public: { recaptcha },
  } = useRuntimeConfig()
  vueApp.use(VueRecaptchaPlugin, recaptcha)
})
