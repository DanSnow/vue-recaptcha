<script setup lang="ts">
import { onMounted } from 'vue-demi'
import { useRecaptchaContext } from '../composables/context'
import { checkRecaptchaLoad } from '../script-manager/common'
import { warn } from '../utils'

const ctx = useRecaptchaContext()

if (ctx.scriptInjected) {
  warn('<RecaptchaScript /> is used multiple time')
} else {
  ctx.scriptInjected = true
  ctx.useScriptProvider()

  onMounted(() => {
    checkRecaptchaLoad()
  })
}
</script>

<template><div /></template>
