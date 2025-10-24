import type { App } from 'vue'
// @ts-expect-error no types
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { createPlugin } from './plugin'

import { unheadScriptLoader } from './script-manager/unhead'

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
