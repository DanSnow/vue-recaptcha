import { useHead } from '@unhead/vue'
import type { ScriptLoaderOptions } from './common'
import { defineScriptLoader, toQueryString } from './common'

export const unheadScriptLoader = defineScriptLoader((options: ScriptLoaderOptions) => {
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
          src: `${options.recaptchaApiURL}?${toQueryString(options.params)}`,
          async: true,
          defer: true,
          nonce: options.nonce,
        },
      ],
    })
  }
})
