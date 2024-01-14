import type { GRecaptcha, NormalizedScriptLoaderFactory } from './script-manager/common'

export interface RecaptchaPlugin {
  scriptLoader?: NormalizedScriptLoaderFactory
  getRecaptcha?: () => GRecaptcha
}
