import { useHead } from '@unhead/vue'
import type { RecaptchaParams, ScriptLoaderOptions } from './common'
import { defineScriptLoader, toQueryString } from './common'

export const createUnheadRecaptcha = defineScriptLoader((params: RecaptchaParams, options: ScriptLoaderOptions) => {
  return () => {
    useHead({
      link: [
        {
          key: 'vue-recaptcha-google',
          rel: 'preconnect',
          href: options.useRecaptchaNet ? 'https://www.recaptcha.net' : 'https://www.google.com',
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
          src: `${options.recaptchaApiURL}?${toQueryString(params)}`,
          async: true,
          defer: true,
          nonce: options.nonce,
        },
      ],
    })
  }
})
