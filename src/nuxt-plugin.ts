import type { App } from 'vue'
import { VueRecaptchaPlugin } from './index'
// @ts-expect-error no types
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineNuxtPlugin(({ vueApp }: { vueApp: App }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    public: { recaptcha },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  } = useRuntimeConfig()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  vueApp.use(VueRecaptchaPlugin, recaptcha)
})
