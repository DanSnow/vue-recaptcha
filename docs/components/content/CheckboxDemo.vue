<script setup lang="ts">
const theme = ref<'light' | 'dark'>('light')
const response = ref()
</script>

<template>
  <div>
    <ThemeButton v-model="theme" @click="response = ''" />
    <div>{{ response ? 'Verified' : 'Please click the checkbox' }}</div>
    <RecaptchaCheckbox :key="theme" v-model="response" :theme="theme" />
  </div>
</template>
