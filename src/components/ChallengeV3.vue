<script setup lang="ts">
import { whenever } from '@vueuse/shared'
import { reactive } from 'vue-demi'
import { useChallengeV3 } from '../composables/challenge-v3'

const props = withDefaults(
  defineProps<{
    action: string
    as?: string
    autoExecute?: boolean
    modelValue?: string
  }>(),
  {
    as: 'div',
    autoExecute: true,
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', response: string): void
}>()

const { response, execute } = useChallengeV3(props.action)

interface SlotApi {
  /**
   * reCAPTCHA v3 response
   */
  response: string | undefined
  /**
   * execute reCAPTCHA v3 challenge
   */
  execute: () => Promise<string>
}

const slotApi: SlotApi = reactive({
  response,
  execute,
})

whenever(response, (res) => {
  emit('update:modelValue', res)
})

function onClick() {
  if (props.autoExecute) {
    execute()
  }
}
</script>

<template>
  <component :is="as" @click="onClick">
    <slot v-bind="slotApi" />
  </component>
</template>
