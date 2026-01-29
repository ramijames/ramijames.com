<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Procedural Terrain" tagline="Generating landscapes with noise and vertex displacement" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Terrain from Code</h2>

          <p>Procedural terrain is one of the most satisfying things to build in 3D. The idea is simple: start with a flat <code>PlaneGeometry</code>, then displace each vertex's height using a noise function. The noise creates the hills, valleys, and ridges that make it look like real landscape. Since the plane is just a <NuxtLink to="/learn-threejs/building-blocks/buffer-geometry">BufferGeometry</NuxtLink>, we have direct access to every vertex.</p>

          <h3>A Simple Heightmap</h3>

          <p>The most basic terrain uses layered sine and cosine waves to displace vertex heights. This won't look realistic on its own, but it demonstrates the core technique — every terrain generator works the same way, just with better noise.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="basicCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Create a subdivided plane
const geometry = new THREE.PlaneGeometry(10, 10, 128, 128);
geometry.rotateX(-Math.PI / 2); // Lay it flat (XZ plane)

const positions = geometry.attributes.position;

for (let i = 0; i < positions.count; i++) {
  const x = positions.getX(i);
  const z = positions.getZ(i);

  // Simple height function using layered waves
  const height = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 1.5
               + Math.sin(x * 1.2 + z * 0.8) * 0.5;

  positions.setY(i, height);
}

geometry.computeVertexNormals();`" />

          <h3>Value Noise</h3>

          <p>Real terrain uses <strong>coherent noise</strong> — random values that change smoothly. A simple approach is <strong>value noise</strong>: assign random values to a grid, then interpolate between them. Here's a basic 2D implementation:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="noiseCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Simple hash function for repeatable pseudo-random values
function hash(x, y) {
  let n = x * 127.1 + y * 311.7;
  n = Math.sin(n) * 43758.5453;
  return n - Math.floor(n);
}

// Smooth interpolation (smoothstep)
function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

// 2D value noise
function noise2D(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;

  // Smooth the fractional parts
  const sx = smoothstep(fx);
  const sy = smoothstep(fy);

  // Get random values at the four corners
  const n00 = hash(ix, iy);
  const n10 = hash(ix + 1, iy);
  const n01 = hash(ix, iy + 1);
  const n11 = hash(ix + 1, iy + 1);

  // Bilinear interpolation
  const nx0 = n00 + (n10 - n00) * sx;
  const nx1 = n01 + (n11 - n01) * sx;
  return nx0 + (nx1 - nx0) * sy;
}`" />

          <h3>Fractal Brownian Motion (fBm)</h3>

          <p>A single layer of noise looks blobby. Real terrain has detail at every scale — large mountains, medium hills, small rocks. <strong>Fractal Brownian motion</strong> layers multiple octaves of noise at increasing frequency and decreasing amplitude:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="fbmCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`function fbm(x, y, octaves = 6) {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0; // For normalization

  for (let i = 0; i < octaves; i++) {
    value += noise2D(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;

    amplitude *= 0.5;   // Each octave is half as strong
    frequency *= 2.0;   // Each octave is twice as detailed
  }

  return value / maxValue; // Normalize to 0-1
}

// Apply to terrain
for (let i = 0; i < positions.count; i++) {
  const x = positions.getX(i);
  const z = positions.getZ(i);
  positions.setY(i, fbm(x * 0.3, z * 0.3, 6) * 3);
}`" />

          <p>More octaves = more detail but slower computation. For realtime terrain, 4-6 octaves is usually enough.</p>

          <h3>Coloring by Height</h3>

          <p>Flat-colored terrain looks artificial. A common technique is to assign <NuxtLink to="/learn-threejs/building-blocks/buffer-geometry">vertex colors</NuxtLink> based on height — deep blue for water, green for lowlands, brown for mountains, white for snow:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="colorCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Add a color attribute to the geometry
const colors = new Float32Array(positions.count * 3);
const color = new THREE.Color();

for (let i = 0; i < positions.count; i++) {
  const height = positions.getY(i);
  const normalized = (height + 1) / 4; // Map to 0-1 range

  if (normalized < 0.2) {
    color.set(0x2266aa);       // Deep water
  } else if (normalized < 0.3) {
    color.set(0x44aa66);       // Shore / lowland
  } else if (normalized < 0.6) {
    color.set(0x338833);       // Forest
  } else if (normalized < 0.8) {
    color.set(0x886644);       // Mountain rock
  } else {
    color.set(0xeeeeff);       // Snow
  }

  colors[i * 3] = color.r;
  colors[i * 3 + 1] = color.g;
  colors[i * 3 + 2] = color.b;
}

geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.MeshLambertMaterial({
  vertexColors: true
});`" />

          <h3>Animated Terrain</h3>

          <p>Since the position attribute can be updated every frame, you can animate terrain in realtime. Adding a time offset to the noise input creates flowing, wave-like terrain — useful for water surfaces, alien landscapes, or visualizers.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="animCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`function updateTerrain(time) {
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);

    // Offset noise coordinates by time
    const height = fbm(x * 0.3 + time * 0.2, z * 0.3 + time * 0.1, 4) * 2;
    positions.setY(i, height);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
}

// In your animation loop
function tick() {
  const elapsed = clock.getElapsedTime();
  updateTerrain(elapsed);
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}`" />

          <h3>Terrain with Ridged Noise</h3>

          <p>Standard fBm produces rolling hills. For sharper, more dramatic landscapes with ridges and valleys, you can use <strong>ridged noise</strong> — take the absolute value of the noise and invert it, then raise it to a power. The sharp creases where noise crosses zero become mountain ridges.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="ridgedCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`function ridgedNoise(x, y, octaves = 6) {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let weight = 1;

  for (let i = 0; i < octaves; i++) {
    let n = noise2D(x * frequency, y * frequency);

    // Create ridges: abs creates a V shape, 1-abs inverts it to peaks
    n = 1.0 - Math.abs(n * 2 - 1);
    n = n * n; // Sharpen the ridges

    // Weight by previous octave (detail concentrates on ridges)
    n *= weight;
    weight = Math.min(n * 2, 1);

    value += n * amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return value;
}`" />

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/building-blocks/custom-geometries"
    prevText="Custom Geometries"
    nextLink="/learn-threejs/building-blocks/the-spectrum-of-materials"
    nextText="The Spectrum of Materials"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const basicCanvas = ref(null);
const noiseCanvas = ref(null);
const fbmCanvas = ref(null);
const colorCanvas = ref(null);
const animCanvas = ref(null);
const ridgedCanvas = ref(null);

let renderers = [];
let animationId = null;

// ===== Noise utilities =====
function hash(x, y) {
  let n = x * 127.1 + y * 311.7;
  n = Math.sin(n) * 43758.5453;
  return n - Math.floor(n);
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function noise2D(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = smoothstep(fx);
  const sy = smoothstep(fy);

  const n00 = hash(ix, iy);
  const n10 = hash(ix + 1, iy);
  const n01 = hash(ix, iy + 1);
  const n11 = hash(ix + 1, iy + 1);

  const nx0 = n00 + (n10 - n00) * sx;
  const nx1 = n01 + (n11 - n01) * sx;
  return nx0 + (nx1 - nx0) * sy;
}

function fbm(x, y, octaves = 6) {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    value += noise2D(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return value / maxValue;
}

function ridgedFbm(x, y, octaves = 6) {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let weight = 1;

  for (let i = 0; i < octaves; i++) {
    let n = noise2D(x * frequency, y * frequency);
    n = 1.0 - Math.abs(n * 2 - 1);
    n = n * n;
    n *= weight;
    weight = Math.min(n * 2, 1);

    value += n * amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return value;
}

// ===== Helper: apply heightmap to a plane =====
function applyHeightmap(geometry, heightFn) {
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    positions.setY(i, heightFn(x, z));
  }
  geometry.computeVertexNormals();
}

// ===== Helper: apply height-based vertex colors =====
function applyHeightColors(geometry, colorStops) {
  const positions = geometry.attributes.position;
  const colors = new Float32Array(positions.count * 3);
  const color = new THREE.Color();

  // Find height range
  let minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const range = maxY - minY || 1;

  for (let i = 0; i < positions.count; i++) {
    const normalized = (positions.getY(i) - minY) / range;

    // Find the right color stop
    let chosen = colorStops[colorStops.length - 1].color;
    for (let s = 0; s < colorStops.length; s++) {
      if (normalized < colorStops[s].threshold) {
        chosen = colorStops[s].color;
        break;
      }
    }

    color.set(chosen);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

onMounted(() => {
  if (!basicCanvas.value || !noiseCanvas.value || !fbmCanvas.value || !colorCanvas.value || !animCanvas.value || !ridgedCanvas.value) return;

  const animations = [];

  const createScene = (bgColor = 0x1a1a2e) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    return scene;
  };

  const createRendererPair = (canvas) => {
    const container = canvas.parentElement;
    const sizes = { width: container.clientWidth, height: container.clientHeight };

    const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderers.push(renderer);

    return { camera, renderer, container, sizes };
  };

  const addLight = (scene) => {
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(5, 8, 5);
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0x404060, 0.8));
  };

  // ===== SCENE 1: Basic sine/cosine terrain =====
  const scene1 = createScene(0x0d1b2a);
  addLight(scene1);

  const basic = new THREE.PlaneGeometry(10, 10, 128, 128);
  basic.rotateX(-Math.PI / 2);
  applyHeightmap(basic, (x, z) =>
    Math.sin(x * 0.5) * Math.cos(z * 0.5) * 1.5
    + Math.sin(x * 1.2 + z * 0.8) * 0.5
  );

  const basicMat = new THREE.MeshStandardMaterial({
    color: 0x558844,
    flatShading: true
  });
  const basicMesh = new THREE.Mesh(basic, basicMat);
  scene1.add(basicMesh);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(basicCanvas.value);
  cam1.position.set(6, 5, 6);
  cam1.lookAt(0, 0, 0);

  animations.push(() => {
    basicMesh.rotation.y += 0.003;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: Value noise terrain =====
  const scene2 = createScene(0x111a2e);
  addLight(scene2);

  const noiseGeom = new THREE.PlaneGeometry(10, 10, 128, 128);
  noiseGeom.rotateX(-Math.PI / 2);
  applyHeightmap(noiseGeom, (x, z) =>
    noise2D(x * 0.5, z * 0.5) * 3 - 1.5
  );

  const noiseMat = new THREE.MeshStandardMaterial({
    color: 0x668855,
    flatShading: true
  });
  const noiseMesh = new THREE.Mesh(noiseGeom, noiseMat);
  scene2.add(noiseMesh);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(noiseCanvas.value);
  cam2.position.set(6, 5, 6);
  cam2.lookAt(0, 0, 0);

  animations.push(() => {
    noiseMesh.rotation.y += 0.003;
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: fBm terrain =====
  const scene3 = createScene(0x0d1b2a);
  addLight(scene3);

  const fbmGeom = new THREE.PlaneGeometry(10, 10, 128, 128);
  fbmGeom.rotateX(-Math.PI / 2);
  applyHeightmap(fbmGeom, (x, z) =>
    fbm(x * 0.3, z * 0.3, 6) * 3 - 0.5
  );

  const fbmMat = new THREE.MeshStandardMaterial({
    color: 0x778866,
    flatShading: true
  });
  const fbmMesh = new THREE.Mesh(fbmGeom, fbmMat);
  scene3.add(fbmMesh);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(fbmCanvas.value);
  cam3.position.set(6, 5, 6);
  cam3.lookAt(0, 0, 0);

  animations.push(() => {
    fbmMesh.rotation.y += 0.003;
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: Height-colored terrain =====
  const scene4 = createScene(0x0a1520);
  addLight(scene4);

  const colorGeom = new THREE.PlaneGeometry(10, 10, 128, 128);
  colorGeom.rotateX(-Math.PI / 2);
  applyHeightmap(colorGeom, (x, z) =>
    fbm(x * 0.3 + 10, z * 0.3 + 10, 6) * 3.5 - 1.0
  );

  applyHeightColors(colorGeom, [
    { threshold: 0.15, color: 0x1a3a5c },  // Deep water
    { threshold: 0.25, color: 0x2a6a8c },  // Shallow water
    { threshold: 0.3,  color: 0xc2b280 },  // Sand
    { threshold: 0.5,  color: 0x4a8c3f },  // Grass
    { threshold: 0.65, color: 0x2d6b2e },  // Forest
    { threshold: 0.8,  color: 0x7a6b5a },  // Rock
    { threshold: 1.0,  color: 0xe8e8f0 }   // Snow
  ]);

  const colorMat = new THREE.MeshLambertMaterial({
    vertexColors: true
  });
  const colorMesh = new THREE.Mesh(colorGeom, colorMat);
  scene4.add(colorMesh);

  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(colorCanvas.value);
  cam4.position.set(6, 5, 6);
  cam4.lookAt(0, 0, 0);

  animations.push(() => {
    colorMesh.rotation.y += 0.003;
    ren4.render(scene4, cam4);
  });

  // ===== SCENE 5: Animated terrain =====
  const scene5 = createScene(0x0d1520);
  addLight(scene5);

  const animGeom = new THREE.PlaneGeometry(10, 10, 100, 100);
  animGeom.rotateX(-Math.PI / 2);

  const animMat = new THREE.MeshStandardMaterial({
    color: 0x4488aa,
    flatShading: true
  });
  const animMesh = new THREE.Mesh(animGeom, animMat);
  scene5.add(animMesh);

  const { camera: cam5, renderer: ren5, container: con5, sizes: sz5 } = createRendererPair(animCanvas.value);
  cam5.position.set(6, 4, 6);
  cam5.lookAt(0, 0, 0);

  let animTime = 0;
  animations.push(() => {
    animTime += 0.015;
    const positions = animGeom.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      positions.setY(i,
        fbm(x * 0.3 + animTime * 0.3, z * 0.3 + animTime * 0.15, 4) * 2 - 0.5
      );
    }
    positions.needsUpdate = true;
    animGeom.computeVertexNormals();
    animMesh.rotation.y += 0.002;
    ren5.render(scene5, cam5);
  });

  // ===== SCENE 6: Ridged noise terrain =====
  const scene6 = createScene(0x0d1b2a);
  addLight(scene6);

  const ridgedGeom = new THREE.PlaneGeometry(10, 10, 128, 128);
  ridgedGeom.rotateX(-Math.PI / 2);
  applyHeightmap(ridgedGeom, (x, z) =>
    ridgedFbm(x * 0.25 + 5, z * 0.25 + 5, 6) * 2.5 - 0.5
  );

  applyHeightColors(ridgedGeom, [
    { threshold: 0.15, color: 0x2a4a3a },  // Valley floor
    { threshold: 0.35, color: 0x3a6a4a },  // Lower slopes
    { threshold: 0.55, color: 0x6a7a5a },  // Mid slopes
    { threshold: 0.75, color: 0x8a7a6a },  // Upper rock
    { threshold: 1.0,  color: 0xd8d8e8 }   // Peaks / snow
  ]);

  const ridgedMat = new THREE.MeshLambertMaterial({
    vertexColors: true
  });
  const ridgedMesh = new THREE.Mesh(ridgedGeom, ridgedMat);
  scene6.add(ridgedMesh);

  const { camera: cam6, renderer: ren6, container: con6, sizes: sz6 } = createRendererPair(ridgedCanvas.value);
  cam6.position.set(6, 5, 6);
  cam6.lookAt(0, 0, 0);

  animations.push(() => {
    ridgedMesh.rotation.y += 0.003;
    ren6.render(scene6, cam6);
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 },
    { container: con3, camera: cam3, renderer: ren3, sizes: sz3 },
    { container: con4, camera: cam4, renderer: ren4, sizes: sz4 },
    { container: con5, camera: cam5, renderer: ren5, sizes: sz5 },
    { container: con6, camera: cam6, renderer: ren6, sizes: sz6 }
  ];

  const handleResize = () => {
    allScenes.forEach(({ container, camera, renderer, sizes }) => {
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
  title: 'Procedural Terrain in Three.js'
})

useSeoMeta({
  title: 'Procedural Terrain in Three.js',
  ogTitle: 'Procedural Terrain in Three.js',
  description: 'Learn how to generate procedural terrain in Three.js using noise functions, fractal Brownian motion, height-based coloring, and ridged noise.',
  ogDescription: 'Learn how to generate procedural terrain in Three.js using noise functions, fractal Brownian motion, height-based coloring, and ridged noise.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/building-blocks/procedural-terrain',
  twitterTitle: 'Procedural Terrain in Three.js',
  twitterDescription: 'Learn how to generate procedural terrain in Three.js using noise functions, fractal Brownian motion, height-based coloring, and ridged noise.',
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
}
</style>
