<script setup lang="ts">
import mermaid from 'mermaid'

onMounted(() => {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'forest',
    flowchart: {
      useMaxWidth: true,
    },
  })
})
</script>
<template>
  <DocsPageLayout>
    <slot />
  </DocsPageLayout>
</template>
