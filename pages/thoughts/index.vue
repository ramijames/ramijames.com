<template>
  <PageHeader title="Thoughts" />
  <Thoughts :articles="articles" />
  <PostsExtras />
  <Footer />
</template>

<script setup>

import articles from '~/assets/articles.json'

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
