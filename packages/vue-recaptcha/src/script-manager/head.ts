import { onMounted } from 'vue'
import { defineScriptLoader, toQueryString } from './common'

export const createHeadRecaptcha = defineScriptLoader((options) => {
  return () => {
    onMounted(() => {

      if (document.getElementById('vue-recaptcha'))
        return

      const script = document.createElement('script')
      script.src = `${options.recaptchaApiURL}?${toQueryString(options.params)}`
      script.async = true
      script.defer = true
      script.id = 'vue-recaptcha'
      if (options.nonce) script.nonce = options.nonce

      document.head.append(script)
    })
  }
})
