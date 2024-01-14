import type { EventHookOn, MaybeRefOrGetter } from '@vueuse/shared'
import { createEventHook, toRef, whenever } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import { ref } from 'vue-demi'
import type { RecaptchaV2CheckboxOptions, RecaptchaV2InvisibleOptions, WidgetID } from '../script-manager/common'
import { useAssertV2SiteKey, useRecaptchaProxy } from './context'

type OmitKeys = 'sitekey' | 'callback' | 'expired-callback' | 'error-callback'

export type RecaptchaV2CheckboxOptionsInput = Omit<RecaptchaV2CheckboxOptions, OmitKeys>
export type RecaptchaV2InvisibleOptionsInput = Omit<RecaptchaV2InvisibleOptions, OmitKeys>
export type RecaptchaV2OptionsInput = RecaptchaV2CheckboxOptionsInput | RecaptchaV2InvisibleOptionsInput

export interface UseChallengeV2Input {
  /**
   * root to mount reCAPTCHA
   */
  root?: MaybeRefOrGetter<Element | undefined>
  /**
   * Option that pass to reCAPTCHA render
   */
  options?: RecaptchaV2OptionsInput
}

export enum RecaptchaV2State {
  Init = 'init',
  Verified = 'verified',
  Expired = 'expired',
  Error = 'error',
}

export interface UseChallengeV2Return {
  /**
   * root element ref to mount reCAPTCHA
   */
  root: Ref<Element | undefined>
  /**
   * reCAPTCHA widget id
   */
  widgetID: Ref<WidgetID | undefined>

  /**
   * state of reCAPTCHA
   */
  state: Ref<RecaptchaV2State>

  /**
   * the verified event
   */
  onVerify: EventHookOn<string>
  /**
   * the expired event
   */
  onExpired: EventHookOn<void>
  /**
   * the error event
   */
  onError: EventHookOn<Error>

  /**
   * execute the challenge
   */
  execute: () => void
  /**
   * reset reCAPTCHA
   */
  reset: () => void
}

export function useChallengeV2({ root = ref(), options = {} }: UseChallengeV2Input): UseChallengeV2Return {
  const siteKey = useAssertV2SiteKey()
  const widgetID = ref<WidgetID>()
  const proxy = useRecaptchaProxy()
  const verify = createEventHook<string>()
  const expired = createEventHook<void>()
  const error = createEventHook<Error>()
  const rootRef = toRef(root)
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
      if (typeof widgetID.value !== 'undefined') proxy.execute(widgetID.value)
    },
    reset() {
      state.value = RecaptchaV2State.Init
      if (typeof widgetID.value !== 'undefined') proxy.reset(widgetID.value)
    },
    state,
    onVerify: verify.on,
    onExpired: expired.on,
    onError: error.on,
  }
}
