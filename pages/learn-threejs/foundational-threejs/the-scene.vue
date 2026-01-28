<template>
  
  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="The Three.js Scene Object" tagline="What exactly is the scene object and how does it work?" />

      <main class="w-content page-top">
        <section class="content">

          <h2>A closer look at the Scene</h2>

          <p>We kind of glossed over the scene object in the last section, and I wanted to take a moment to really understand what it is and what options it presents us. As always, your best bet is to go directly to the <a href="https://threejs.org/docs/#Scene">Three.js docs section on the scene object</a>, but I'll cover a few of them here and how to use them.</p>

          <p>You can think of your scene as the backdrop or background that you'll be building in front of. It will set the tone for what you're building. Here's our cube from the previous section, with it's background set to <code>0xBBBBBB</code>, a medium gray color.</p>

          <div class="scene-container">
            <canvas ref="canvasRef" class="webgl-canvas"></canvas>
          </div>

          <p>But, what if we want to spice this up a bit? We can set the background to another color, or even a gradient. We can add fog to give it some depth and atmosphere.</p>

          <CodeBlock lang="typescript" :code="`// Scene with gradient background and fog
const scene = new THREE.Scene();

// Create gradient background using canvas
const gradientCanvas = document.createElement('canvas');
gradientCanvas.width = 2;
gradientCanvas.height = 512;
const ctx = gradientCanvas.getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 512);
gradient.addColorStop(0, '#1a1a2e');
gradient.addColorStop(1, '#ff9900');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 2, 512);

const gradientTexture = new THREE.CanvasTexture(gradientCanvas);
scene.background = gradientTexture;

// Add fog (color, near, far)
scene.fog = new THREE.Fog(0xff9900, 0.5, 6);

// MeshStandardMaterial responds to fog (unlike MeshNormalMaterial)
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x6699ff })
);
scene.add(mesh);

// MeshStandardMaterial needs lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 2);
scene.add(ambientLight);
scene.add(directionalLight);`" />

          <div class="scene-container">
            <canvas ref="canvasRefTwo" class="webgl-canvas-two"></canvas>
          </div>

          <p>As you can see, with a little tweaking, you can add a lot of pizazz to your Three.js scene without much hassle.</p>

          <p>Don't worry too much about the stuff that you don't yet understand here. We'll be covering things like Textures, Materials, and Lighting in later sections.</p>

          <p>What's important, for now, is that you have some grounding in what a scene is, and what it is used for. <strong>It's your empty stage that you populate with actors</strong>.</p>

    </section>
      </main>
    </main>
  </section>
  
  <LearnThreejsBottomNav
    prevLink="/learn-threejs/foundational-threejs/hello-cube"
    prevText="Hello Cube"
    nextLink="/learn-threejs/foundational-threejs/cameras"
    nextText="Cameras"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const canvasRef = ref(null);
const canvasRefTwo = ref(null);
let renderer = null;
let rendererTwo = null;
let animationId = null;

onMounted(() => {
  if (!canvasRef.value || !canvasRefTwo.value) return;

  // ===== SCENE ONE: Solid color background =====
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xBBBBBB);

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
  );
  scene.add(mesh);

  const container = canvasRef.value.parentElement;
  const sizes = {
    width: container.clientWidth,
    height: container.clientHeight
  };

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
  camera.position.z = 3;
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ===== SCENE TWO: Gradient background =====
  const sceneTwo = new THREE.Scene();
  

  // Create gradient background using canvas
  const gradientCanvas = document.createElement('canvas');
  gradientCanvas.width = 2;
  gradientCanvas.height = 512;
  const ctx = gradientCanvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 512);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#ff9900');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 2, 512);

  const gradientTexture = new THREE.CanvasTexture(gradientCanvas);
  sceneTwo.background = gradientTexture;
  sceneTwo.fog = new THREE.Fog(0xff9900, 0.5, 6);

  // Each scene needs its own mesh (objects can only belong to one scene)
  const meshTwo = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x6699ff })
  );
  sceneTwo.add(meshTwo);

  // MeshStandardMaterial needs light to be visible
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 2, 2);
  sceneTwo.add(ambientLight);
  sceneTwo.add(directionalLight);

  const containerTwo = canvasRefTwo.value.parentElement;
  const sizesTwo = {
    width: containerTwo.clientWidth,
    height: containerTwo.clientHeight
  };

  // Each scene needs its own camera
  const cameraTwo = new THREE.PerspectiveCamera(75, sizesTwo.width / sizesTwo.height, 0.1, 100);
  cameraTwo.position.z = 3;
  sceneTwo.add(cameraTwo);

  rendererTwo = new THREE.WebGLRenderer({ canvas: canvasRefTwo.value, antialias: true });
  rendererTwo.setSize(sizesTwo.width, sizesTwo.height);
  rendererTwo.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Resize handler for both scenes
  const handleResize = () => {
    sizes.width = container.clientWidth;
    sizes.height = container.clientHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    sizesTwo.width = containerTwo.clientWidth;
    sizesTwo.height = containerTwo.clientHeight;
    cameraTwo.aspect = sizesTwo.width / sizesTwo.height;
    cameraTwo.updateProjectionMatrix();
    rendererTwo.setSize(sizesTwo.width, sizesTwo.height);
    rendererTwo.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener('resize', handleResize);

  // Animation Loop - renders both scenes
  const tick = () => {
    mesh.rotation.y += 0.01;
    meshTwo.rotation.y += 0.01;

    renderer.render(scene, camera);
    rendererTwo.render(sceneTwo, cameraTwo);

    animationId = window.requestAnimationFrame(tick);
  };

  tick();

  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
    if (rendererTwo) rendererTwo.dispose();
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
  title: 'The Three.js Scene Object',
  ogTitle: 'The Three.js Scene Object',
  description: 'What exactly is the scene object and how does it work?',
  ogDescription: 'What exactly is the scene object and how does it work?',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/thoughts/reactive-grids-in-nuxt',
  twitterTitle: 'The Three.js Scene Object',
  twitterDescription: 'What exactly is the scene object and how does it work?',
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
</style>