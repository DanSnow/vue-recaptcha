<script setup lang="ts">
import { toRef } from 'vue-demi'
import { RecaptchaV2InvisibleOptionsInput } from '../composables/challenge-v2'
import { WidgetID } from '../script-manager/common'
import { useComponentV2 } from '../composables/component-v2'

const props = withDefaults(
  defineProps<{
    as?: string
    options?: RecaptchaV2InvisibleOptionsInput
    widgetId?: WidgetID
    autoExecute?: boolean
    modelValue?: string | null
  }>(),
  {
    as: 'div',
    autoExecute: true,
    options: () => ({ size: 'invisible' }),
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

const { root, reset, execute, isError, isExpired, isVerified } = useComponentV2(
  { ...props.options, size: 'invisible' },
  toRef(props, 'modelValue'),
  emit
)

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
    <slot
      v-bind="{
        execute,
        widgetId,
        reset,
        isError,
        isExpired,
        isVerified,
      }"
    />
    <div ref="root" />
  </component>
</template>
