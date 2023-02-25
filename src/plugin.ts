import { ref } from 'vue-demi'
import { Plugin } from 'vue-demi'
import { normalizeOptions, RecaptchaContextKey, RecaptchaOptionsInput } from './composables/context'
import { createRecaptchaProxy } from './composables/proxy'
import { checkRecaptchaLoad, recaptchaLoaded } from './script-manager/common'
import { createUnheadRecaptcha } from './script-manager/unhead'

export const plugin: Plugin<[RecaptchaOptionsInput]> = {
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
      useScriptProvider: createUnheadRecaptcha(opt.params),
      options: opt,
    })
  },
}
