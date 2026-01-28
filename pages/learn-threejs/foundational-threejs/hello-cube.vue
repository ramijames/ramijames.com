<template>
  
  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>
  
      <PageHeader title="Hello Cube in Three.js" tagline="The bare minimum code needed to get your first Three.js scene up and running." />

      <main class="w-content page-top">
        <section class="content">
          
          <h2>Building our first Three.js scene</h2>

          <p>We're going to step through our first, incredibly boring, Three.js scene. It's just going to be a box. That's it. Nothing fancy. I'm intentionally keeping it dry so that there isn't anything extra that can confuse or distract a new user.</p>

          <p>Don't worry, we'll add some flair to this in the next article. For now, let's focus on understanding how things actually work.</p>

          <h3>Your Hello Cube</h3>

          <p>We'll be doing a few discrete things here.</p>


          <p>First, you'll need a place to render your scene. We'll be drawing directly onto the <code>body</code> tag, so your <code>index.html</code> file will look like this:</p>

          <CodeBlock lang="html" :code='`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Three.js is Rad</title>
  </head>
  <body>
    <canvas id="webgl"></canvas>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`' />

        </section>
      </main>
    </main>
  </section>
  
  
  <Footer />
</template>

<script setup>

// Use the learnthreejs layout for this page
definePageMeta({
  layout: 'learnthreejs'
})

useHead({
  title: 'Learn Three.js'
})

useSeoMeta({
  title: 'Hello Cube in Three.js',
  ogTitle: 'Hello Cube in Three.js',
  description: 'The bare minimum code needed to get your first Three.js scene up and running.',
  ogDescription: 'The bare minimum code needed to get your first Three.js scene up and running.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/thoughts/reactive-grids-in-nuxt',
  twitterTitle: 'Hello Cube in Three.js',
  twitterDescription: 'The bare minimum code needed to get your first Three.js scene up and running.',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>

<style scoped lang="scss">

</style>