import { whenever } from '@vueuse/shared'
import { Ref, ref, watch } from 'vue-demi'
import { WidgetID } from '../script-manager/common'
import { RecaptchaV2OptionsInput, useChallengeV2 } from './challenge-v2'

interface Props {
  options?: RecaptchaV2OptionsInput
  modelValue?: string | null
}

interface Emits {
  (event: 'load', widgetID: WidgetID): void
  (event: 'error', error: Error): void
  (event: 'expired', widgetID: WidgetID): void
  (event: 'success', response: string): void
  (event: 'update:widgetId', widgetID: WidgetID): void
  (event: 'update:modelValue', response: string | null): void
}

export function useComponentV2(
  options: RecaptchaV2OptionsInput | undefined,
  modelValue: Ref<string | null | undefined>,
  emit: Emits
) {
  const { root, widgetID, onError, onExpired, onVerify, reset, execute } = useChallengeV2({
    options: options || {},
  })

  const isExpired = ref(false)
  const isError = ref(false)
  const isVerified = ref(false)

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
    resetRefs()
    isExpired.value = true
    emit('update:modelValue', null)
    emit('expired', widgetID.value!)
  })

  onError((err) => {
    resetRefs()
    isError.value = true
    emit('error', err)
  })

  onVerify((response) => {
    resetRefs()
    isVerified.value = true
    emit('success', response)
    emit('update:modelValue', response)
  })

  return { root, widgetID, isError, isExpired, isVerified, reset: callReset, execute }

  function callReset() {
    reset()
    resetState()
  }

  function resetState() {
    emit('update:modelValue', null)
    resetRefs()
  }

  function resetRefs() {
    isError.value = false
    isVerified.value = false
    isExpired.value = false
  }
}
