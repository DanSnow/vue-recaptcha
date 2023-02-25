<script setup lang="ts">
import { ref } from 'vue'
import { ChallengeV2, ChallengeV3, Checkbox, RecaptchaScript } from '../src'

const checkboxWidgetID = ref()
const checkboxResponse = ref()
const challengeV2WidgetID = ref()
const challengeV2Response = ref()
const challengeV3Response = ref()
</script>

<template>
  <div>
    <div>
      <h2>Checkbox</h2>
      <Checkbox v-model="checkboxResponse" v-model:widget-id="checkboxWidgetID" />
      <div>widgetID: {{ checkboxWidgetID }}</div>
      <div>response: {{ checkboxResponse }}</div>
    </div>
    <div>
      <h2>Invisible Challenge v2</h2>
      <ChallengeV2 v-model="challengeV2Response" v-model:widget-id="challengeV2WidgetID">
        <button>Submit</button>
      </ChallengeV2>
      <div>widgetID: {{ challengeV2WidgetID }}</div>
      <div>response: {{ challengeV2Response }}</div>
    </div>
    <div>
      <h2>Challenge v3</h2>
      <ChallengeV3 action="submit" v-model="challengeV3Response" v-slot="{ execute }">
        <button>Submit</button>
      </ChallengeV3>
      <div>response: {{ challengeV3Response }}</div>
    </div>
    <RecaptchaScript />
  </div>
</template>
