import { whenever } from '@vueuse/shared'
import { computed, Ref, watch } from 'vue-demi'
import { WidgetID } from '../script-manager/common'
import { RecaptchaV2OptionsInput, RecaptchaV2State, useChallengeV2 } from './challenge-v2'

interface Emits {
  (event: 'load', widgetID: WidgetID): void
  (event: 'error', error: Error): void
  (event: 'expired', widgetID: WidgetID): void
  (event: 'success', response: string): void
  (event: 'update:widgetId', widgetID: WidgetID): void
  (event: 'update:modelValue', response: string | null): void
}

export interface UseComponentV2Return {
  root: Ref<HTMLElement | null>
  widgetID: Ref<WidgetID | null>
  state: Ref<RecaptchaV2State>
  isError: Ref<boolean>
  isExpired: Ref<boolean>
  isVerified: Ref<boolean>
  reset: () => void
  execute: () => void
}

export function useComponentV2(
  options: RecaptchaV2OptionsInput | undefined,
  modelValue: Ref<string | null | undefined>,
  emit: Emits
) {
  const { root, state, widgetID, onError, onExpired, onVerify, reset, execute } = useChallengeV2({
    options: options || {},
  })

  const isExpired = computed(() => state.value === RecaptchaV2State.Expired)
  const isError = computed(() => state.value === RecaptchaV2State.Error)
  const isVerified = computed(() => state.value === RecaptchaV2State.Verified)

  whenever(widgetID, (id) => {
    emit('load', id)
    emit('update:widgetId', id)
  })

  watch(modelValue, (res, old) => {
    if (!res && old && !isExpired.value) {
      callReset()
    }
  })

  onExpired(() => {
    emit('update:modelValue', null)
    emit('expired', widgetID.value!)
  })

  onError((err) => {
    emit('error', err)
  })

  onVerify((response) => {
    emit('success', response)
    emit('update:modelValue', response)
  })

  return { root, widgetID, state, isError, isExpired, isVerified, reset: callReset, execute }

  function callReset() {
    reset()
    resetState()
  }

  function resetState() {
    emit('update:modelValue', null)
  }
}
