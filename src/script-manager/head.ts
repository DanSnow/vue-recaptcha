import { onMounted } from 'vue'
import { RecaptchaParams, toQueryString } from './common'

export function createHeadRecaptcha(params: RecaptchaParams) {
  return () => {
    onMounted(() => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?${toQueryString(params)}`
      script.async = true
      script.defer = true
      document.head.append(script)
    })
  }
}
