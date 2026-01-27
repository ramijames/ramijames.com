<template>
  <section id="PostsExtras">
    <FeaturedThoughts :articles="allArticles" />
  </section>
</template>

<script setup>

import articlesData from '~/assets/articles.json'
import FeaturedThoughts from '~/components/FeaturedThoughts.vue'

const allArticles = articlesData

</script>

<style scoped lang="scss">
#PostsExtras {
  width: 100%;
  margin: $spacing-xl 0;
}
</style>