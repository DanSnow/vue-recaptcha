import type { RecaptchaOptionsInput } from './api'
import { addComponent, addImports, addPlugin, createResolver, defineNuxtModule, useLogger, useNuxt } from '@nuxt/kit'

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
  enterprise: boolean
  installPlugin: boolean
  _globalComponent: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-recaptcha',
    configKey: 'recaptcha',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    enterprise: false,
    installPlugin: true,
    _globalComponent: false,
  },
  async setup(opt) {
    const logger = useLogger('vue-recaptcha')
    const nuxt = useNuxt()
    const resolver = createResolver(import.meta.url)
    nuxt.options.build.transpile.push(resolver.resolve('.'), 'vue-recaptcha')

    for (const [name, component] of Object.entries(COMPONENTS)) {
      await addComponent({
        name,
        global: opt._globalComponent,
        filePath: resolver.resolve('.'),
        export: component,
      })
    }

    addImports([
      {
        from: resolver.resolve('.'),
        name: 'useRecaptchaContext',
      },
      {
        from: resolver.resolve('.'),
        name: 'useRecaptchaProxy',
      },
      {
        from: resolver.resolve('.'),
        name: 'useChallengeV2',
      },
      {
        from: resolver.resolve('.'),
        name: 'useChallengeV3',
      },
      {
        from: resolver.resolve('.'),
        name: 'useRecaptchaProvider',
      },
    ])

    if (!opt.installPlugin) {
      if (opt.enterprise) logger.warn('`enterprise` option is ignored when `installPlugin` is false')

      return
    }

    if (opt.enterprise) {
      addPlugin({
        src: resolver.resolve('./nuxt-enterprise-plugin'),
      })
    } else {
      addPlugin({
        src: resolver.resolve('./nuxt-plugin'),
      })
    }
  },
})
