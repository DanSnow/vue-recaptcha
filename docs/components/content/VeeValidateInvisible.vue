<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { until } from '@vueuse/core'

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
  }),
})

const { value: nameValue, errorMessage: nameError } = useField('name')

const response = ref()

const onSubmit = handleSubmit(async (values) => {
  await until(response).changed()
  console.log({ ...values, response: response.value })
})
</script>

<template>
  <form class="flex flex-col gap-2" @submit="onSubmit">
    <div>
      <input class="border border-blue p-1" type="text" placeholder="Your name" v-model="nameValue" />
      <div class="text-red" v-if="nameError">{{ nameError }}</div>
    </div>
    <div>
      <RecaptchaChallengeV2 v-model="response">
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </RecaptchaChallengeV2>
    </div>
  </form>
</template>
