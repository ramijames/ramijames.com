<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Common loading errors in Three.js" tagline="How to deal with common loading errors" />

      <main class="w-content page-top">
        <section class="content">

          
          <h2>Arrrgg! Something went wrong</h2>

          <h3>Model appears black</h3>

          <p>The model loaded but renders as a dark silhouette. This almost always means your scene has no lights and no environment map. glTF models use <code>MeshStandardMaterial</code>, which requires light to be visible. Add a directional light, an ambient light, or set <code>scene.environment</code> to an environment map.</p>

          <h3>Model is invisible (too small or too large)</h3>

          <p>The model loaded successfully but you can't see it. It's either microscopic or it's so large the camera is inside it. Log the bounding box to check:</p>

          <CodeBlock lang="typescript" :code="`const box = new THREE.Box3().setFromObject(gltf.scene);
const size = box.getSize(new THREE.Vector3());
console.log('Model size:', size.x, size.y, size.z);
// If size is 0.001 or 10000, scale accordingly`" />

          <h3>Textures look wrong (washed out or too dark)</h3>

          <p>Make sure your renderer has the correct output color space and tone mapping:</p>

          <CodeBlock lang="typescript" :code="`renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;`" />

          <h3>CORS errors when loading from a different domain</h3>

          <p>Browsers block cross-origin requests by default. If your model is hosted on a CDN or different server, the server must include the <code>Access-Control-Allow-Origin</code> header. For development, serve assets from your local dev server's <code>public</code> directory to avoid CORS entirely.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/assets/asset-standards"
    prevText="Asset Standards"
    nextLink="/learn-threejs/assets/traversing-loaded-models"
    nextText="Traversing loaded models"
  />
  <Footer />
</template>

<script setup>

useHead({
  title: 'Using GLTFLoader in Three.js'
})

useSeoMeta({
  title: 'Using GLTFLoader in Three.js',
  ogTitle: 'Using GLTFLoader in Three.js',
  description: 'A practical guide to loading 3D models in Three.js with GLTFLoader — covering loading patterns, traversal, materials, animations, Draco compression, and common problems.',
  ogDescription: 'A practical guide to loading 3D models in Three.js with GLTFLoader — covering loading patterns, traversal, materials, animations, Draco compression, and common problems.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/assets/loading-assets',
  twitterTitle: 'Using GLTFLoader in Three.js',
  twitterDescription: 'A practical guide to loading 3D models in Three.js with GLTFLoader — covering loading patterns, traversal, materials, animations, Draco compression, and common problems.',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>
