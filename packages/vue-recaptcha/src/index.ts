import { createPlugin } from './plugin'

export * from './api'

// plugin
const plugin = createPlugin()
export { plugin as default, plugin as VueRecaptchaPlugin }
