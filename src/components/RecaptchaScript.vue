<script setup lang="ts">
import { useRecaptchaContext } from '../composables/context'
const { useScriptProvider } = useRecaptchaContext()

useScriptProvider()
</script>

<template />
