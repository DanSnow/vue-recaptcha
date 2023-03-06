<script setup lang="ts">
import { reactive, toRef } from 'vue-demi'
import type { WidgetID } from '../script-manager/common'
import { useComponentV2 } from '../composables/component-v2'
import type { RecaptchaV2State } from '../api'

const props = withDefaults(
  defineProps<{
    /**
     * render element
     */
    as?: string
    /**
     * @ignore
     */
    widgetId?: WidgetID
    /**
     * badge position to display the site is using reCAPTCHA
     */
    badge?: 'bottomright' | 'bottomleft' | 'inline'
    tabindex?: string
    /**
     * should this component listen to click event and trigger challenge? default is true
     */
    autoExecute?: boolean
    /**
     * reCAPTCHA response
     */
    modelValue?: string | null
  }>(),
  {
    as: 'div',
    autoExecute: true,
    badge: 'bottomright',
  }
)

const emit = defineEmits<{
  (event: 'load', widgetID: WidgetID): void
  (event: 'error', error: Error): void
  (event: 'expired', widgetID: WidgetID): void
  (event: 'success', response: string): void
  (event: 'update:widgetId', widgetID: WidgetID): void
  (event: 'update:modelValue', response: string | null): void
}>()

const { root, reset, widgetID, state, execute, isError, isExpired, isVerified } = useComponentV2(
  {
    size: 'invisible',
    badge: props.badge,
    tabindex: props.tabindex,
  },
  toRef(props, 'modelValue'),
  emit
)

interface SlotApi {
  /**
   * widget id
   */
  widgetId: WidgetID | undefined
  /**
   * reCAPTCHA state
   */
  state: RecaptchaV2State

  isError: boolean
  isExpired: boolean
  isVerified: boolean

  /**
   * reset reCAPTCHA
   */
  reset: () => void
  /**
   * execute challenge
   */
  execute: () => void
}

const slotApi: SlotApi = reactive({
  execute,
  widgetId: widgetID,
  state,
  reset,
  isError,
  isExpired,
  isVerified,
})

function onClick() {
  if (props.autoExecute) {
    execute()
  }
}

defineExpose({
  execute,
  reset,
})
</script>

<template>
  <component :is="as" @click="onClick">
    <slot v-bind="slotApi" />
    <div ref="root" />
  </component>
</template>
