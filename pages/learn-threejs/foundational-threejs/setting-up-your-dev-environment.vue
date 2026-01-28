<template>
  
  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>
  <PageHeader title="Setting up your dev environment to work with Three.js" tagline="It's easy to get started developing with Three.js in a modern way" />

  <main class="w-content page-top">
    <section class="content">

      <h2>A focus on a modern dev environment</h2>

      <p>In principle, you can just drop a script tag into your header that references the three.js library and you're good to go. For simple projects, this can work just fine. Today, you'll have to at least use an importmap, as Three.js is built using modules.</p>

      <CodeBlock :code='`<script type="importmap">
    {
        "imports": {
            "three": "https://unpkg.com/three@0.160.0/build/three.module.js"
        }
    }
</script>

<script type="module">
    import * as THREE from &apos;three&apos;;

    // Your three.js logic
</script>`' />

        <p>But, modern web development doesn't really work that way. We expect all sorts of niceties like hot loading, imports, etc. At the bare minimum, I recommend that you use Vite (pronounced "veet"). It's easy to set up and use for development purposes. When you're ready, it's super straightforward to deploy. Win-win.</p>

        <h3>Setting up Vite</h3>

        <p>You'll need at least Node.js and NPM installed to get started. There are <a href="https://letmegooglethat.com/?q=how+to+install+node.js+and+npm">plenty of resources online</a> for how to do this, so I won't duplicate them here. In all likelihood, if you're interested in building something with Three.js, you already know and use it.</p>

        <p>Open your terminal and run the following commands to create your project:</p>

        <CodeBlock lang="bash" :code="`# Create the project
npm create vite@latest my-three-project -- --template vanilla-ts

# Enter the folder
cd my-three-project

# Install Three.js
npm install three
npm install --save-dev @types/three`" />

        <p>Why TypeScript? Because that's where the industry is these days. I started when JS was the default and it's worth migrating to TS. Just do it.</p>

        <h3>Project Structure and CSS setup</h3>
        
        <p>A clean 3D project usually looks like this:</p>

        <ul>
        <li>index.html: The entry point.</li>
        <li>src/main.ts: Where our Three.js logic lives.</li>
        <li>src/style.css: To make the canvas fill the screen.</li>
        <li>public/: This is where you will put your 3D models (.glb files) and textures.</li>
        </ul>

        <p>You'll need a clean canvas to work on, so your default CSS can be something like:</p>

        <CodeBlock lang="css" :code="`/* Remove default spacing and hide scrollbars */
body {
  margin: 0;
  padding: 0;
  overflow: hidden; 
  background-color: #000; /* A dark background prevents white flashes */
}

/* Make the 3D canvas responsive */
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
}`" />

    <p>Vite uses Hot Module Replacement (HMR). Because 3D scenes can become "heavy" with large models, Vite only replaces the code you changed without refreshing the entire browser tab. This keeps your development "flow" unbroken. To run your new project, just open your terminal at the root of your project and type:</p>

    <CodeBlock lang="bash" :code="`npm run dev`"/>

    <p>Vite will run and drop you a link to your new dev environment. You should be good to go.</p>

    <img src="/public/learn-threejs/vite-running.png" alt="Succesfully running Vite" />

    <p>You can click on the link in your terminal or manually open <a href="http://localhost:5173">http://localhost:5173</a> to get started.</p>

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
  title: 'Setting up your dev environment to work with Three.js'
})

useSeoMeta({
  title: 'Setting up your dev environment to work with Three.js',
  ogTitle: 'Setting up your dev environment to work with Three.js',
  description: 'It is easy to get started developing with Three.js in a modern way',
  ogDescription: 'It is easy to get started developing with Three.js in a modern way',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/thoughts/reactive-grids-in-nuxt',
  twitterTitle: 'Setting up your dev environment to work with Three.js',
  twitterDescription: 'It is easy to get started developing with Three.js in a modern way',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>

<style scoped lang="scss">

</style>