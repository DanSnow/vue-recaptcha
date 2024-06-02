import { warn as vueWarn } from 'vue-demi'

export function warn(msg: string, ...params: unknown[]) {
  vueWarn(`[vue-recaptcha]: ${msg}`, ...params)
}

export function invariant(condition: unknown, msg: string): asserts condition {
  if (!condition) {
    warn(msg)
    throw new Error(`Invariant violation: ${msg}`)
  }
}

export function getRecaptcha() {
  return window.grecaptcha
}

export function getEnterpriseRecaptcha() {
  invariant(window.grecaptcha.enterprise, 'Please load enterprise recaptcha script first')
  return window.grecaptcha.enterprise
}
