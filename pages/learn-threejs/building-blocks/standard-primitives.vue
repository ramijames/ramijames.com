<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Standard Primitives" tagline="The built-in shapes that come with Three.js" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Built-in Geometries</h2>

          <p>Three.js ships with a collection of ready-made geometries for common shapes that you can use to build your scenes with. These are all subclasses of <code>BufferGeometry</code>. This means that they generate the vertex positions, normals, and UVs for you so you don't have to build them by hand.</p>

          <h3>BoxGeometry</h3>

          <p>A rectangular box defined by width, height, and depth. You can also control the number of segments on each face, which matters when you want to deform vertices or need smoother shading.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="boxCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
const geometry = new THREE.BoxGeometry(1, 1, 1);

// A tall, thin box with extra segments
const detailed = new THREE.BoxGeometry(0.5, 2, 0.5, 1, 4, 1);`" />

          <h3>SphereGeometry</h3>

          <p>A sphere defined by its radius. The <code>widthSegments</code> and <code>heightSegments</code> parameters control how smooth it looks meaning that more segments create a rounder shape. This also means that more triangles are generated for the GPU to process.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="sphereCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// SphereGeometry(radius, widthSegments, heightSegments)
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Low-poly sphere (great for stylized looks)
const lowPoly = new THREE.SphereGeometry(1, 8, 6);

// Partial sphere (phi/theta control how much of the sphere to generate)
const halfSphere = new THREE.SphereGeometry(1, 32, 32,
  0, Math.PI * 2,  // phiStart, phiLength (horizontal sweep)
  0, Math.PI / 2   // thetaStart, thetaLength (vertical sweep)
);`" />

          <h3>CylinderGeometry and ConeGeometry</h3>

          <p>Cylinders have a top and bottom radius and you can simply set the top radius to 0 and you get a cone. Three.js also provides <code>ConeGeometry</code> as a convenience. Both support an <code>openEnded</code> parameter to remove the caps.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="cylinderCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)
const cylinder = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);

// Tapered cylinder
const tapered = new THREE.CylinderGeometry(0.3, 0.8, 2, 32);

// ConeGeometry(radius, height, radialSegments, heightSegments, openEnded)
const cone = new THREE.ConeGeometry(0.8, 2, 32);

// Open-ended cylinder (tube shape)
const tube = new THREE.CylinderGeometry(0.5, 0.5, 2, 32, 1, true);`" />

          <h3>TorusGeometry and TorusKnotGeometry</h3>

          <p>A torus is a donut shape defined by its ring radius and tube thickness. A torus knot is a more complex shape where the tube winds around itself. This is great for testing materials and lighting, but I have to admit, not much else :).</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="torusCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments)
const torus = new THREE.TorusGeometry(1, 0.4, 16, 100);

// TorusKnotGeometry(radius, tubeRadius, tubularSegments, radialSegments, p, q)
// p and q control how the knot winds
const knot = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);

// Different winding numbers create different knot shapes
const trefoil = new THREE.TorusKnotGeometry(1, 0.3, 100, 16, 2, 3);
const cinquefoil = new THREE.TorusKnotGeometry(1, 0.3, 100, 16, 2, 5);`" />

          <h3>PlaneGeometry, CircleGeometry, and RingGeometry</h3>

          <p>Flat 2D shapes are useful for floors, walls, UI elements, and particles. <code>PlaneGeometry</code> creates a rectangle, <code>CircleGeometry</code> a filled disc, and <code>RingGeometry</code> a flat annulus.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="flatCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// PlaneGeometry(width, height, widthSegments, heightSegments)
const plane = new THREE.PlaneGeometry(2, 2);

// CircleGeometry(radius, segments, thetaStart, thetaLength)
const circle = new THREE.CircleGeometry(1, 32);

// RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments)
const ring = new THREE.RingGeometry(0.5, 1, 32);`" />

          <h3>Polyhedra</h3>

          <p>Three.js includes the Platonic solids, which are geometries built from identical regular polygons. These are useful for low-poly aesthetics or as starting points for subdivision. Increasing the <code>detail</code> parameter subdivides each face, approaching a sphere.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="polyCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// All take (radius, detail), detail 0 is the base shape
const tetra = new THREE.TetrahedronGeometry(1, 0);   // 4 faces
const octa = new THREE.OctahedronGeometry(1, 0);     // 8 faces
const dodeca = new THREE.DodecahedronGeometry(1, 0);  // 12 faces
const icosa = new THREE.IcosahedronGeometry(1, 0);    // 20 faces

// Higher detail subdivides faces (detail 2 icosahedron ≈ smooth sphere)
const subdividedIcosa = new THREE.IcosahedronGeometry(1, 2);`" />

          <h3>The Effect of Segments</h3>

          <p>Every built-in geometry lets you control the number of <strong>segments</strong>. At the end of the day, this adjusts how many triangles make up the shape. More segments means smoother curves and better lighting at the cost of performance. Here's the same sphere at different segment counts:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="segmentsCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Low segments: visible facets, fewer triangles
const low = new THREE.SphereGeometry(1, 4, 3);

// Medium: a reasonable default
const medium = new THREE.SphereGeometry(1, 16, 12);

// High: very smooth, more triangles
const high = new THREE.SphereGeometry(1, 64, 48);

// Check the triangle count
console.log(geometry.index.count / 3); // number of triangles`" />

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/building-blocks/buffer-geometry"
    prevText="Buffer Geometry"
    nextLink="/learn-threejs/building-blocks/custom-geometries"
    nextText="Custom Geometries"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const boxCanvas = ref(null);
const sphereCanvas = ref(null);
const cylinderCanvas = ref(null);
const torusCanvas = ref(null);
const flatCanvas = ref(null);
const polyCanvas = ref(null);
const segmentsCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!boxCanvas.value || !sphereCanvas.value || !cylinderCanvas.value || !torusCanvas.value || !flatCanvas.value || !polyCanvas.value || !segmentsCanvas.value) return;

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

  // ===== SCENE 1: Box =====
  const scene1 = createScene(0x1a1a2e);

  const boxGroup = new THREE.Group();
  const boxMat = new THREE.MeshNormalMaterial();

  const box1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), boxMat);
  box1.position.x = -2;
  boxGroup.add(box1);

  const box2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2, 0.5, 1, 4, 1), boxMat);
  boxGroup.add(box2);

  const box3 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 1), boxMat);
  box3.position.x = 2;
  boxGroup.add(box3);

  // Add wireframe overlays
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15 });
  boxGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    boxGroup.add(wire);
  });

  scene1.add(boxGroup);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(boxCanvas.value);
  cam1.position.set(0, 1.5, 4);
  cam1.lookAt(0, 0, 0);

  animations.push(() => {
    boxGroup.rotation.y += 0.008;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: Sphere =====
  const scene2 = createScene(0x16213e);

  const sphereGroup = new THREE.Group();
  const sphereMat = new THREE.MeshNormalMaterial();

  const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 6), sphereMat);
  sphere1.position.x = -2;
  sphereGroup.add(sphere1);

  const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), sphereMat);
  sphereGroup.add(sphere2);

  // Half sphere
  const sphere3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })
  );
  sphere3.position.x = 2;
  sphereGroup.add(sphere3);

  sphereGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    sphereGroup.add(wire);
  });

  scene2.add(sphereGroup);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(sphereCanvas.value);
  cam2.position.set(0, 1, 5);
  cam2.lookAt(0, 0, 0);

  animations.push(() => {
    sphereGroup.rotation.y += 0.008;
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: Cylinder & Cone =====
  const scene3 = createScene(0x1e3a5f);

  const cylGroup = new THREE.Group();
  const cylMat = new THREE.MeshNormalMaterial();

  const cyl1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.6, 32), cylMat);
  cyl1.position.x = -3;
  cylGroup.add(cyl1);

  const cyl2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.7, 1.6, 32), cylMat);
  cyl2.position.x = -1;
  cylGroup.add(cyl2);

  const cone1 = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.6, 32), cylMat);
  cone1.position.x = 1;
  cylGroup.add(cone1);

  const openCyl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 1.6, 32, 1, true),
    new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })
  );
  openCyl.position.x = 3;
  cylGroup.add(openCyl);

  cylGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    cylGroup.add(wire);
  });

  scene3.add(cylGroup);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(cylinderCanvas.value);
  cam3.position.set(0, 1.5, 5);
  cam3.lookAt(0, 0, 0);

  animations.push(() => {
    cylGroup.rotation.y += 0.008;
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: Torus & TorusKnot =====
  const scene4 = createScene(0x0d1b2a);

  const torusGroup = new THREE.Group();
  const torusMat = new THREE.MeshNormalMaterial();

  const torus1 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.3, 16, 100), torusMat);
  torus1.position.x = -2;
  torusGroup.add(torus1);

  const knot1 = new THREE.Mesh(new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16), torusMat);
  knot1.position.x = 1.5;
  torusGroup.add(knot1);

  torusGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    torusGroup.add(wire);
  });

  scene4.add(torusGroup);

  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(torusCanvas.value);
  cam4.position.set(0, 1, 5);
  cam4.lookAt(0, 0, 0);

  animations.push(() => {
    torusGroup.rotation.y += 0.008;
    ren4.render(scene4, cam4);
  });

  // ===== SCENE 5: Flat shapes =====
  const scene5 = createScene(0x111a2e);

  const flatGroup = new THREE.Group();
  const flatMat = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4), flatMat);
  plane.position.x = -2.5;
  flatGroup.add(plane);

  const circle = new THREE.Mesh(new THREE.CircleGeometry(0.8, 32), flatMat);
  flatGroup.add(circle);

  const ring = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.8, 32), flatMat);
  ring.position.x = 2.5;
  flatGroup.add(ring);

  flatGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    flatGroup.add(wire);
  });

  scene5.add(flatGroup);

  const { camera: cam5, renderer: ren5, container: con5, sizes: sz5 } = createRendererPair(flatCanvas.value);
  cam5.position.set(0, 0, 5);
  cam5.lookAt(0, 0, 0);

  animations.push(() => {
    flatGroup.rotation.y += 0.008;
    ren5.render(scene5, cam5);
  });

  // ===== SCENE 6: Polyhedra =====
  const scene6 = createScene(0x1a2e1a);

  const polyGroup = new THREE.Group();
  const polyMat = new THREE.MeshNormalMaterial();

  const tetra = new THREE.Mesh(new THREE.TetrahedronGeometry(0.7, 0), polyMat);
  tetra.position.x = -3;
  polyGroup.add(tetra);

  const octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), polyMat);
  octa.position.x = -1;
  polyGroup.add(octa);

  const dodeca = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7, 0), polyMat);
  dodeca.position.x = 1;
  polyGroup.add(dodeca);

  const icosa = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 0), polyMat);
  icosa.position.x = 3;
  polyGroup.add(icosa);

  polyGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    polyGroup.add(wire);
  });

  scene6.add(polyGroup);

  const { camera: cam6, renderer: ren6, container: con6, sizes: sz6 } = createRendererPair(polyCanvas.value);
  cam6.position.set(0, 1.5, 6);
  cam6.lookAt(0, 0, 0);

  animations.push(() => {
    polyGroup.rotation.y += 0.008;
    ren6.render(scene6, cam6);
  });

  // ===== SCENE 7: Segments comparison =====
  const scene7 = createScene(0x2e1a1a);

  const segGroup = new THREE.Group();
  const segMat = new THREE.MeshNormalMaterial();

  const segLow = new THREE.Mesh(new THREE.SphereGeometry(0.8, 4, 3), segMat);
  segLow.position.x = -3;
  segGroup.add(segLow);

  const segMed = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 8), segMat);
  segMed.position.x = -1;
  segGroup.add(segMed);

  const segHigh = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 24), segMat);
  segHigh.position.x = 1;
  segGroup.add(segHigh);

  const segUltra = new THREE.Mesh(new THREE.SphereGeometry(0.8, 64, 48), segMat);
  segUltra.position.x = 3;
  segGroup.add(segUltra);

  segGroup.children.forEach(mesh => {
    const wire = new THREE.Mesh(mesh.geometry, wireMat);
    wire.position.copy(mesh.position);
    segGroup.add(wire);
  });

  scene7.add(segGroup);

  const { camera: cam7, renderer: ren7, container: con7, sizes: sz7 } = createRendererPair(segmentsCanvas.value);
  cam7.position.set(0, 1, 6);
  cam7.lookAt(0, 0, 0);

  animations.push(() => {
    segGroup.rotation.y += 0.008;
    ren7.render(scene7, cam7);
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 },
    { container: con3, camera: cam3, renderer: ren3, sizes: sz3 },
    { container: con4, camera: cam4, renderer: ren4, sizes: sz4 },
    { container: con5, camera: cam5, renderer: ren5, sizes: sz5 },
    { container: con6, camera: cam6, renderer: ren6, sizes: sz6 },
    { container: con7, camera: cam7, renderer: ren7, sizes: sz7 }
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

useHead({
  title: 'Standard Primitives in Three.js'
})

useSeoMeta({
  title: 'Standard Primitives in Three.js',
  ogTitle: 'Standard Primitives in Three.js',
  description: 'Explore the built-in geometries in Three.js including boxes, spheres, cylinders, tori, planes, and polyhedra.',
  ogDescription: 'Explore the built-in geometries in Three.js including boxes, spheres, cylinders, tori, planes, and polyhedra.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/building-blocks/standard-primitives',
  twitterTitle: 'Standard Primitives in Three.js',
  twitterDescription: 'Explore the built-in geometries in Three.js including boxes, spheres, cylinders, tori, planes, and polyhedra.',
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
