<template>
  
  <ThreejsThreedarray :height="50" />

  <PageHeader title="Learn Three.js Basics" tagline="Want to make cool 3d stuff for the web? This is what you need to know." />

  <main class="w-content page-top">
    <section class="content">

      <h2>About these notes</h2>

      <p>I've been working with Three.js for a while now and I thought that I'd take the time to share my notes on how things work under the hood. This isn't fully comprehensive, but will get you well on your way to building fun things that are both useful and visually appealing. If you find errors, missing content, or have ideas for how to improve this, <a href="mailto:ramijames@gmail.com">please reach out to me</a>.</p>

      <p>You can think of this as the reference book that I wish that I'd had when I started.</p>

      <LearnThreejsNav :innerNav="false" />

    </section>
  </main>
  <Footer />
</template>

<script setup>

useHead({
  title: 'Learn Three.js Basics'
})

useSeoMeta({
  title: 'Learn Three.js Basics',
  ogTitle: 'Learn Three.js Basics',
  description: 'Want to make cool 3d stuff for the web? This is what you need to know.',
  ogDescription: 'Want to make cool 3d stuff for the web? This is what you need to know.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/thoughts/reactive-grids-in-nuxt',
  twitterTitle: 'Learn Three.js',
  twitterDescription: 'Want to make cool 3d stuff for the web? This is what you need to know.',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>

<style scoped lang="scss">

</style>