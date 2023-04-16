<script setup lang="ts">
import { RecaptchaV2State } from '#recaptcha'

const map = {
  [RecaptchaV2State.Init]: 'Click to Challenge',
  [RecaptchaV2State.Verified]: 'Verified',
  [RecaptchaV2State.Expired]: 'Expired',
  [RecaptchaV2State.Error]: 'Error',
}

const response = ref()
</script>

<template>
  <RecaptchaChallengeV2 v-slot="{ state }" v-model="response">
    <PrimaryButton>{{ map[state] }}{{ response ? ` ${response.slice(0, 6)}...` : '' }}</PrimaryButton>
  </RecaptchaChallengeV2>
</template>
