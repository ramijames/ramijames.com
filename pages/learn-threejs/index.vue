<template>
  
  <PageHeader title="Learn Three.js Basics" tagline="Want to make cool 3d stuff for the web? This is what you need to know." />

  <main class="w-content page-top">
    <section class="content">

      <img src="/learn-threejs/cover.png" alt="Learn Three.js Cover" />

      <h2>About these notes</h2>

      <p>I've been working with Three.js for a while now and I thought that I'd take the time to share my notes on how things work under the hood. This isn't fully comprehensive, but will get you well on your way to building fun things that are both useful and visually appealing. If you find errors, missing content, or have ideas for how to improve this, <a href="mailto:ramijames@gmail.com">please reach out to me</a>.</p>

      <h3>
        Foundational Three.js
      </h3>

      <ol type="I">
        <li>The 3D Web Revolution</li>
          <ol type="I">
            <li><nuxt-link to="/learn-threejs/foundational-threejs/why-threejs">Why Three.js? (WebGL vs. WebGPU)</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/foundational-threejs/setting-up-your-dev-environment">Setting up the modern development environment</nuxt-link></li>
            <li>Your first "Hello Cube": The bare minimum code to see results</li>
          </ol>
        <li>The Core Trinity (Scene, Camera, Renderer)</li>
          <ol type="I">
            <li>The Scene: Your 3D stage.</li>
            <li>Cameras: Perspective vs. Orthographic (when to use which).</li>
            <li>The Renderer: Connecting the virtual world to the DOM.</li>
          </ol>
        <li>The Scene Graph & Transformations</li>
          <ol type="I">
            <li>Understanding the parent-child relationship.</li>
            <li>Position, Rotation, and Scale.</li>
            <li>The Animation Loop: requestAnimationFrame and delta time.</li>
          </ol>
      </ol>

      <h3>
        The Building Blocks
      </h3>

      <ol type="I">
        <li>Geometry – The Shape of Things</li>
          <ol type="I">
            <li>BufferGeometry: Why performance matters.</li>
            <li>Standard primitives (Box, Sphere, Torus).</li>
            <li>Introduction to custom geometries and vertices.</li>
          </ol>
        <li>Materials & Textures</li>
          <ol type="I">
            <li>The spectrum of materials: MeshBasicMaterial to MeshPhysicalMaterial.</li>
            <li>PBR (Physically Based Rendering): Making things look real.</li>
            <li>Mapping: Color, Roughness, Metalness, and Normal maps.</li>
          </ol>
        <li>Lighting the Scene</li>
          <ol type="I">
            <li>Ambient, Directional, Point, and Spotlights.</li>
            <li>Shadows: The performance cost and how to optimize them.</li>
            <li>Environment Maps (HDRI) for realistic reflections.</li>
          </ol>
      </ol>

      <h3>Working with Assets</h3>
        <ol type="I">
          <li>Loading 3D Models</li>
            <ol type="I">
              <li>The industry standard: glTF / GLB.</li>
              <li>Using GLTFLoader and handling asynchronous loading.</li>
              <li>Traversing a loaded model to swap materials or find meshes.</li>
            </ol>
        </ol>

      <h3>Interaction & Raycasting</h3>
        <ol type="I">
          <li>The "Mouse Pick": How to click on 3D objects.</li>
          <li>Handling hover states and UI overlays.</li>
          <li>Basic 3D physics integrations (introduction to Rapier or Cannon.js).</li>
        </ol>

      <h3>Advanced Visuals</h3>
        <ol type="I">
          <li>Shaders – The Secret Sauce</li>
            <ol type="I">
              <li>Introduction to GLSL (Vertex and Fragment shaders).</li>
              <li>ShaderMaterial vs. RawShaderMaterial.</li>
              <li>Creating custom patterns and procedural animations.</li>
            </ol>
          <li>Particles & Post-Processing</li>
            <ol type="I">
              <li>Massive scale: Using Points for stars, rain, and fire.</li>
              <li>EffectComposer: Adding Bloom, Depth of Field, and Film Grain.</li>
            </ol>
          <li>Performance & Optimization</li>
            <ol type="I">
              <li>Monitoring performance (Stats.js).</li>
              <li>Draw calls, InstancedMesh, and Texture compression.</li>
              <li>Disposing of geometries and materials to prevent memory leaks.</li>
            </ol>
        </ol>

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