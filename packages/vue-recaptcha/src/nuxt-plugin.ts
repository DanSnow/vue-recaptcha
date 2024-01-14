import type { App } from 'vue'
import { createPlugin } from './plugin'
import { unheadScriptLoader } from './script-manager/unhead'

// @ts-expect-error no types
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(({ vueApp }: { vueApp: App }) => {
  const {
    public: { recaptcha },
  } = useRuntimeConfig()
  vueApp.use(
    createPlugin([
      {
        scriptLoader: unheadScriptLoader,
      },
    ]),
    recaptcha,
  )
})
