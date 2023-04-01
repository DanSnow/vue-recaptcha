import type { GRecaptcha } from './script-manager/common'
import { invariant } from './utils'

export function getEnterpriseRecaptcha(): GRecaptcha {
  invariant(window.grecaptcha.enterprise, 'Please load enterprise recaptcha script first')
  return window.grecaptcha.enterprise
}
