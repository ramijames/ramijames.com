<template>
  <PageHeader title="Thoughts" tagline="On Life, Management, Product & Design, and Development" />
  <Thoughts :featured-articles="featuredArticles" :articles="regularArticles" />
  <PostsExtras />
  <Footer />
</template>

<script setup>

import articles from '~/assets/articles.json'

// Get the two latest articles as featured
const featuredArticles = computed(() => articles.slice(0, 2))

// Get remaining articles (excluding the first two)
const regularArticles = computed(() => articles.slice(2))

useHead({
  title: () => `Thoughts`
})

useSeoMeta({
  title: 'Thoughts',
  ogTitle: 'Thoughts',
  description: 'Thoughts on Software, Docs, and DevRel',
  ogDescription: 'Thoughts on Software, Docs, and DevRel',
  url: 'https://www.ramijames.com/thoughts/',
  twitterTitle: 'Thoughts',
  twitterDescription: 'Thoughts on Software, Docs, and DevRel',
  twitterCard: 'summary_large_image',
})

</script>