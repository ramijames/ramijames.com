<template>
  <section id="PostsExtras">
    <FeaturedThoughts :featured-articles="featuredArticlesPostsExtras" :articles="regularArticlesPostsExtras" />
  </section>
</template>

<script setup>

import articlesData from '~/assets/articles.json'
import FeaturedThoughts from '~/components/FeaturedThoughts.vue'

// Use the two most recent articles (deterministic to avoid SSR/hydration mismatch)
const sortedArticles = [...articlesData].sort((a, b) => new Date(b.date) - new Date(a.date))
const featuredArticlesPostsExtras = sortedArticles.slice(0, 2)
const regularArticlesPostsExtras = sortedArticles.slice(2)

</script>

<style scoped lang="scss">
#PostsExtras {
  width: 100%;
}
</style>