<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChallengeV2, ChallengeV3, Checkbox, useRecaptchaProvider } from 'vue-recaptcha'

useRecaptchaProvider()

const checkboxWidgetID = ref()
const checkboxResponse = ref()
const checkboxVerified = computed(() => !!checkboxResponse.value)
const challengeV2WidgetID = ref()
const challengeV2Response = ref()
const challengeV2Verified = computed(() => !!challengeV2Response.value)
const challengeV3Response = ref()
const challengeV3Verified = computed(() => !!challengeV3Response.value)
</script>

<template>
  <div>
    <div id="checkbox">
      <h2>Checkbox</h2>
      <Checkbox v-model="checkboxResponse" v-model:widget-id="checkboxWidgetID" />
      <div>widgetID: {{ checkboxWidgetID }}</div>
      <div>response: {{ checkboxResponse }}</div>
      <div data-testid="checkbox-verify">
        {{ checkboxVerified ? 'verified' : '' }}
      </div>
    </div>
    <div id="invisible">
      <h2>Invisible Challenge v2</h2>
      <ChallengeV2 v-model="challengeV2Response" v-model:widget-id="challengeV2WidgetID">
        <button>Submit</button>
      </ChallengeV2>
      <div>widgetID: {{ challengeV2WidgetID }}</div>
      <div>response: {{ challengeV2Response }}</div>
      <div data-testid="v2-verify">
        {{ challengeV2Verified ? 'verified' : '' }}
      </div>
    </div>
    <div id="v3">
      <h2>Challenge v3</h2>
      <ChallengeV3 v-model="challengeV3Response" action="submit">
        <button>Submit</button>
      </ChallengeV3>
      <div>response: {{ challengeV3Response }}</div>
      <!-- it's not actually verify for v3 -->
      <div data-testid="v3-verify">
        {{ challengeV3Verified ? 'verified' : '' }}
      </div>
    </div>
    <RecaptchaScript />
  </div>
</template>
