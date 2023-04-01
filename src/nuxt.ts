import { addComponent, addImports, addPlugin, createResolver, defineNuxtModule, useNuxt } from '@nuxt/kit'
import type { RecaptchaOptionsInput } from './api'

const COMPONENTS = {
  RecaptchaCheckbox: 'Checkbox',
  RecaptchaChallengeV2: 'ChallengeV2',
  RecaptchaChallengeV3: 'ChallengeV3',
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    recaptcha: RecaptchaOptionsInput
  }
}

export interface ModuleOptions {
  _globalComponent: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-recaptcha',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  async setup(opt) {
    const nuxt = useNuxt()
    const resolver = createResolver(import.meta.url)
    nuxt.options.build.transpile.push(resolver.resolve('.'))

    for (const [name, fileName] of Object.entries(COMPONENTS)) {
      await addComponent({
        name,
        global: opt._globalComponent,
        filePath: resolver.resolve(`./components/${fileName}.vue`),
      })
    }

    addImports([
      {
        from: resolver.resolve('./composables/context'),
        name: 'useRecaptchaContext',
      },
      {
        from: resolver.resolve('./composables/context'),
        name: 'useRecaptchaProxy',
      },
      {
        from: resolver.resolve('./composables/challenge-v2'),
        name: 'useChallengeV2',
      },
      {
        from: resolver.resolve('./composables/challenge-v3'),
        name: 'useChallengeV3',
      },
      {
        from: resolver.resolve('./composables/script-provider'),
        name: 'useRecaptchaProvider',
      },
    ])

    addPlugin({
      src: resolver.resolve('./nuxt-plugin'),
    })
  },
})
