import { useHead } from '@unhead/vue'
import { RecaptchaParams, toQueryString } from './common'

export function createUnheadRecaptcha(params: RecaptchaParams) {
  return () => {
    useHead({
      script: [
        {
          key: 'vue-recaptcha',
          src: `https://www.google.com/recaptcha/api.js?${toQueryString(params)}`,
          async: true,
          defer: true,
        },
      ],
    })
  }
}
