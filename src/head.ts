import { createPlugin } from './plugin'
import { createHeadRecaptcha } from './script-manager/head'

export * from './api'

// plugin
const plugin = createPlugin(createHeadRecaptcha)
export { plugin as default, plugin as VueRecaptchaPlugin }
