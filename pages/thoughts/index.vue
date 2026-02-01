<template>
  <PageHeader title="Thoughts" tagline="On Life, Management, Product & Design, and Development" />
  <Thoughts />
  <Footer />
</template>

<script setup>

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