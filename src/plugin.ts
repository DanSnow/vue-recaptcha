import type { Plugin } from 'vue-demi'
import { ref } from 'vue-demi'
import type { RecaptchaOptionsInput } from './composables/context'
import { RecaptchaContextKey, normalizeOptions } from './composables/context'
import { createRecaptchaProxy } from './composables/proxy'
import type { NormalizedScriptLoaderFactory } from './script-manager/common'
import { checkRecaptchaLoad, recaptchaLoaded } from './script-manager/common'
import { warn } from './utils'

export function createPlugin(scriptLoaderFactory: NormalizedScriptLoaderFactory): Plugin<[RecaptchaOptionsInput]> {
  return {
    install(app, options) {
      const isReady = ref(false)

      async function waitLoaded() {
        await recaptchaLoaded.promise
        isReady.value = true
      }

      waitLoaded().catch((error) => warn('fail to load reCAPTCHA script', error))
      checkRecaptchaLoad()

      const opt = normalizeOptions(options)

      app.provide(RecaptchaContextKey, {
        isReady,
        scriptInjected: false,
        proxy: createRecaptchaProxy(isReady),
        useScriptProvider: scriptLoaderFactory(opt.params, opt.loaderOptions),
        options: opt,
      })
    },
  }
}
