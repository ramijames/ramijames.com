<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="The Animation Loop" tagline="Bringing your scene to life frame by frame" />

      <main class="w-content page-top">
        <section class="content">

          <h2>How Animation Works in Three.js</h2>

          <p>To create animation, you need to render your scene many times per second. Typically we're talking about 60 frames per second (60 FPS). Each frame, you update your objects slightly, then render. The browser provides <code>requestAnimationFrame</code> to make this smooth and efficient.</p>

          <h3>The Basic Animation Loop</h3>

          <p>Here's the simplest animation loop structure that I can think of:</p>

          <CodeBlock lang="typescript" :code="`// The tick function runs every frame
function tick() {
  // Update objects
  mesh.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);

  // Call tick again on the next frame
  requestAnimationFrame(tick);
}

// Start the loop
tick();`" />

          <p><code>requestAnimationFrame</code> is smart. It pauses when the browser tab is hidden (to save CPU/GPU), and syncs with your monitor's refresh rate for smooth animation.</p>

          <div class="scene-container">
            <div class="stats" ref="statsRef1">Frame: 0</div>
            <canvas ref="basicCanvas"></canvas>
          </div>

          <h3>The problem with fixed increments</h3>

          <p>Adding a fixed amount each frame (like <code>rotation.y += 0.01</code>) has a problem: animation speed depends on frame rate. On a 120Hz monitor, your cube spins twice as fast as on a 60Hz monitor!</p>

          <p>Watch the two cubes below. The left uses a fixed increment, and the right uses <strong>delta time</strong>. They look the same here, but would differ on monitors with different refresh rates:</p>

          <div class="scene-container">
            <canvas ref="deltaCanvas"></canvas>
          </div>

          <h3>Using delta time</h3>

          <p>The solution is to base animation on <strong>elapsed time</strong> and not on frame count. <code>requestAnimationFrame</code> passes a timestamp you can use for this:</p>

          <CodeBlock lang="typescript" :code="`let previousTime = 0;

function tick(currentTime) {
  // Convert to seconds
  currentTime *= 0.001;

  // Calculate time since last frame
  const deltaTime = currentTime - previousTime;
  previousTime = currentTime;

  // Now use deltaTime for consistent speed
  // This rotates ~1 radian per second regardless of frame rate
  mesh.rotation.y += 1 * deltaTime;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);`" />

          <h3>THREE.Clock</h3>

          <p>Three.js provides a <code>Clock</code> class that handles timing for you:</p>

          <CodeBlock lang="typescript" :code="`const clock = new THREE.Clock();

function tick() {
  // Get time since clock started
  const elapsedTime = clock.getElapsedTime();

  // Get time since last tick
  const deltaTime = clock.getDelta();

  // Use elapsed time for smooth oscillation
  mesh.position.y = Math.sin(elapsedTime);

  // Use delta time for consistent rotation speed
  mesh.rotation.y += 2 * deltaTime; // 2 radians per second

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();`" />

          <div class="scene-container">
            <div class="stats" ref="statsRef2">Elapsed: 0.00s</div>
            <canvas ref="clockCanvas"></canvas>
          </div>

          <h3>Pausing and resuming</h3>

          <p>You might want to pause animation when the user switches tabs or clicks a pause button:</p>

          <div class="scene-container">
            <div class="controls">
              <button ref="pauseBtn" @click="togglePause">Pause</button>
            </div>
            <canvas ref="pauseCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`let animationId = null;
let isPaused = false;

function tick() {
  if (isPaused) return;

  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(tick);
}

function pause() {
  isPaused = true;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function resume() {
  if (!isPaused) return;
  isPaused = false;
  tick();
}

// Start
tick();`" />

          <h3>Using setAnimationLoop</h3>

          <p>The renderer has a built-in <code>setAnimationLoop</code> method. This is especially useful for WebXR (VR/AR) since it uses the correct timing for headsets:</p>

          <CodeBlock lang="typescript" :code="`// Set up the animation loop
renderer.setAnimationLoop((time) => {
  // time is in milliseconds
  mesh.rotation.y = time * 0.001;
  renderer.render(scene, camera);
});

// To stop the loop
renderer.setAnimationLoop(null);`" />

          <h3>Performance Tips</h3>

          <p>Your animation loop runs 60+ times per second, so try to keep it lean:</p>

          <CodeBlock lang="typescript" :code="`// BAD - Creating objects every frame
function tick() {
  const newVector = new THREE.Vector3(1, 2, 3); // Garbage collection!
  mesh.position.copy(newVector);
}

// GOOD - Reuse objects
const tempVector = new THREE.Vector3();
function tick() {
  tempVector.set(1, 2, 3);
  mesh.position.copy(tempVector);
}

// BAD - Heavy computation every frame
function tick() {
  const result = expensiveCalculation(); // Slow!
}

// GOOD - Only compute when needed
let cachedResult = expensiveCalculation();
function tick() {
  // Use cachedResult
}

// Recalculate only when necessary
function onDataChange() {
  cachedResult = expensiveCalculation();
}`" />

          <h3>Cleanup</h3>

          <p>Always clean up when your component unmounts to prevent memory leaks:</p>

          <CodeBlock lang="typescript" :code="`// Store the animation ID
let animationId = null;

function tick() {
  // ... animation code
  animationId = requestAnimationFrame(tick);
}

// When component unmounts
function cleanup() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  renderer.dispose();
  // Also dispose geometries, materials, textures...
}`" />

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/foundational-threejs/position-rotation-and-scale"
    prevText="Position, Rotation, Scale"
    nextLink="/learn-threejs/building-blocks/buffer-geometry"
    nextText="Buffer Geometry"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const basicCanvas = ref(null);
const deltaCanvas = ref(null);
const clockCanvas = ref(null);
const pauseCanvas = ref(null);
const statsRef1 = ref(null);
const statsRef2 = ref(null);
const pauseBtn = ref(null);

let renderers = [];
let animationId = null;
let isPaused = false;

const togglePause = () => {
  isPaused = !isPaused;
  if (pauseBtn.value) {
    pauseBtn.value.textContent = isPaused ? 'Resume' : 'Pause';
  }
};

onMounted(() => {
  if (!basicCanvas.value || !deltaCanvas.value || !clockCanvas.value || !pauseCanvas.value) return;

  const animations = [];

  // ===== SCENE 1: Basic Animation Loop =====
  const scene1 = new THREE.Scene();
  scene1.background = new THREE.Color(0x1a1a2e);

  const mat1 = new THREE.MeshNormalMaterial();
  const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat1);
  scene1.add(cube1);

  const container1 = basicCanvas.value.parentElement;
  const sizes1 = { width: container1.clientWidth, height: container1.clientHeight };

  const camera1 = new THREE.PerspectiveCamera(75, sizes1.width / sizes1.height, 0.1, 100);
  camera1.position.set(0, 1, 3);
  camera1.lookAt(0, 0, 0);

  const renderer1 = new THREE.WebGLRenderer({ canvas: basicCanvas.value, antialias: true });
  renderer1.setSize(sizes1.width, sizes1.height);
  renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer1);

  let frameCount = 0;
  animations.push(() => {
    frameCount++;
    cube1.rotation.y += 0.01;
    cube1.rotation.x += 0.005;
    if (statsRef1.value) {
      statsRef1.value.textContent = `Frame: ${frameCount}`;
    }
    renderer1.render(scene1, camera1);
  });

  // ===== SCENE 2: Delta Time Comparison =====
  const scene2 = new THREE.Scene();
  scene2.background = new THREE.Color(0x16213e);

  const mat2 = new THREE.MeshNormalMaterial();

  // Left cube - fixed increment
  const cubeFixed = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), mat2);
  cubeFixed.position.x = -1.5;
  scene2.add(cubeFixed);

  // Right cube - delta time based
  const cubeDelta = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), mat2);
  cubeDelta.position.x = 1.5;
  scene2.add(cubeDelta);

  // Labels (using simple cubes as markers for now)
  const labelMatLeft = new THREE.MeshBasicMaterial({ color: 0xff6b6b });
  const labelLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), labelMatLeft);
  labelLeft.position.set(-1.5, 1.2, 0);
  scene2.add(labelLeft);

  const labelMatRight = new THREE.MeshBasicMaterial({ color: 0x4ecdc4 });
  const labelRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), labelMatRight);
  labelRight.position.set(1.5, 1.2, 0);
  scene2.add(labelRight);

  const container2 = deltaCanvas.value.parentElement;
  const sizes2 = { width: container2.clientWidth, height: container2.clientHeight };

  const camera2 = new THREE.PerspectiveCamera(75, sizes2.width / sizes2.height, 0.1, 100);
  camera2.position.set(0, 1, 4);
  camera2.lookAt(0, 0, 0);

  const renderer2 = new THREE.WebGLRenderer({ canvas: deltaCanvas.value, antialias: true });
  renderer2.setSize(sizes2.width, sizes2.height);
  renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer2);

  const clock2 = new THREE.Clock();
  animations.push(() => {
    const delta = clock2.getDelta();

    // Fixed increment (frame-rate dependent)
    cubeFixed.rotation.y += 0.02;

    // Delta time (frame-rate independent) - 2 radians per second
    cubeDelta.rotation.y += 2 * delta;

    renderer2.render(scene2, camera2);
  });

  // ===== SCENE 3: Clock Demo =====
  const scene3 = new THREE.Scene();
  scene3.background = new THREE.Color(0x1e3a5f);

  const mat3 = new THREE.MeshNormalMaterial();
  const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat3);
  scene3.add(cube3);

  // Add a sphere that orbits
  const sphereMat = new THREE.MeshNormalMaterial();
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), sphereMat);
  scene3.add(sphere);

  const container3 = clockCanvas.value.parentElement;
  const sizes3 = { width: container3.clientWidth, height: container3.clientHeight };

  const camera3 = new THREE.PerspectiveCamera(75, sizes3.width / sizes3.height, 0.1, 100);
  camera3.position.set(0, 2, 4);
  camera3.lookAt(0, 0, 0);

  const renderer3 = new THREE.WebGLRenderer({ canvas: clockCanvas.value, antialias: true });
  renderer3.setSize(sizes3.width, sizes3.height);
  renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer3);

  const clock3 = new THREE.Clock();
  animations.push(() => {
    const elapsed = clock3.getElapsedTime();

    // Use elapsed time for oscillation and orbiting
    cube3.rotation.y = elapsed;
    cube3.position.y = Math.sin(elapsed * 2) * 0.3;

    // Sphere orbits the cube
    sphere.position.x = Math.cos(elapsed) * 2;
    sphere.position.z = Math.sin(elapsed) * 2;

    if (statsRef2.value) {
      statsRef2.value.textContent = `Elapsed: ${elapsed.toFixed(2)}s`;
    }

    renderer3.render(scene3, camera3);
  });

  // ===== SCENE 4: Pause/Resume Demo =====
  const scene4 = new THREE.Scene();
  scene4.background = new THREE.Color(0x0d1b2a);

  const mat4 = new THREE.MeshNormalMaterial();
  const cube4 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat4);
  scene4.add(cube4);

  const container4 = pauseCanvas.value.parentElement;
  const sizes4 = { width: container4.clientWidth, height: container4.clientHeight };

  const camera4 = new THREE.PerspectiveCamera(75, sizes4.width / sizes4.height, 0.1, 100);
  camera4.position.set(0, 1, 3);
  camera4.lookAt(0, 0, 0);

  const renderer4 = new THREE.WebGLRenderer({ canvas: pauseCanvas.value, antialias: true });
  renderer4.setSize(sizes4.width, sizes4.height);
  renderer4.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer4);

  animations.push(() => {
    if (!isPaused) {
      cube4.rotation.y += 0.02;
      cube4.rotation.x += 0.01;
    }
    renderer4.render(scene4, camera4);
  });

  // Resize handler
  const handleResize = () => {
    [
      { container: container1, camera: camera1, renderer: renderer1, sizes: sizes1 },
      { container: container2, camera: camera2, renderer: renderer2, sizes: sizes2 },
      { container: container3, camera: camera3, renderer: renderer3, sizes: sizes3 },
      { container: container4, camera: camera4, renderer: renderer4, sizes: sizes4 }
    ].forEach(({ container, camera, renderer, sizes }) => {
      sizes.width = container.clientWidth;
      sizes.height = container.clientHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });
  };

  window.addEventListener('resize', handleResize);

  // Animation loop
  const tick = () => {
    animations.forEach(fn => fn());
    animationId = window.requestAnimationFrame(tick);
  };

  tick();

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (animationId) cancelAnimationFrame(animationId);
    renderers.forEach(r => r.dispose());
  });
});

definePageMeta({
  layout: 'learnthreejs'
})

useHead({
  title: 'The Animation Loop in Three.js'
})

useSeoMeta({
  title: 'The Animation Loop in Three.js',
  ogTitle: 'The Animation Loop in Three.js',
  description: 'Learn how to create smooth animations in Three.js using requestAnimationFrame, delta time, and THREE.Clock.',
  ogDescription: 'Learn how to create smooth animations in Three.js using requestAnimationFrame, delta time, and THREE.Clock.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/foundational-threejs/the-animation-loop',
  twitterTitle: 'The Animation Loop in Three.js',
  twitterDescription: 'Learn how to create smooth animations in Three.js using requestAnimationFrame, delta time, and THREE.Clock.',
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
  position: relative;

  canvas {
    width: 100%;
    height: 100%;
  }

  .stats {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: #4ecdc4;
    padding: 8px 12px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
    z-index: 1;
  }

  .controls {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;

    button {
      background: #4ecdc4;
      color: #0d1b2a;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #45b7aa;
      }
    }
  }
}
</style>
