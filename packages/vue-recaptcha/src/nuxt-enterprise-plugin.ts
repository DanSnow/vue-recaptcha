import type { App } from 'vue'
import { getEnterpriseRecaptcha } from './utils'
import { unheadScriptLoader } from './script-manager/unhead'
import { createPlugin } from './plugin'

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
        getRecaptcha: getEnterpriseRecaptcha,
      },
    ]),
    recaptcha,
  )
})
