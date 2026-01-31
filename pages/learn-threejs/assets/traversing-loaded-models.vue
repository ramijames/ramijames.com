<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Traversing the Loaded Model" tagline="After you've loaded your model, here's how you work with what's in it" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Traversing the Loaded Model</h2>

          <p>A loaded model is a tree of objects: groups containing groups containing meshes. To access individual parts, you traverse the tree. Three.js provides the <code>traverse</code> method on every <code>Object3D</code>, which visits every descendant recursively.</p>

          <CodeBlock lang="typescript" :code="`loader.load('/models/robot.glb', (gltf) => {
  const model = gltf.scene;

  // Visit every object in the model
  model.traverse((child) => {
    if (child.isMesh) {
      // Enable shadows on all meshes
      child.castShadow = true;
      child.receiveShadow = true;

      // Log the mesh name (set in the 3D tool)
      console.log('Mesh:', child.name);
    }
  });

  scene.add(model);
});`" />

          <p>Object names come from the 3D tool. If a your or your 3d artist named a mesh "Wheel_FL", that's what <code>child.name</code> will be. This is how you find specific parts of a model to manipulate independently:</p>

          <CodeBlock lang="typescript" :code="`// Find a specific part by name
const wheel = model.getObjectByName('Wheel_FL');
if (wheel) {
  wheel.rotation.y = Math.PI / 4;  // turn the wheel
}

// Find all meshes and store them
const meshes = [];
model.traverse((child) => {
  if (child.isMesh) meshes.push(child);
});`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/assets/common-loading-errors"
    prevText="Common loading errors"
    nextLink=""
    nextText=""
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
