<script setup lang="ts">
import { useRecaptchaContext } from '../composables/context'
import { warn } from '../utils'

const ctx = useRecaptchaContext()

if (ctx.scriptInjected) {
  warn('<RecaptchaScript /> is used multiple time')
} else {
  ctx.scriptInjected = true
  ctx.useScriptProvider()
}
</script>

<template />
