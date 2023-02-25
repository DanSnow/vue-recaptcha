import { useHead } from '@unhead/vue'
import { RecaptchaParams, toQueryString } from './common'

export function createUnheadRecaptcha(params: RecaptchaParams) {
  return () => {
    useHead({
      link: [
        {
          key: 'vue-recaptcha-google',
          rel: 'preconnect',
          href: 'https://www.google.com',
        },
        {
          key: 'vue-recaptcha-gstatic',
          rel: 'preconnect',
          href: 'https://www.gstatic.com',
          crossorigin: '',
        },
      ],
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
