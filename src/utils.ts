import { isDevelopment } from 'std-env'
import { warn as vueWarn } from 'vue-demi'

export function warn(msg: string, ...params: unknown[]) {
  if (isDevelopment) {
    vueWarn(`[vue-recaptcha]: ${msg}`, ...params)
  }
}

export function invariant(condition: unknown, msg: string): asserts condition {
  if (!condition) {
    warn(msg)
    throw new Error(`Invariant violation: ${msg}`)
  }
}
