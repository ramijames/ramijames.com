<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="InstancedMesh" tagline="Rendering thousands of objects with a single draw call" />

      <main class="w-content page-top">
        <section class="content">

          <h2>The draw call problem</h2>

          <p>Every time Three.js renders a <code>Mesh</code>, it issues a <strong>draw call</strong> to the GPU. A draw call is an instruction that says "here's some geometry and a material, now be a good boy and go render it." Each draw call carries a bit of overhead, meaning that the CPU has to go and do a bunch of stuff like set up state, bind textures, upload uniforms, and communicate with the GPU driver. For a handful of objects this is invisible. For hundreds or thousands, it becomes a bottleneck.</p>

          <p>If you need to render 1,000 identical cubes, like a field of crates or a particle cloud, creating 1,000 <code>Mesh</code> objects means 1,000 draw calls per frame. The GPU itself could handle the geometry easily, but the CPU spends most of its time just <em>telling</em> the GPU what to draw. The frame rate drops not because the scene is geometrically complex, but because the communication overhead is too high.</p>

          <p><code>InstancedMesh</code> solves this. It takes a single geometry and a single material, and draws them many times in one draw call. Each copy, called an <strong>instance</strong>, gets its own transformation matrix (position, rotation, scale), and optionally its own color. The GPU handles the repetition internally, which is what GPUs are built to do.</p>

          <h2>How InstancedMesh works</h2>

          <p>The constructor takes three arguments: a geometry, a material, and the number of instances.</p>

          <CodeBlock lang="typescript" :code="`const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshStandardMaterial({ color: 0x4488cc });

// Create 1000 instances sharing this geometry and material
const mesh = new THREE.InstancedMesh(geometry, material, 1000);
scene.add(mesh);`" />

          <p>After creating the <code>InstancedMesh</code>, you need to position each instance. Every instance has a 4x4 transformation matrix that you set with <code>setMatrixAt(index, matrix)</code>. You build the matrix using <code>THREE.Matrix4</code>, typically by composing a position, rotation, and scale with <code>matrix.compose(position, quaternion, scale)</code>, or by using simpler helpers like <code>matrix.setPosition()</code> for position-only transforms.</p>

          <CodeBlock lang="typescript" :code="`const dummy = new THREE.Object3D();

for (let i = 0; i < 1000; i++) {
  // Position each instance
  dummy.position.set(
    (i % 20) * 1.2 - 12,  // x: grid column
    0,                      // y: flat on ground
    Math.floor(i / 20) * 1.2 - 30  // z: grid row
  );
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}

// Tell Three.js the instance matrices have been set
mesh.instanceMatrix.needsUpdate = true;`" />

          <p>The <code>Object3D</code> trick is a common pattern. Instead of manually building a <code>Matrix4</code>, you use a temporary <code>Object3D</code> (which has familiar <code>position</code>, <code>rotation</code>, and <code>scale</code> properties), call <code>updateMatrix()</code> to compute its matrix, and then copy that matrix into the instance buffer.</p>

          <h3>A grid of cubes</h3>

          <p>The scene below renders 400 cubes in a 20x20 grid using a single <code>InstancedMesh</code>. There is just one draw call for the entire grid!</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="basicGridCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`const gridSize = 20;
const count = gridSize * gridSize;
const spacing = 1.2;

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshStandardMaterial({
  color: 0x4488cc,
  roughness: 0.6,
  metalness: 0.3
});

const mesh = new THREE.InstancedMesh(geometry, material, count);
const dummy = new THREE.Object3D();

for (let i = 0; i < count; i++) {
  const col = i % gridSize;
  const row = Math.floor(i / gridSize);
  dummy.position.set(
    col * spacing - (gridSize * spacing) / 2,
    0,
    row * spacing - (gridSize * spacing) / 2
  );
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}

mesh.instanceMatrix.needsUpdate = true;
scene.add(mesh);`" />

          <h2>Per-instance color</h2>

          <p>By default, all instances share the material's color. But <code>InstancedMesh</code> supports per-instance colors through the <code>setColorAt()</code> method. When you call this, Three.js creates an <code>instanceColor</code> buffer attribute that overrides the material's base color for each instance.</p>

          <CodeBlock lang="typescript" :code="`const color = new THREE.Color();

for (let i = 0; i < count; i++) {
  // Create a gradient based on position
  const col = i % gridSize;
  const row = Math.floor(i / gridSize);
  const hue = (col + row) / (gridSize * 2);

  color.setHSL(hue, 0.7, 0.5);
  mesh.setColorAt(i, color);
}

// Tell Three.js the instance colors have been set
mesh.instanceColor.needsUpdate = true;`" />

          <p>The scene below uses a gradient hue across the grid. Each cube has a unique color, but they're all still rendered in a single draw call.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="coloredFieldCanvas"></canvas>
          </div>
          </ClientOnly>

          <h2>Animating instances</h2>

          <p>To animate instances, you update their matrices each frame and set <code>instanceMatrix.needsUpdate = true</code>. This tells Three.js to re-upload the matrix buffer to the GPU. The pattern is the same as initial setup, you loop through instances, update the dummy's transform, and then copy the matrix back.</p>

          <p>The scene below animates a 30x30 grid of cubes in a sine wave. Each frame, every instance's Y position and rotation are recalculated based on its grid position and the current time.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="animatedWaveCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`const clock = new THREE.Clock();

function animate() {
  const time = clock.getElapsedTime();

  for (let i = 0; i < count; i++) {
    const col = i % gridSize;
    const row = Math.floor(i / gridSize);

    // Sine wave based on position and time
    const y = Math.sin(col * 0.4 + time * 2) *
              Math.cos(row * 0.4 + time * 2) * 1.5;

    dummy.position.set(
      col * spacing - offset,
      y,
      row * spacing - offset
    );
    dummy.rotation.y = time + col * 0.1;
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }

  // Critical: mark the buffer as needing re-upload
  mesh.instanceMatrix.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}`" />

          <p>Updating matrices every frame is more expensive than a static scene, but still far cheaper than managing thousands of individual <code>Mesh</code> objects. The GPU does the heavy lifting of actually rendering the instances, meaning that you're only paying the CPU cost of computing the transforms. Super cool!</p>

          <h2>When to use InstancedMesh</h2>

          <p><code>InstancedMesh</code> is the right tool whenever you have many copies of the same geometry and material. Common use cases include:</p>

          <ul>
            <li><strong>Vegetation</strong>: Thousands of grass blades, trees, or bushes across a terrain.</li>
            <li><strong>Particles</strong>: Debris, sparks, snowflakes, or any volumetric effect where each particle is a small mesh rather than a point sprite.</li>
            <li><strong>Architecture</strong>: Repeated structural elements like windows, bricks, columns, or floor tiles.</li>
            <li><strong>Crowds</strong>: Simplified character models populating a city or stadium.</li>
            <li><strong>Data visualization</strong>: Bar charts, scatter plots, or node graphs with hundreds of data points.</li>
          </ul>

          <p>The rule of thumb is that if you're adding the same geometry to the scene more than a few dozen times, instancing will give you a measurable performance improvement. At hundreds or thousands of copies, it's the difference between 60 fps and single digits.</p>

          <p>The limitations are straightforward. All instances must share the same geometry and material. If you need different geometries or fundamentally different materials, you'll need separate <code>InstancedMesh</code> objects (one per geometry/material combination). Per-instance color is supported, but per-instance textures or material properties beyond color require custom shaders.</p>

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/building-blocks/custom-geometries"
    prevText="Custom Geometries"
    nextLink="/learn-threejs/building-blocks/procedural-terrain"
    nextText="Procedural Terrain"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const basicGridCanvas = ref(null);
const coloredFieldCanvas = ref(null);
const animatedWaveCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!basicGridCanvas.value || !coloredFieldCanvas.value || !animatedWaveCanvas.value) return;

  const animations = [];

  const createScene = (bgColor = 0x111122) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    return scene;
  };

  const createRendererPair = (canvas) => {
    const container = canvas.parentElement;
    const sizes = { width: container.clientWidth, height: container.clientHeight };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderers.push(renderer);

    return { camera, renderer, container, sizes };
  };

  const addLights = (scene) => {
    const dir = new THREE.DirectionalLight(0xffffff, 2.0);
    dir.position.set(5, 8, 5);
    scene.add(dir);

    const dir2 = new THREE.DirectionalLight(0x8888ff, 0.5);
    dir2.position.set(-5, 3, -3);
    scene.add(dir2);

    scene.add(new THREE.AmbientLight(0x404060, 0.5));
  };

  // ===== SCENE 1: Basic Grid =====
  const scene1 = createScene();
  addLights(scene1);

  const gridSize1 = 20;
  const count1 = gridSize1 * gridSize1;
  const spacing1 = 1.2;

  const geom1 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const mat1 = new THREE.MeshStandardMaterial({ color: 0x4488cc, roughness: 0.6, metalness: 0.3 });
  const instancedMesh1 = new THREE.InstancedMesh(geom1, mat1, count1);

  const dummy1 = new THREE.Object3D();
  const offset1 = (gridSize1 * spacing1) / 2;

  for (let i = 0; i < count1; i++) {
    const col = i % gridSize1;
    const row = Math.floor(i / gridSize1);
    dummy1.position.set(
      col * spacing1 - offset1,
      0,
      row * spacing1 - offset1
    );
    dummy1.updateMatrix();
    instancedMesh1.setMatrixAt(i, dummy1.matrix);
  }

  instancedMesh1.instanceMatrix.needsUpdate = true;

  const group1 = new THREE.Group();
  group1.add(instancedMesh1);
  scene1.add(group1);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(basicGridCanvas.value);
  cam1.position.set(12, 10, 12);
  cam1.lookAt(0, 0, 0);

  animations.push(() => {
    group1.rotation.y += 0.003;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: Colored Field =====
  const scene2 = createScene();
  addLights(scene2);

  const gridSize2 = 22;
  const count2 = gridSize2 * gridSize2;
  const spacing2 = 1.1;

  const geom2 = new THREE.BoxGeometry(0.45, 0.45, 0.45);
  const mat2 = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.4 });
  const instancedMesh2 = new THREE.InstancedMesh(geom2, mat2, count2);

  const dummy2 = new THREE.Object3D();
  const offset2 = (gridSize2 * spacing2) / 2;
  const color2 = new THREE.Color();

  for (let i = 0; i < count2; i++) {
    const col = i % gridSize2;
    const row = Math.floor(i / gridSize2);

    dummy2.position.set(
      col * spacing2 - offset2,
      0,
      row * spacing2 - offset2
    );
    dummy2.updateMatrix();
    instancedMesh2.setMatrixAt(i, dummy2.matrix);

    // Gradient hue based on position
    const hue = (col + row) / (gridSize2 * 2);
    color2.setHSL(hue, 0.7, 0.5);
    instancedMesh2.setColorAt(i, color2);
  }

  instancedMesh2.instanceMatrix.needsUpdate = true;
  instancedMesh2.instanceColor.needsUpdate = true;

  const group2 = new THREE.Group();
  group2.add(instancedMesh2);
  scene2.add(group2);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(coloredFieldCanvas.value);
  cam2.position.set(12, 10, 12);
  cam2.lookAt(0, 0, 0);

  animations.push(() => {
    group2.rotation.y += 0.003;
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: Animated Wave =====
  const scene3 = createScene();
  addLights(scene3);

  const gridSize3 = 30;
  const count3 = gridSize3 * gridSize3;
  const spacing3 = 0.8;

  const geom3 = new THREE.BoxGeometry(0.35, 0.35, 0.35);
  const mat3 = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.3 });
  const instancedMesh3 = new THREE.InstancedMesh(geom3, mat3, count3);

  const dummy3 = new THREE.Object3D();
  const offset3 = (gridSize3 * spacing3) / 2;
  const color3 = new THREE.Color();

  // Set initial colors
  for (let i = 0; i < count3; i++) {
    const col = i % gridSize3;
    const row = Math.floor(i / gridSize3);
    const hue = 0.55 + (col + row) / (gridSize3 * 2) * 0.15;
    color3.setHSL(hue, 0.6, 0.55);
    instancedMesh3.setColorAt(i, color3);
  }
  instancedMesh3.instanceColor.needsUpdate = true;

  scene3.add(instancedMesh3);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(animatedWaveCanvas.value);
  cam3.position.set(12, 10, 12);
  cam3.lookAt(0, 0, 0);

  const clock = new THREE.Clock();

  animations.push(() => {
    const time = clock.getElapsedTime();

    for (let i = 0; i < count3; i++) {
      const col = i % gridSize3;
      const row = Math.floor(i / gridSize3);

      const y = Math.sin(col * 0.4 + time * 2) *
                Math.cos(row * 0.4 + time * 2) * 1.5;

      dummy3.position.set(
        col * spacing3 - offset3,
        y,
        row * spacing3 - offset3
      );
      dummy3.rotation.y = time + col * 0.1;
      dummy3.updateMatrix();
      instancedMesh3.setMatrixAt(i, dummy3.matrix);
    }

    instancedMesh3.instanceMatrix.needsUpdate = true;
    ren3.render(scene3, cam3);
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 },
    { container: con3, camera: cam3, renderer: ren3, sizes: sz3 }
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
  title: 'InstancedMesh in Three.js'
})

useSeoMeta({
  title: 'InstancedMesh in Three.js',
  ogTitle: 'InstancedMesh in Three.js',
  description: 'Learn how to use InstancedMesh to render thousands of objects efficiently in Three.js with a single draw call, per-instance colors, and animated transforms.',
  ogDescription: 'Learn how to use InstancedMesh to render thousands of objects efficiently in Three.js with a single draw call, per-instance colors, and animated transforms.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/building-blocks/instanced-mesh',
  twitterTitle: 'InstancedMesh in Three.js',
  twitterDescription: 'Learn how to use InstancedMesh to render thousands of objects efficiently in Three.js with a single draw call, per-instance colors, and animated transforms.',
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
