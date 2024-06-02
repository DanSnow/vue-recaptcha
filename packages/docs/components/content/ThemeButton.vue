<script setup lang="ts">
const props = defineProps<{
  modelValue: 'light' | 'dark'
}>()

defineEmits<{
  (event: 'update:modelValue', theme: 'light' | 'dark'): void
}>()

const theme = useVModel(props)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <button rounded px-2 py-1 bg-gray-200 text-black @click="toggleTheme">
    <Icon :name="theme === 'light' ? 'heroicons:sun' : 'heroicons:moon'" size="1.2rem" /> Toggle theme: {{ theme }}
  </button>
</template>
