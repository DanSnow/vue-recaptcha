import { MaybeComputedRef, whenever, createEventHook, resolveRef } from '@vueuse/shared'
import { ref } from 'vue-demi'
import {
  RecaptchaV2CheckboxOptions,
  RecaptchaV2InvisibleOptions,
  RecaptchaV2Options,
  WidgetID,
} from '../script-manager/common'
import { useAssertV2SiteKey, useRecaptchaProxy } from './context'

type OmitKeys = 'sitekey' | 'callback' | 'expired-callback' | 'error-callback'

export type RecaptchaV2CheckboxOptionsInput = Omit<RecaptchaV2CheckboxOptions, OmitKeys>
export type RecaptchaV2InvisibleOptionsInput = Omit<RecaptchaV2InvisibleOptions, OmitKeys>
export type RecaptchaV2OptionsInput = Omit<RecaptchaV2Options, OmitKeys>

export interface UseChallengeV2Input {
  root?: MaybeComputedRef<Element | undefined>
  options?: RecaptchaV2OptionsInput
}

export enum RecaptchaV2State {
  Init = 'init',
  Verified = 'verified',
  Expired = 'expired',
  Error = 'error',
}

export function useChallengeV2({ root = ref(), options = {} }: UseChallengeV2Input) {
  const siteKey = useAssertV2SiteKey()
  const widgetID = ref<WidgetID>()
  const proxy = useRecaptchaProxy()
  const verify = createEventHook<string>()
  const expired = createEventHook<void>()
  const error = createEventHook<Error>()
  const rootRef = resolveRef(root)
  const state = ref(RecaptchaV2State.Init)

  whenever(rootRef, async (el) => {
    const id = await proxy.render(el, {
      ...options,
      sitekey: siteKey,
      callback: verify.trigger,
      'expired-callback': expired.trigger,
      'error-callback': error.trigger,
    })
    widgetID.value = id
  })

  verify.on(() => {
    state.value = RecaptchaV2State.Verified
  })

  expired.on(() => {
    state.value = RecaptchaV2State.Expired
  })

  error.on(() => {
    state.value = RecaptchaV2State.Error
  })

  return {
    root: rootRef,
    widgetID,
    execute() {
      if (typeof widgetID.value !== 'undefined') {
        proxy.execute(widgetID.value)
      }
    },
    reset() {
      state.value = RecaptchaV2State.Init
      if (typeof widgetID.value !== 'undefined') {
        proxy.reset(widgetID.value)
      }
    },
    state,
    onVerify: verify.on,
    onExpired: expired.on,
    onError: error.on,
  }
}
