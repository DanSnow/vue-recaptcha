<script lang="ts" setup>
const response = ref()
</script>

<template>
  <div>
    <RecaptchaChallengeV3 v-model="response" action="submit">
      <PrimaryButton>{{ response ? `Get response: ${response.slice(0, 6)}...` : 'click me' }}</PrimaryButton>
    </RecaptchaChallengeV3>
  </div>
</template>
