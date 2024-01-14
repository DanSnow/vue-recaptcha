<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    recaptcha: yup.string().required('Please verify you are human'),
  }),
})

const { value: nameValue, errorMessage: nameError } = useField('name')
const { value: recaptchaValue, errorMessage: recaptchaError } = useField<string>('recaptcha')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <form class="flex flex-col gap-2" @submit="onSubmit">
    <div>
      <input v-model="nameValue" class="border border-blue p-1" type="text" placeholder="Your name" />
      <div v-if="nameError" class="text-red">
        {{ nameError }}
      </div>
    </div>
    <div>
      <RecaptchaCheckbox v-model="recaptchaValue" />
      <div v-if="recaptchaError" class="text-red">
        {{ recaptchaError }}
      </div>
    </div>
    <div>
      <PrimaryButton type="submit"> Submit </PrimaryButton>
    </div>
  </form>
</template>
