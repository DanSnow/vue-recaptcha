<template>
  <div class="flex gap-4 mb-8">
    <div class="w-2/3">
      <Card class="h-full">
        <template #title> Easy to use </template>
        <template #description> Use <code v-pre>&lt;Checkbox /&gt;</code> to render reCAPTCHA checkbox </template>
      </Card>
    </div>

    <div class="w-1/3">
      <ContentSlot :use="$slots.default" />
    </div>
  </div>
</template>
