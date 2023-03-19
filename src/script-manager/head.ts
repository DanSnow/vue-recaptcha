import { onMounted } from 'vue'
import { defineScriptLoader, toQueryString } from './common'

export const createHeadRecaptcha = defineScriptLoader((options) => {
  return () => {
    onMounted(() => {
      const script = document.createElement('script')
      script.src = `${options.recaptchaApiURL}?${toQueryString(options.params)}`
      script.async = true
      script.defer = true
      if (options.nonce) {
        script.nonce = options.nonce
      }
      document.head.append(script)
    })
  }
})
