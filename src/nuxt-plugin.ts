// @ts-expect-error no types
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import type { App } from 'vue'
import { VueRecaptchaPlugin } from './index'

export default defineNuxtPlugin(({ vueApp }: { vueApp: App }) => {
  const {
    public: { recaptcha },
  } = useRuntimeConfig()
  vueApp.use(VueRecaptchaPlugin, recaptcha)
})
