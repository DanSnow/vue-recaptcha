<script setup lang="ts">
import { RecaptchaV2CheckboxOptionsInput } from '../composables/challenge-v2'
import { WidgetID } from '../script-manager/common'
import { useComponentV2 } from '../composables/component-v2'
import { toRef } from 'vue-demi'

const props = withDefaults(
  defineProps<{
    as?: string
    options?: RecaptchaV2CheckboxOptionsInput
    widgetId?: WidgetID
    modelValue?: string | null
  }>(),
  {
    as: 'div',
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

const { root } = useComponentV2(props.options, toRef(props, 'modelValue'), emit)
</script>

<template>
  <component :is="as" ref="root" />
</template>
