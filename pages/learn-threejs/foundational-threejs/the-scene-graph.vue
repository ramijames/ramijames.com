<template>
  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>
      <PageHeader title="The Scene Graph" tagline="Organizing your 3D world with Three.js" />

      <main class="w-content page-top">
        <section class="content">
          <h2>What is the Scene Graph?</h2>
          <p>
            In Three.js, the <code>Scene Graph</code> is a tree-like data structure that manages every object you want to render. 
            Think of it as a family tree or a file directory:
          </p>

          <ul>
            <li><code>The Root:</code> The <code>THREE.Scene</code> is the base of the tree.</li>
            <li><code>Nodes:</code> Every object you add (Meshes, Lights, Groups) is a node.</li>
            <li><code>Inheritance:</code> Every node inherits from <code>Object3D</code>, allowing it to have children.</li>
          </ul>
          
          <p>
            When you move a parent node, the entire "branch" (all its children and grandchildren) moves with it. This is essential for complex objects like a car: if you move the car's body, the wheels must follow.
          </p>

          <CodeBlock lang="typescript" :code="`// A logical Scene Graph structure
const car = new THREE.Group(); // Parent
const body = new THREE.Mesh(bodyGeom, bodyMat);
const wheel1 = new THREE.Mesh(wheelGeom, wheelMat);

car.add(body);
car.add(wheel1); // wheel1 is now a child of car
scene.add(car);  // The car (and its children) are now in the graph`" />

          <p>Every scene that you'll build in Three.js will have some sort of hierarchy saved in the Scene Graph. All of their local and world positions, rotations, and transformations will be based on their parent's, up to the root of the graph.</p>
          
        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/foundational-threejs/the-renderer"
    prevText="The Renderer"
    nextLink="/learn-threejs/foundational-threejs/position-rotation-and-scale"
    nextText="Position, Rotation, and Scale"
  />
  <Footer />
</template>

<script setup>

useHead({
  title: 'The Renderer in Three.js'
})

useSeoMeta({
  title: 'The Scene Graph in Three.js',
  ogTitle: 'The Scene Graph in Three.js',
  description: 'Learn how the WebGLRenderer works and its key options like antialiasing, transparency, and tone mapping.',
  ogDescription: 'Learn how the WebGLRenderer works and its key options like antialiasing, transparency, and tone mapping.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/foundational-threejs/the-renderer',
  twitterTitle: 'The Renderer in Three.js',
  twitterDescription: 'Learn how the WebGLRenderer works and its key options like antialiasing, transparency, and tone mapping.',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})
</script>

<style scoped lang="scss">
.scene-container {
  width: 100%;
  height: 600px;
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a1a;
  position: relative;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
