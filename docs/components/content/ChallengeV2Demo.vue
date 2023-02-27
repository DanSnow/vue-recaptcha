<script setup lang="ts">
import { RecaptchaV2State } from '#recaptcha'
const map = {
  [RecaptchaV2State.Init]: 'Click to Challenge',
  [RecaptchaV2State.Verified]: 'Verified',
  [RecaptchaV2State.Expired]: 'Expired',
  [RecaptchaV2State.Error]: 'Error',
}
</script>

<template>
  <RecaptchaChallengeV2 v-slot="{ state, execute }">
    <button @click="execute">{{ map[state] }}</button>
  </RecaptchaChallengeV2>
</template>
