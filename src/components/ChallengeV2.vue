<script setup lang="ts">
import { toRef } from 'vue-demi'
import { WidgetID } from '../script-manager/common'
import { useComponentV2 } from '../composables/component-v2'

const props = withDefaults(
  defineProps<{
    as?: string
    widgetId?: WidgetID
    badge?: 'bottomright' | 'bottomleft' | 'inline'
    tabindex?: string
    autoExecute?: boolean
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

const { root, reset, state, execute, isError, isExpired, isVerified } = useComponentV2(
  {
    size: 'invisible',
    badge: props.badge,
    tabindex: props.tabindex,
  },
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
        state,
        reset,
        isError,
        isExpired,
        isVerified,
      }"
    />
    <div ref="root" />
  </component>
</template>
