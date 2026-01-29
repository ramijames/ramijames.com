<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Buffer Geometry" tagline="Building shapes from raw vertices and attributes" />

      <main class="w-content page-top">
        <section class="content">

          <h2>What is BufferGeometry?</h2>

          <p><code>BufferGeometry</code> is the foundation of every shape in Three.js. Whether you use a built-in <code>BoxGeometry</code> or build something entirely custom, it all comes down to BufferGeometry under the hood. It stores mesh data as positions, normals, UVs, colors that are then sent as flat typed arrays that get sent directly to the GPU. You know, magic.</p>

          <p>Understanding BufferGeometry gives you the power to create any shape that you can think of, optimize your scene's performance, and manipulate vertices at runtime. It's a lot of power that is worth learning.</p>

          <h3>What makes up BufferGeometry?</h3>

          <p>A BufferGeometry is made up of <strong>attributes</strong>. Each attribute is an array of numbers that describes something about each vertex:</p>

          <ul>
            <li><code>position</code>: Where each vertex is in 3D space (x, y, z)</li>
            <li><code>normal</code>: Which direction each vertex faces (for lighting)</li>
            <li><code>uv</code>: Texture coordinates (how textures wrap onto the surface)</li>
            <li><code>color</code>: Per-vertex color (r, g, b)</li>
          </ul>

          <p>Every three consecutive vertices define a <code>triangle</code> which, as you probably remember from our <nuxt-link to="/learn-threejs/foundational-threejs/why-threejs">"Why Three.js"</nuxt-link> introduction, is the basic building block of all 3D geometry in Three.js.</p>

          <h3>So let's create some triangles!</h3>

          <p>The simplest custom geometry is a single triangle. Not hard to visualize or to understand. You define three vertices (three points in space) and pass them as a position attribute:</p>

          <div class="scene-container">
            <canvas ref="triangleCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`// Create a new empty geometry
const geometry = new THREE.BufferGeometry();

// Define 3 vertices (x, y, z for each)
const vertices = new Float32Array([
  -1.0,  -1.0,  0.0,   // vertex 0 (bottom-left)
   1.0,  -1.0,  0.0,   // vertex 1 (bottom-right)
   0.0,   1.0,  0.0    // vertex 2 (top-center)
]);

// Create a BufferAttribute and assign it as the position attribute
// The second argument (3) means each vertex uses 3 values (x, y, z)
geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(vertices, 3)
);

const material = new THREE.MeshBasicMaterial({
  color: 0x44aaff,
  side: THREE.DoubleSide
});
const mesh = new THREE.Mesh(geometry, material);`" />

          <h3>Building a Vase from Triangles</h3>

          <p>Real 3D shapes are built by combining hundreds or thousands of triangles into something more complex and meaningful. A common technique is the <strong>surface of revolution</strong> (or lathe). You define a 2D profile curve and spin it around an axis to generate a 3D shape. Here's a vase built this way, entirely from raw vertices and indices:</p>

          <div class="scene-container">
            <canvas ref="teapotCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`// Define the vase profile (radius, height) pairs
const profile = [
  [0.0, 0.0], [0.8, 0.0], [1.1, 0.2], [1.3, 0.5],
  [1.2, 1.0], [0.7, 1.5], [0.6, 1.8], [0.75, 2.2],
  [1.0, 2.6], [0.9, 2.9], [0.75, 3.0]
];

const segments = 24; // slices around the Y axis
const vertices = [];
const indices = [];

// Generate vertices by rotating the profile around Y
for (let s = 0; s <= segments; s++) {
  const angle = (s / segments) * Math.PI * 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  for (const [r, y] of profile) {
    vertices.push(cos * r, y, sin * r);
  }
}

// Connect adjacent rings with triangles
const ringSize = profile.length;
for (let s = 0; s < segments; s++) {
  for (let p = 0; p < ringSize - 1; p++) {
    const a = s * ringSize + p;
    const b = a + ringSize;
    indices.push(a, b, a + 1);
    indices.push(a + 1, b, b + 1);
  }
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position',
  new THREE.BufferAttribute(new Float32Array(vertices), 3));
geometry.setIndex(indices);
geometry.computeVertexNormals();`" />

          <h3>Indexed Geometry</h3>

          <p>When vertices are shared between triangles (like in a grid or cube), you're wasting memory by duplicating them. <strong>Indexed geometry</strong> solves this by defining vertices once and then referencing them by index:</p>

          <div class="scene-container">
            <canvas ref="indexedCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`const geometry = new THREE.BufferGeometry();

// Define 4 unique vertices for a quad (two triangles sharing an edge)
const vertices = new Float32Array([
  -1, -1, 0,   // 0: bottom-left
   1, -1, 0,   // 1: bottom-right
   1,  1, 0,   // 2: top-right
  -1,  1, 0    // 3: top-left
]);

// Define which vertices form each triangle
// Two triangles: (0,1,2) and (0,2,3)
const indices = [
  0, 1, 2,  // first triangle
  0, 2, 3   // second triangle
];

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex(indices);
geometry.computeVertexNormals(); // Auto-calculate normals for lighting`" />

          <p>Indexed geometry is more memory efficient and is what Three.js uses internally for built-in geometries like <code>BoxGeometry</code> and <code>SphereGeometry</code>.</p>

          <h3>Vertex Colors</h3>

          <p>You can assign a color to each vertex. The GPU interpolates between them across each triangle face, creating smooth gradients:</p>

          <div class="scene-container">
            <canvas ref="colorCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  -1, -1, 0,
   1, -1, 0,
   0,  1, 0
]);

// RGB color for each vertex (values 0-1)
const colors = new Float32Array([
  1, 0, 0,   // red (bottom-left)
  0, 1, 0,   // green (bottom-right)
  0, 0, 1    // blue (top)
]);

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Tell the material to use vertex colors
const material = new THREE.MeshBasicMaterial({
  vertexColors: true,
  side: THREE.DoubleSide
});`" />

          <h3>Modifying Geometry at Runtime</h3>

          <p>You can update vertex data every frame for dynamic effects like waves or terrain deformation. The key is setting <code>needsUpdate = true</code> on the attribute after changing it:</p>

          <div class="scene-container">
            <canvas ref="waveCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`// Create a flat grid of vertices
const size = 10;
const segments = 50;
const geometry = new THREE.PlaneGeometry(size, size, segments, segments);

// In the animation loop, modify the Z values to create waves
function animate(time) {
  const positions = geometry.attributes.position.array;

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    positions[i + 2] = Math.sin(x * 2 + time) * 0.3
                     + Math.cos(y * 2 + time) * 0.3;
  }

  // Tell Three.js the data changed
  geometry.attributes.position.needsUpdate = true;

  // Recalculate normals so lighting updates too
  geometry.computeVertexNormals();
}`" />

          <h3>Computing Normals and Bounding Volumes</h3>

          <p>When you create custom geometry, Three.js doesn't automatically know how light should reflect off it or how big it is. You need to compute these yourself:</p>

          <CodeBlock lang="typescript" :code="`// Compute vertex normals from triangle faces
// Required for any material that responds to light
geometry.computeVertexNormals();

// Compute bounding box (axis-aligned box enclosing the geometry)
geometry.computeBoundingBox();
console.log(geometry.boundingBox.min, geometry.boundingBox.max);

// Compute bounding sphere (smallest sphere enclosing the geometry)
// Used by the frustum culler to skip off-screen objects
geometry.computeBoundingSphere();
console.log(geometry.boundingSphere.center, geometry.boundingSphere.radius);`" />

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/foundational-threejs/the-animation-loop"
    prevText="The Animation Loop"
    nextLink="/learn-threejs/building-blocks/standard-primitives"
    nextText="Standard Primitives"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const triangleCanvas = ref(null);
const teapotCanvas = ref(null);
const indexedCanvas = ref(null);
const colorCanvas = ref(null);
const waveCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(() => {
  if (!triangleCanvas.value || !teapotCanvas.value || !indexedCanvas.value || !colorCanvas.value || !waveCanvas.value) return;

  const animations = [];

  // Helper: create a scene with a dark background
  const createScene = (bgColor = 0x1a1a2e) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    return scene;
  };

  // Helper: create camera + renderer for a given canvas
  const createRendererPair = (canvas) => {
    const container = canvas.parentElement;
    const sizes = { width: container.clientWidth, height: container.clientHeight };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderers.push(renderer);

    return { camera, renderer, container, sizes };
  };

  // ===== SCENE 1: Single Triangle =====
  const scene1 = createScene(0x1a1a2e);

  const triGeom = new THREE.BufferGeometry();
  const triVerts = new Float32Array([
    -1.0, -1.0, 0.0,
     1.0, -1.0, 0.0,
     0.0,  1.0, 0.0
  ]);
  triGeom.setAttribute('position', new THREE.BufferAttribute(triVerts, 3));
  triGeom.computeVertexNormals();

  const triMat = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
  const triMesh = new THREE.Mesh(triGeom, triMat);
  scene1.add(triMesh);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(triangleCanvas.value, scene1);
  cam1.position.set(0, 0, 3);
  cam1.lookAt(0, 0, 0);

  animations.push(() => {
    triMesh.rotation.y += 0.01;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: Teapot (Surface of Revolution) =====
  const scene2 = createScene(0x16213e);

  // Vase profile: [radius, height] pairs
  const profile = [
    [0.0, 0.0], [0.8, 0.0], [1.1, 0.2], [1.3, 0.5],
    [1.2, 1.0], [0.7, 1.5], [0.6, 1.8], [0.75, 2.2],
    [1.0, 2.6], [0.9, 2.9], [0.75, 3.0]
  ];
  const segments = 24;
  const teapotVerts = [];
  const teapotIndices = [];

  // Generate vertices by rotating the profile around Y axis
  for (let s = 0; s <= segments; s++) {
    const angle = (s / segments) * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    for (const [r, y] of profile) {
      teapotVerts.push(cos * r, y, sin * r);
    }
  }

  // Connect adjacent rings with triangle pairs
  const ringSize = profile.length;
  for (let s = 0; s < segments; s++) {
    for (let p = 0; p < ringSize - 1; p++) {
      const a = s * ringSize + p;
      const b = a + ringSize;
      teapotIndices.push(a, b, a + 1);
      teapotIndices.push(a + 1, b, b + 1);
    }
  }

  const teapotGeom = new THREE.BufferGeometry();
  teapotGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(teapotVerts), 3));
  teapotGeom.setIndex(teapotIndices);
  teapotGeom.computeVertexNormals();

  const teapotMat = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
  const teapotMesh = new THREE.Mesh(teapotGeom, teapotMat);
  teapotMesh.position.y = -1.5;
  scene2.add(teapotMesh);

  // Wireframe overlay to show triangle structure
  const teapotWireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15 });
  const teapotWireMesh = new THREE.Mesh(teapotGeom, teapotWireMat);
  teapotWireMesh.position.y = -1.5;
  scene2.add(teapotWireMesh);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(teapotCanvas.value);
  cam2.position.set(0, 0.5, 5);
  cam2.lookAt(0, 0, 0);

  animations.push(() => {
    teapotMesh.rotation.y += 0.008;
    teapotWireMesh.rotation.y = teapotMesh.rotation.y;
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: Indexed Quad =====
  const scene3 = createScene(0x1e3a5f);

  const idxGeom = new THREE.BufferGeometry();
  const quadVerts = new Float32Array([
    -1, -1, 0,
     1, -1, 0,
     1,  1, 0,
    -1,  1, 0
  ]);
  const quadIndices = [0, 1, 2, 0, 2, 3];
  idxGeom.setAttribute('position', new THREE.BufferAttribute(quadVerts, 3));
  idxGeom.setIndex(quadIndices);
  idxGeom.computeVertexNormals();

  const idxMat = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
  const idxMesh = new THREE.Mesh(idxGeom, idxMat);
  scene3.add(idxMesh);

  // Add wireframe overlay to show the two triangles
  const wireGeom = idxGeom.clone();
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.4 });
  const wireMesh = new THREE.Mesh(wireGeom, wireMat);
  scene3.add(wireMesh);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(indexedCanvas.value, scene3);
  cam3.position.set(0, 0, 3);
  cam3.lookAt(0, 0, 0);

  animations.push(() => {
    idxMesh.rotation.y += 0.01;
    wireMesh.rotation.y = idxMesh.rotation.y;
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: Vertex Colors =====
  const scene4 = createScene(0x0d1b2a);

  const colGeom = new THREE.BufferGeometry();
  const colVerts = new Float32Array([
    -1, -1, 0,
     1, -1, 0,
     0,  1, 0
  ]);
  const colColors = new Float32Array([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ]);
  colGeom.setAttribute('position', new THREE.BufferAttribute(colVerts, 3));
  colGeom.setAttribute('color', new THREE.BufferAttribute(colColors, 3));

  const colMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
  const colMesh = new THREE.Mesh(colGeom, colMat);
  scene4.add(colMesh);

  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(colorCanvas.value, scene4);
  cam4.position.set(0, 0, 3);
  cam4.lookAt(0, 0, 0);

  animations.push(() => {
    colMesh.rotation.y += 0.01;
    ren4.render(scene4, cam4);
  });

  // ===== SCENE 5: Wave Plane =====
  const scene5 = createScene(0x111a2e);

  const waveGeom = new THREE.PlaneGeometry(6, 6, 50, 50);
  const waveMat = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, flatShading: true });
  const waveMesh = new THREE.Mesh(waveGeom, waveMat);
  waveMesh.rotation.x = -Math.PI / 3;
  scene5.add(waveMesh);

  const { camera: cam5, renderer: ren5, container: con5, sizes: sz5 } = createRendererPair(waveCanvas.value, scene5);
  cam5.position.set(0, 3, 4);
  cam5.lookAt(0, 0, 0);

  let waveTime = 0;
  animations.push(() => {
    waveTime += 0.02;
    const positions = waveGeom.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      positions[i + 2] = Math.sin(x * 2 + waveTime) * 0.3 + Math.cos(y * 2 + waveTime) * 0.3;
    }
    waveGeom.attributes.position.needsUpdate = true;
    waveGeom.computeVertexNormals();
    ren5.render(scene5, cam5);
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 },
    { container: con3, camera: cam3, renderer: ren3, sizes: sz3 },
    { container: con4, camera: cam4, renderer: ren4, sizes: sz4 },
    { container: con5, camera: cam5, renderer: ren5, sizes: sz5 }
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
  title: 'Buffer Geometry in Three.js'
})

useSeoMeta({
  title: 'Buffer Geometry in Three.js',
  ogTitle: 'Buffer Geometry in Three.js',
  description: 'Learn how to create custom geometry in Three.js using BufferGeometry, vertex attributes, indexed geometry, and runtime vertex manipulation.',
  ogDescription: 'Learn how to create custom geometry in Three.js using BufferGeometry, vertex attributes, indexed geometry, and runtime vertex manipulation.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/building-blocks/buffer-geometry',
  twitterTitle: 'Buffer Geometry in Three.js',
  twitterDescription: 'Learn how to create custom geometry in Three.js using BufferGeometry, vertex attributes, indexed geometry, and runtime vertex manipulation.',
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
