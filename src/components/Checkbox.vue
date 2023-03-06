<script setup lang="ts">
import { toRef } from 'vue-demi'
import type { WidgetID } from '../script-manager/common'
import { useComponentV2 } from '../composables/component-v2'

const props = withDefaults(
  defineProps<{
    /**
     * what element to render
     */
    as?: string
    /**
     * @ignore
     */
    widgetId?: WidgetID
    /**
     * size for reCAPTCHA checkbox
     */
    size?: 'normal' | 'compact'
    /**
     * theme for reCAPTCHA checkbox
     */
    theme?: 'dark' | 'light'
    tabindex?: string
    /**
     * response of reCAPTCHA
     */
    modelValue?: string | null
  }>(),
  {
    as: 'div',
    size: 'normal',
    theme: 'light',
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

const { root } = useComponentV2(
  {
    theme: props.theme,
    size: props.size,
    tabindex: props.tabindex,
  },
  toRef(props, 'modelValue'),
  emit
)
</script>

<template>
  <component :is="as" ref="root" />
</template>
