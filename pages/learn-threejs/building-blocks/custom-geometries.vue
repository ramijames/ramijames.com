<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Custom Geometries" tagline="Shapes, extrusions, lathes, and tubes" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Beyond Primitives</h2>

          <p>The <NuxtLink to="/learn-threejs/building-blocks/standard-primitives">standard primitives</NuxtLink> cover basic shapes, but real projects often need custom profiles, extruded text, curved tubes, or shapes defined by 2D outlines. Three.js provides several higher-level geometry generators that build on <NuxtLink to="/learn-threejs/building-blocks/buffer-geometry">BufferGeometry</NuxtLink> to handle these cases.</p>

          <h3>ShapeGeometry</h3>

          <p>A <code>Shape</code> defines a 2D outline using path commands similar to the HTML Canvas or SVG. <code>ShapeGeometry</code> then triangulates that outline into a flat mesh. This is the starting point for many custom shapes, and is the input for <code>ExtrudeGeometry</code>.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="shapeCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Create a 2D shape using path commands
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0.5);
heartShape.bezierCurveTo(0, 0.8, 0.4, 1.2, 0, 1.6);
heartShape.bezierCurveTo(-0.4, 1.2, -0.8, 0.8, 0, 0);

// Turn it into flat geometry
const geometry = new THREE.ShapeGeometry(heartShape);

// Shapes support holes
const outerShape = new THREE.Shape();
outerShape.moveTo(-1, -1);
outerShape.lineTo(1, -1);
outerShape.lineTo(1, 1);
outerShape.lineTo(-1, 1);

const hole = new THREE.Path();
hole.absarc(0, 0, 0.5, 0, Math.PI * 2, false);
outerShape.holes.push(hole);`" />

          <h3>ExtrudeGeometry</h3>

          <p>Extrusion takes a 2D <code>Shape</code> and pushes it into 3D along the Z axis. You control the depth, bevel size, and bevel segments. This is how Three.js generates 3D text and logos.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="extrudeCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`const shape = new THREE.Shape();
shape.moveTo(-1, -0.5);
shape.lineTo(1, -0.5);
shape.lineTo(1, 0.5);
shape.lineTo(-1, 0.5);

const extrudeSettings = {
  depth: 0.5,           // how far to extrude
  bevelEnabled: true,
  bevelThickness: 0.1,  // how deep the bevel goes
  bevelSize: 0.1,       // how far the bevel extends
  bevelSegments: 3      // smoothness of the bevel curve
};

const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

// You can also extrude along a custom path
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 1, 1),
  new THREE.Vector3(0, 2, 0)
]);
const alongPath = new THREE.ExtrudeGeometry(shape, {
  extrudePath: path,
  steps: 50,
  bevelEnabled: false
});`" />

          <h3>LatheGeometry</h3>

          <p>A lathe spins a 2D profile around the Y axis to create a revolved surface that is perfect for vases, bottles, chess pieces, or anything with radial symmetry. You define the profile as an array of <code>Vector2</code> points and spin, spin, spin!</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="latheCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Define the profile curve as Vector2 points (x = radius, y = height)
const points = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(0.6, 0),
  new THREE.Vector2(1.0, 0.3),
  new THREE.Vector2(0.7, 1.0),
  new THREE.Vector2(0.5, 1.5),
  new THREE.Vector2(0.6, 2.0),
  new THREE.Vector2(0.4, 2.3),
  new THREE.Vector2(0, 2.3)
];

// LatheGeometry(points, segments, phiStart, phiLength)
const geometry = new THREE.LatheGeometry(points, 32);

// Partial lathe (e.g. a half-turn to see the inside)
const half = new THREE.LatheGeometry(points, 32, 0, Math.PI);`" />

          <h3>TubeGeometry</h3>

          <p>Tubes generate a cylindrical mesh that follows a 3D curve. You can provide any <code>Curve</code> object and Three.js will build the geometry along it. Great for pipes, wires, roller coasters, or any path-based shape.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="tubeCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Define a 3D curve
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-2, 0, 0),
  new THREE.Vector3(-1, 1, 1),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1, -1, 1),
  new THREE.Vector3(2, 0, 0)
]);

// TubeGeometry(path, tubularSegments, radius, radialSegments, closed)
const geometry = new THREE.TubeGeometry(curve, 64, 0.2, 16, false);

// Closed loop
const loop = new THREE.CatmullRomCurve3([ /* ... */ ], true);
const closedTube = new THREE.TubeGeometry(loop, 64, 0.15, 16, true);`" />

          <h3>Modifying Existing Geometry</h3>

          <p>Sometimes the fastest path to a custom shape is starting from a primitive and displacing its vertices. Since every geometry is a <NuxtLink to="/learn-threejs/building-blocks/buffer-geometry">BufferGeometry</NuxtLink>, you can access and modify the position attribute directly.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="displaceCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Start with a sphere
const geometry = new THREE.SphereGeometry(1, 64, 32);
const positions = geometry.attributes.position;

// Displace each vertex by noise to create an asteroid
for (let i = 0; i < positions.count; i++) {
  const x = positions.getX(i);
  const y = positions.getY(i);
  const z = positions.getZ(i);

  // Simple displacement based on vertex position
  const noise = Math.sin(x * 3) * Math.cos(y * 3) * Math.sin(z * 3) * 0.2;
  const length = Math.sqrt(x * x + y * y + z * z);
  const scale = 1 + noise;

  positions.setXYZ(i, x * scale, y * scale, z * scale);
}

// Always recompute normals after modifying positions
geometry.computeVertexNormals();`" />

          <h3>Merging Geometries</h3>

          <p>When you have many static meshes using the same material, you can merge them into a single geometry to reduce draw calls. Three.js provides <code>mergeGeometries</code> from the <code>BufferGeometryUtils</code> addon for this.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="mergeCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const geometries = [];

// Create many small box geometries at different positions
for (let i = 0; i < 100; i++) {
  const box = new THREE.BoxGeometry(0.2, 0.2, 0.2);

  // Apply a transform before merging
  box.translate(
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4
  );

  geometries.push(box);
}

// Merge into a single geometry (one draw call instead of 100)
const merged = mergeGeometries(geometries);
const mesh = new THREE.Mesh(merged, material);`" />

          <p>Merging is a one-time operation so keep in mind that you can't move individual pieces afterward. For objects that need independent transforms, use <code>InstancedMesh</code> instead.</p>

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/building-blocks/standard-primitives"
    prevText="Standard Primitives"
    nextLink="/learn-threejs/building-blocks/instanced-mesh"
    nextText="Instanced Mesh"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const shapeCanvas = ref(null);
const extrudeCanvas = ref(null);
const latheCanvas = ref(null);
const tubeCanvas = ref(null);
const displaceCanvas = ref(null);
const mergeCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(() => {
  if (!shapeCanvas.value || !extrudeCanvas.value || !latheCanvas.value || !tubeCanvas.value || !displaceCanvas.value || !mergeCanvas.value) return;

  const animations = [];

  const createScene = (bgColor = 0x1a1a2e) => {
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
    renderers.push(renderer);

    return { camera, renderer, container, sizes };
  };

  const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15 });

  // ===== SCENE 1: ShapeGeometry =====
  const scene1 = createScene(0x1a1a2e);

  const shapeGroup = new THREE.Group();
  const shapeMat = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });

  // Heart shape
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, 0.3, -0.5, 0.8, -1, 0.4);
  heartShape.bezierCurveTo(-1.5, 0, -1, -0.6, 0, -1.2);
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, 0.3, 0.5, 0.8, 1, 0.4);
  heartShape.bezierCurveTo(1.5, 0, 1, -0.6, 0, -1.2);

  const heartGeom = new THREE.ShapeGeometry(heartShape);
  const heartMesh = new THREE.Mesh(heartGeom, shapeMat);
  heartMesh.position.x = -2;
  heartMesh.position.y = 0.3;
  shapeGroup.add(heartMesh);

  // Star shape
  const starShape = new THREE.Shape();
  const outerR = 1, innerR = 0.4, points5 = 5;
  for (let i = 0; i < points5 * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i / (points5 * 2)) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
  }
  starShape.closePath();

  const starGeom = new THREE.ShapeGeometry(starShape);
  const starMesh = new THREE.Mesh(starGeom, shapeMat);
  starMesh.position.x = 2;
  shapeGroup.add(starMesh);

  // Square with circular hole
  const squareShape = new THREE.Shape();
  squareShape.moveTo(-0.8, -0.8);
  squareShape.lineTo(0.8, -0.8);
  squareShape.lineTo(0.8, 0.8);
  squareShape.lineTo(-0.8, 0.8);
  squareShape.closePath();

  const holePath = new THREE.Path();
  holePath.absarc(0, 0, 0.4, 0, Math.PI * 2, false);
  squareShape.holes.push(holePath);

  const holeGeom = new THREE.ShapeGeometry(squareShape);
  const holeMesh = new THREE.Mesh(holeGeom, shapeMat);
  shapeGroup.add(holeMesh);

  shapeGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    shapeGroup.add(wire);
  });

  scene1.add(shapeGroup);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(shapeCanvas.value);
  cam1.position.set(0, 0, 5);
  cam1.lookAt(0, 0, 0);

  animations.push(() => {
    shapeGroup.rotation.y += 0.008;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: ExtrudeGeometry =====
  const scene2 = createScene(0x16213e);

  const extGroup = new THREE.Group();
  const extMat = new THREE.MeshNormalMaterial();

  // Extruded star
  const extStarGeom = new THREE.ExtrudeGeometry(starShape, {
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2
  });
  const extStarMesh = new THREE.Mesh(extStarGeom, extMat);
  extStarMesh.position.x = -2;
  extGroup.add(extStarMesh);

  // Extruded rounded rectangle
  const rrShape = new THREE.Shape();
  const rr = 0.2;
  rrShape.moveTo(-0.6 + rr, -0.4);
  rrShape.lineTo(0.6 - rr, -0.4);
  rrShape.quadraticCurveTo(0.6, -0.4, 0.6, -0.4 + rr);
  rrShape.lineTo(0.6, 0.4 - rr);
  rrShape.quadraticCurveTo(0.6, 0.4, 0.6 - rr, 0.4);
  rrShape.lineTo(-0.6 + rr, 0.4);
  rrShape.quadraticCurveTo(-0.6, 0.4, -0.6, 0.4 - rr);
  rrShape.lineTo(-0.6, -0.4 + rr);
  rrShape.quadraticCurveTo(-0.6, -0.4, -0.6 + rr, -0.4);

  const extRRGeom = new THREE.ExtrudeGeometry(rrShape, {
    depth: 0.8,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.08,
    bevelSegments: 3
  });
  const extRRMesh = new THREE.Mesh(extRRGeom, extMat);
  extRRMesh.position.x = 2;
  extGroup.add(extRRMesh);

  extGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    extGroup.add(wire);
  });

  scene2.add(extGroup);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(extrudeCanvas.value);
  cam2.position.set(0, 1, 5);
  cam2.lookAt(0, 0, 0);

  animations.push(() => {
    extGroup.rotation.y += 0.008;
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: LatheGeometry =====
  const scene3 = createScene(0x1e3a5f);

  const latheGroup = new THREE.Group();
  const latheMat = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });

  // Wine glass profile
  const glassProfile = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.6, 0),
    new THREE.Vector2(0.1, 0.4),
    new THREE.Vector2(0.08, 1.0),
    new THREE.Vector2(0.4, 1.4),
    new THREE.Vector2(0.5, 1.8),
    new THREE.Vector2(0.45, 2.0),
    new THREE.Vector2(0, 2.0)
  ];
  const glassGeom = new THREE.LatheGeometry(glassProfile, 32);
  const glassMesh = new THREE.Mesh(glassGeom, latheMat);
  glassMesh.position.set(-2, -1, 0);
  latheGroup.add(glassMesh);

  // Vase profile
  const vaseProfile = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.8, 0),
    new THREE.Vector2(1.0, 0.3),
    new THREE.Vector2(0.7, 1.0),
    new THREE.Vector2(0.5, 1.5),
    new THREE.Vector2(0.65, 2.0),
    new THREE.Vector2(0.55, 2.3),
    new THREE.Vector2(0, 2.3)
  ];
  const vaseGeom = new THREE.LatheGeometry(vaseProfile, 32);
  const vaseMesh = new THREE.Mesh(vaseGeom, latheMat);
  vaseMesh.position.set(2, -1, 0);
  latheGroup.add(vaseMesh);

  latheGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    latheGroup.add(wire);
  });

  scene3.add(latheGroup);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(latheCanvas.value);
  cam3.position.set(0, 1, 5);
  cam3.lookAt(0, 0, 0);

  animations.push(() => {
    latheGroup.rotation.y += 0.008;
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: TubeGeometry =====
  const scene4 = createScene(0x0d1b2a);

  const tubeGroup = new THREE.Group();
  const tubeMat = new THREE.MeshNormalMaterial();

  // Wavy curve
  const waveCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2, 0, 0),
    new THREE.Vector3(-1, 1, 1),
    new THREE.Vector3(0, -0.5, -0.5),
    new THREE.Vector3(1, 1, 0.5),
    new THREE.Vector3(2, 0, 0)
  ]);
  const waveGeom = new THREE.TubeGeometry(waveCurve, 64, 0.15, 12, false);
  const waveMesh = new THREE.Mesh(waveGeom, tubeMat);
  waveMesh.position.y = 1;
  tubeGroup.add(waveMesh);

  // Closed loop knot
  const knotPoints = [];
  for (let t = 0; t < Math.PI * 2; t += 0.1) {
    knotPoints.push(new THREE.Vector3(
      Math.cos(t) * 1.5 + Math.cos(t * 3) * 0.3,
      Math.sin(t * 2) * 0.5,
      Math.sin(t) * 1.5 + Math.sin(t * 3) * 0.3
    ));
  }
  const knotCurve = new THREE.CatmullRomCurve3(knotPoints, true);
  const knotGeom = new THREE.TubeGeometry(knotCurve, 128, 0.1, 10, true);
  const knotMesh = new THREE.Mesh(knotGeom, tubeMat);
  knotMesh.position.y = -1;
  tubeGroup.add(knotMesh);

  tubeGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    tubeGroup.add(wire);
  });

  scene4.add(tubeGroup);

  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(tubeCanvas.value);
  cam4.position.set(0, 0, 5);
  cam4.lookAt(0, 0, 0);

  animations.push(() => {
    tubeGroup.rotation.y += 0.008;
    ren4.render(scene4, cam4);
  });

  // ===== SCENE 5: Vertex Displacement =====
  const scene5 = createScene(0x111a2e);

  const dispGroup = new THREE.Group();

  // Displaced sphere (asteroid)
  const asteroidGeom = new THREE.SphereGeometry(1, 64, 32);
  const asteroidPos = asteroidGeom.attributes.position;
  for (let i = 0; i < asteroidPos.count; i++) {
    const x = asteroidPos.getX(i);
    const y = asteroidPos.getY(i);
    const z = asteroidPos.getZ(i);
    const noise = Math.sin(x * 4) * Math.cos(y * 4) * Math.sin(z * 4) * 0.15
                + Math.sin(x * 8 + 1) * Math.cos(z * 8) * 0.08;
    const scale = 1 + noise;
    asteroidPos.setXYZ(i, x * scale, y * scale, z * scale);
  }
  asteroidGeom.computeVertexNormals();

  const asteroidMat = new THREE.MeshNormalMaterial();
  const asteroidMesh = new THREE.Mesh(asteroidGeom, asteroidMat);
  asteroidMesh.position.x = -1.5;
  dispGroup.add(asteroidMesh);

  // Displaced cylinder (tree trunk)
  const trunkGeom = new THREE.CylinderGeometry(0.4, 0.5, 2.5, 16, 12);
  const trunkPos = trunkGeom.attributes.position;
  for (let i = 0; i < trunkPos.count; i++) {
    const x = trunkPos.getX(i);
    const y = trunkPos.getY(i);
    const z = trunkPos.getZ(i);
    const bump = Math.sin(y * 6) * 0.05 + Math.sin(y * 12 + x * 4) * 0.03;
    trunkPos.setX(i, x + bump);
    trunkPos.setZ(i, z + bump);
  }
  trunkGeom.computeVertexNormals();

  const trunkMat = new THREE.MeshNormalMaterial();
  const trunkMesh = new THREE.Mesh(trunkGeom, trunkMat);
  trunkMesh.position.x = 1.5;
  dispGroup.add(trunkMesh);

  dispGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    dispGroup.add(wire);
  });

  scene5.add(dispGroup);

  const { camera: cam5, renderer: ren5, container: con5, sizes: sz5 } = createRendererPair(displaceCanvas.value);
  cam5.position.set(0, 0.5, 4);
  cam5.lookAt(0, 0, 0);

  animations.push(() => {
    dispGroup.rotation.y += 0.008;
    ren5.render(scene5, cam5);
  });

  // ===== SCENE 6: Merged Geometries =====
  const scene6 = createScene(0x1a2e1a);

  const geomsToMerge = [];
  for (let i = 0; i < 200; i++) {
    const box = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    box.translate(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    );
    // Random rotation per box
    const m = new THREE.Matrix4();
    m.makeRotationFromEuler(new THREE.Euler(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ));
    box.applyMatrix4(m);
    geomsToMerge.push(box);
  }

  const mergedGeom = mergeGeometries(geomsToMerge);
  const mergeMat = new THREE.MeshNormalMaterial();
  const mergeMesh = new THREE.Mesh(mergedGeom, mergeMat);
  scene6.add(mergeMesh);

  const mergeWire = new THREE.Mesh(mergedGeom, wireMat);
  scene6.add(mergeWire);

  const { camera: cam6, renderer: ren6, container: con6, sizes: sz6 } = createRendererPair(mergeCanvas.value);
  cam6.position.set(0, 0, 5);
  cam6.lookAt(0, 0, 0);

  animations.push(() => {
    mergeMesh.rotation.y += 0.005;
    mergeWire.rotation.y = mergeMesh.rotation.y;
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
  title: 'Custom Geometries in Three.js'
})

useSeoMeta({
  title: 'Custom Geometries in Three.js',
  ogTitle: 'Custom Geometries in Three.js',
  description: 'Learn how to create custom shapes in Three.js using ShapeGeometry, ExtrudeGeometry, LatheGeometry, TubeGeometry, vertex displacement, and merged geometries.',
  ogDescription: 'Learn how to create custom shapes in Three.js using ShapeGeometry, ExtrudeGeometry, LatheGeometry, TubeGeometry, vertex displacement, and merged geometries.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/building-blocks/custom-geometries',
  twitterTitle: 'Custom Geometries in Three.js',
  twitterDescription: 'Learn how to create custom shapes in Three.js using ShapeGeometry, ExtrudeGeometry, LatheGeometry, TubeGeometry, vertex displacement, and merged geometries.',
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
