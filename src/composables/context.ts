import type { InjectionKey, Ref } from 'vue-demi'
import { inject } from 'vue-demi'
import type { RecaptchaParams, ScriptLoaderOptionsInput } from '../script-manager/common'
import { invariant, warn } from '../utils'
import type { RecaptchaProxy } from './proxy'

export interface RecaptchaOptionsInput {
  v2SiteKey?: string | undefined
  v3SiteKey?: string | undefined
  loaderOptions?: ScriptLoaderOptionsInput & { params?: RecaptchaParams }
}

export interface RecaptchaOptions {
  v2SiteKey?: string | undefined
  v3SiteKey?: string | undefined
  loaderOptions: ScriptLoaderOptionsInput
}

export interface RecaptchaContext {
  isReady: Ref<boolean>
  proxy: RecaptchaProxy
  scriptInjected: boolean
  useScriptProvider: () => void
  options: RecaptchaOptions
}

export const RecaptchaContextKey: InjectionKey<RecaptchaContext> = Symbol('vue-recaptcha-context')

export function useRecaptchaContext() {
  const context = inject(RecaptchaContextKey)

  if (!context) {
    warn('You may forget to `use` vue-recaptcha plugin')
    throw new Error('useRecaptcha() is called without provider.')
  }

  return context
}

export function useRecaptchaProxy() {
  const ctx = useRecaptchaContext()
  return ctx.proxy
}

export function useAssertV2SiteKey(): string {
  const ctx = useRecaptchaContext()
  invariant(ctx.options.v2SiteKey, 'Your config is not compatible with recaptcha v2, please provide v2SiteKey')
  return ctx.options.v2SiteKey
}

export function useAssertV3SiteKey(): string {
  const ctx = useRecaptchaContext()
  invariant(ctx.options.v3SiteKey, 'Your config is not compatible with recaptcha v3, please provide v3SiteKey')
  return ctx.options.v3SiteKey
}

export function normalizeOptions(input: RecaptchaOptionsInput): RecaptchaOptions {
  invariant(
    input.v2SiteKey || input.v3SiteKey,
    "You didn't pass v2SiteKey or v3SiteKey to plugin, which may be a mistake"
  )

  return {
    ...input,
    loaderOptions: {
      ...input.loaderOptions,
      params: {
        ...input.loaderOptions?.params,
        render: input.v3SiteKey ?? 'explicit',
      },
    },
  }
}
