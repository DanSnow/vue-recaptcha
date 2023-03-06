<script setup lang="ts">
import mermaid from 'mermaid'
const show = ref(false)

onMounted(async () => {
  show.value = true

  await nextTick()
  mermaid.initialize({ startOnLoad: false })
  mermaid.run({
    querySelector: '.mermaid',
    suppressErrors: false,
  })
})
</script>

<template>
  <pre v-if="show" class="mermaid">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </pre>
</template>
