import { onMounted } from 'vue'
import type { RecaptchaParams } from './common'
import { defineScriptLoader, toQueryString } from './common'

export const createHeadRecaptcha = defineScriptLoader((params: RecaptchaParams, options) => {
  return () => {
    onMounted(() => {
      const script = document.createElement('script')
      script.src = `${options.recaptchaApiURL}?${toQueryString(params)}`
      script.async = true
      script.defer = true
      if (options.nonce) {
        script.nonce = options.nonce
      }
      document.head.append(script)
    })
  }
})
