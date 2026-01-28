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

          <div class="scene-container">
            <canvas ref="canvasRef" class="webgl-canvas"></canvas>
          </div>

          <p>We'll be doing a few discrete things here.</p>


          <p>First, you'll need a place to render your scene. We'll be drawing directly onto the <code>#webgl</code> tag, so your <code>index.html</code> file will look like this:</p>

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

          <p>Let's update our <code>style.css</code> to match:</p>

          <CodeBlock lang="css" :code="`* {
  margin: 0;
  padding: 0;
}

body, html {
  overflow: hidden; /* Prevent scrolling */
}

#webgl {
  width: 100vw;
  height: 100vh;
  display: block;
}`" />

          <p>Great, now we're ready to render our first scene! We'll be working in the <code>/src/main.ts</code> file that we imported into our <code>index.html</code>.</p>

          <p>Since this is the first time we are encountering a lot of this stuff, I'll be explicit in describing what it does and where you can find out more.</p>

          <h3>Piece by piece</h3>

          <p>You'll start by setting up your scene. <a href="https://threejs.org/docs/#Scene">You have a lot of options here</a>, like what color it is, fog, etc. We are just going to use the most basic defaults for now.</p>

          <CodeBlock lang="typescript" :code="`// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xBBBBBB);`" />

          <p>Next, we are going to define a cube. It is just using the <a href="https://threejs.org/docs/#Mesh">THREE.Mesh object</a>, with the simplest of defaults. The object is instantiated and then we just set the normal material. Then, we add the mesh to the scene.</p>

          <CodeBlock lang="typescript" :code="`// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);
scene.add(mesh);`" />

            <p>We've got some sizes that we want to set, because we always want to be aware of the size of the parent container. In this case, the parent is the entire window as we've set the canvas object to take up all of the screen real estate.</p>

            <CodeBlock lang="typescript" :code="`// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};`" />

            <p>Next, we have to have <a href="https://threejs.org/docs/#Camera">a camera</a>. It's the digital view that we use to gaze into our new scene. Without it, Three.js has no way to peer inside.</p>

            <CodeBlock lang="typescript" :code="`// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);`" />

            <p>Now we get to the <a href="https://threejs.org/docs/#Renderer">Renderer</a>. It's a weird concept, but basically, it's the thing that paints the view onto the camera that you've set up. It is the tool we will use in a moment to combine the scene and the camera. It's the glue.</p>

            <CodeBlock lang="typescript" :code="`// Renderer
const canvas = document.querySelector('#webgl') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));`" />

            <p>Without a way to watch the screen size and update our view when something changes, we are stuck with whatever Three.js got when it first painted everything on to the screen. That's not great. So, we set up a basic listener that checks if anything changes, and updates the camera and rendered if it does.</p>

            <CodeBlock lang="typescript" :code="`// Resize Listener
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});`" />

            <p>Lastly, we build our animation loop. There is a concept here, called the tick, that is worth talking about for a second. In the world of 3D development, the tick function is the heartbeat of your application. Without it, you aren't creating a movie. Instead, you're just taking a single polaroid. That's no good. WebGL renders a single frame and then stops. To create the illusion of motion, we need to redraw the scene dozens of times per second.</p>

            <p>Inside our tick, we are telling it, for each tick that goes by, rotate the cube just a little bit.</p>

            <CodeBlock lang="typescript" :code="`// Animation Loop
const tick = () => {
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();`" />

<p>All together this comes out to:</p>

<CodeBlock lang="typescript" :code="`import * as THREE from 'three';
import './style.css';

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector('#webgl') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Resize Listener
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation Loop
const tick = () => {
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();`" />

        </section>
      </main>
    </main>
  </section>
  
  <LearnThreejsBottomNav
    prevLink="/learn-threejs/foundational-threejs/setting-up-your-dev-environment"
    prevText="A modern dev environment"
    nextLink="/learn-threejs/foundational-threejs/the-scene"
    nextText="The Scene"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const canvasRef = ref(null);
let renderer = null;
let animationId = null;

onMounted(() => {
  if (!canvasRef.value) return;

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xBBBBBB);

  // Object
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
  );
  scene.add(mesh);

  // Get container dimensions
  const container = canvasRef.value.parentElement;
  const sizes = {
    width: container.clientWidth,
    height: container.clientHeight
  };

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
  camera.position.z = 3;
  scene.add(camera);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Resize handler
  const handleResize = () => {
    sizes.width = container.clientWidth;
    sizes.height = container.clientHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener('resize', handleResize);

  // Animation Loop
  const tick = () => {
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    animationId = window.requestAnimationFrame(tick);
  };

  tick();

  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
  });
});

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
.scene-container {
  width: 100%;
  height: 600px;
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a1a;
}

.webgl-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>