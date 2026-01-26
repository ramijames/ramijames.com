<template>
  <div class="bluesky-comments-wrapper" v-if="url">
    <h4>Comments</h4>
    <bluesky-comments :url="url"></bluesky-comments>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  // Dynamically import the bluesky-comments web component
  await import('https://esm.sh/bluesky-comments-tag/load')
})
</script>

<style scoped lang="scss">
.bluesky-comments-wrapper {
  margin-top: $spacing-xl;
  padding-top: $spacing-xl;
  border-top: 1px solid rgba($black, 0.1);

  h4 {
    margin-bottom: $spacing-md;
  }
}

.dark .bluesky-comments-wrapper {
  border-top-color: rgba($white, 0.1);
}
</style>
