<script lang="ts" setup>
const response = ref()
</script>

<template>
  <div>
    <RecaptchaChallengeV3 action="submit" v-model="response">
      <PrimaryButton>{{ response ? `Get response: ${response.slice(0, 6)}...` : 'click me' }}</PrimaryButton>
    </RecaptchaChallengeV3>
  </div>
</template>
