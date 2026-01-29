<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Cameras" tagline="Your window into the 3D world" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Understanding Cameras in Three.js</h2>

          <p>A camera in Three.js is your viewport into the scene. Without it, the renderer has no way to know what part of your 3D world to display. Three.js offers several camera types, but the two most common are <strong>PerspectiveCamera</strong> and <strong>OrthographicCamera</strong>.</p>

          <h3>PerspectiveCamera</h3>

          <p>This is the camera you'll use most often. It mimics how human eyes perceive the world - objects farther away appear smaller. This is called <em>perspective projection</em>.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="perspectiveCanvas" class="webgl-canvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// PerspectiveCamera(fov, aspect, near, far)
const camera = new THREE.PerspectiveCamera(
  75,                           // Field of view (degrees)
  sizes.width / sizes.height,   // Aspect ratio
  0.1,                          // Near clipping plane
  100                           // Far clipping plane
);
camera.position.z = 5;
scene.add(camera);`" />

          <p>The key parameters are:</p>
          <ul>
            <li><strong>FOV (Field of View)</strong> - The vertical angle of the camera's view in degrees. Higher values = wider view, more distortion at edges.</li>
            <li><strong>Aspect Ratio</strong> - Width divided by height. Should match your canvas dimensions.</li>
            <li><strong>Near/Far</strong> - Objects closer than <code>near</code> or farther than <code>far</code> won't be rendered.</li>
          </ul>

          <h3>OrthographicCamera</h3>

          <p>An orthographic camera removes perspective distortion entirely. Objects remain the same size regardless of distance. This is useful for 2D games, UI elements, or isometric views.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="orthoCanvas" class="webgl-canvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// OrthographicCamera(left, right, top, bottom, near, far)
const aspectRatio = sizes.width / sizes.height;
const frustumSize = 3;
const camera = new THREE.OrthographicCamera(
  -frustumSize * aspectRatio,   // Left
  frustumSize * aspectRatio,    // Right
  frustumSize,                  // Top
  -frustumSize,                 // Bottom
  0.1,                          // Near
  100                           // Far
);
camera.position.z = 5;
scene.add(camera);`" />

          <p>Notice how in the orthographic view above, the cubes don't get smaller as they move away from the camera - they all appear the same size.</p>

          <h3>Camera Position and LookAt</h3>

          <p>You can position the camera anywhere in 3D space and point it at any target:</p>

          <CodeBlock lang="typescript" :code="`// Position the camera
camera.position.set(3, 2, 5);

// Point the camera at a specific position
camera.lookAt(0, 0, 0);

// Or point at an object
camera.lookAt(mesh.position);`" />

          <p>In the examples above, the camera orbits around the scene so you can see how position affects the view.</p>

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/foundational-threejs/the-scene"
    prevText="The Scene"
    nextLink="/learn-threejs/foundational-threejs/the-renderer"
    nextText="The Renderer"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const perspectiveCanvas = ref(null);
const orthoCanvas = ref(null);
let rendererPerspective = null;
let rendererOrtho = null;
let animationId = null;

onMounted(() => {
  if (!perspectiveCanvas.value || !orthoCanvas.value) return;

  // ===== SCENE ONE: PerspectiveCamera =====
  const scenePerspective = new THREE.Scene();
  scenePerspective.background = new THREE.Color(0x1a1a2e);

  // Create multiple cubes at different depths to show perspective
  const material = new THREE.MeshNormalMaterial();
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const cubes = [];
  for (let i = 0; i < 5; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (i - 2) * 2;
    cube.position.z = (i - 2) * -1;
    scenePerspective.add(cube);
    cubes.push(cube);
  }

  const containerPerspective = perspectiveCanvas.value.parentElement;
  const sizesPerspective = {
    width: containerPerspective.clientWidth,
    height: containerPerspective.clientHeight
  };

  const cameraPerspective = new THREE.PerspectiveCamera(75, sizesPerspective.width / sizesPerspective.height, 0.1, 100);
  cameraPerspective.position.set(0, 2, 8);
  cameraPerspective.lookAt(0, 0, 0);
  scenePerspective.add(cameraPerspective);

  rendererPerspective = new THREE.WebGLRenderer({ canvas: perspectiveCanvas.value, antialias: true });
  rendererPerspective.setSize(sizesPerspective.width, sizesPerspective.height);
  rendererPerspective.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ===== SCENE TWO: OrthographicCamera =====
  const sceneOrtho = new THREE.Scene();
  sceneOrtho.background = new THREE.Color(0x16213e);

  // Create matching cubes for orthographic view
  const cubesOrtho = [];
  for (let i = 0; i < 5; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (i - 2) * 2;
    cube.position.z = (i - 2) * -1;
    sceneOrtho.add(cube);
    cubesOrtho.push(cube);
  }

  const containerOrtho = orthoCanvas.value.parentElement;
  const sizesOrtho = {
    width: containerOrtho.clientWidth,
    height: containerOrtho.clientHeight
  };

  const aspectRatio = sizesOrtho.width / sizesOrtho.height;
  const frustumSize = 5;
  const cameraOrtho = new THREE.OrthographicCamera(
    -frustumSize * aspectRatio,
    frustumSize * aspectRatio,
    frustumSize,
    -frustumSize,
    0.1,
    100
  );
  cameraOrtho.position.set(0, 2, 8);
  cameraOrtho.lookAt(0, 0, 0);
  sceneOrtho.add(cameraOrtho);

  rendererOrtho = new THREE.WebGLRenderer({ canvas: orthoCanvas.value, antialias: true });
  rendererOrtho.setSize(sizesOrtho.width, sizesOrtho.height);
  rendererOrtho.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Resize handler
  const handleResize = () => {
    sizesPerspective.width = containerPerspective.clientWidth;
    sizesPerspective.height = containerPerspective.clientHeight;
    cameraPerspective.aspect = sizesPerspective.width / sizesPerspective.height;
    cameraPerspective.updateProjectionMatrix();
    rendererPerspective.setSize(sizesPerspective.width, sizesPerspective.height);
    rendererPerspective.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    sizesOrtho.width = containerOrtho.clientWidth;
    sizesOrtho.height = containerOrtho.clientHeight;
    const newAspect = sizesOrtho.width / sizesOrtho.height;
    cameraOrtho.left = -frustumSize * newAspect;
    cameraOrtho.right = frustumSize * newAspect;
    cameraOrtho.updateProjectionMatrix();
    rendererOrtho.setSize(sizesOrtho.width, sizesOrtho.height);
    rendererOrtho.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener('resize', handleResize);

  // Animation Loop - orbit cameras around the scenes
  let time = 0;
  const tick = () => {
    time += 0.01;

    // Rotate all cubes
    cubes.forEach(cube => cube.rotation.y += 0.01);
    cubesOrtho.forEach(cube => cube.rotation.y += 0.01);

    // Orbit cameras
    const radius = 8;
    cameraPerspective.position.x = Math.sin(time) * radius;
    cameraPerspective.position.z = Math.cos(time) * radius;
    cameraPerspective.lookAt(0, 0, 0);

    cameraOrtho.position.x = Math.sin(time) * radius;
    cameraOrtho.position.z = Math.cos(time) * radius;
    cameraOrtho.lookAt(0, 0, 0);

    rendererPerspective.render(scenePerspective, cameraPerspective);
    rendererOrtho.render(sceneOrtho, cameraOrtho);

    animationId = window.requestAnimationFrame(tick);
  };

  tick();

  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (animationId) cancelAnimationFrame(animationId);
    if (rendererPerspective) rendererPerspective.dispose();
    if (rendererOrtho) rendererOrtho.dispose();
  });
});

// Use the learnthreejs layout for this page
definePageMeta({
  layout: 'learnthreejs'
})

useHead({
  title: 'Cameras in Three.js'
})

useSeoMeta({
  title: 'Cameras in Three.js',
  ogTitle: 'Cameras in Three.js',
  description: 'Learn how to use PerspectiveCamera and OrthographicCamera in Three.js.',
  ogDescription: 'Learn how to use PerspectiveCamera and OrthographicCamera in Three.js.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/foundational-threejs/cameras',
  twitterTitle: 'Cameras in Three.js',
  twitterDescription: 'Learn how to use PerspectiveCamera and OrthographicCamera in Three.js.',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>

<style scoped lang="scss">
.scene-container {
  width: 100%;
  height: 400px;
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a1a;
}
</style>
