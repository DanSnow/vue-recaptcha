import { ref } from 'vue-demi'
import { Plugin } from 'vue-demi'
import { normalizeOptions, RecaptchaContextKey, RecaptchaOptionsInput } from './composables/context'
import { createRecaptchaProxy } from './composables/proxy'
import { checkRecaptchaLoad, recaptchaLoaded, ScriptManagerFactory } from './script-manager/common'

export function createPlugin(scriptManagerFactory: ScriptManagerFactory): Plugin<[RecaptchaOptionsInput]> {
  return {
    install(app, options) {
      const isReady = ref(false)

      async function waitLoaded() {
        await recaptchaLoaded.promise
        isReady.value = true
      }

      waitLoaded()
      checkRecaptchaLoad()

      const opt = normalizeOptions(options)

      app.provide(RecaptchaContextKey, {
        isReady,
        scriptInjected: false,
        proxy: createRecaptchaProxy(isReady),
        useScriptProvider: scriptManagerFactory(opt.params),
        options: opt,
      })
    },
  }
}
