import { getEnterpriseRecaptcha } from './enterprise-helper'
import { createPlugin } from './plugin'
import { createUnheadRecaptcha } from './script-manager/unhead'

export * from './api'

// plugin
const plugin = createPlugin(createUnheadRecaptcha, { getRecaptcha: getEnterpriseRecaptcha })
export { plugin as default, plugin as VueRecaptchaPlugin }
