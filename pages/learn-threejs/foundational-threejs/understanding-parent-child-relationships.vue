<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Parent-Child Relationships" tagline="Building hierarchies with Object3D" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Understanding Object Hierarchies</h2>

          <p>In Three.js, every object (meshes, lights, cameras, groups) inherits from <code>Object3D</code>. This base class provides a powerful feature: <strong>parent-child relationships</strong>. When you add an object as a child of another, the child's transformations (position, rotation, scale) become relative to its parent.</p>

          <p>What does this mean? Well, it boils down to allowing you to manipulate the parents and having the manipulation affect the children, too. If you spin a parent, the children spin. If you move a parent, the children move, too. Because children can have children (really, there's no practical limit here), you can create really beautiful, complex effects with little effort. Stuff that would be a major headache to animate by hand become trivial.</p>

          <h3>Starting with adding children</h3>

          <p>Use the <code>.add()</code> method to create a hierarchy:</p>

          <CodeBlock lang="typescript" :code="`// Create a parent and child
const parent = new THREE.Mesh(parentGeometry, parentMaterial);
const child = new THREE.Mesh(childGeometry, childMaterial);

// Make child a child of parent
parent.add(child);

// Add parent to scene (child comes along automatically)
scene.add(parent);

// Position child relative to parent
child.position.x = 2; // 2 units to the right of parent's center`" />

          <h3>Transform Inheritance</h3>

          <p>The key insight is that <strong>children inherit their parent's transformations</strong>. Look at the demo below where the small cubes are children of the larger cube. When the large cube (the parent) rotates, the children orbit around it while also spinning on their own axes.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="hierarchyCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Parent rotates
parent.rotation.y += 0.01;

// Children rotate on their own axis
// But they ALSO move with the parent's rotation
children.forEach(child => {
  child.rotation.x += 0.02;
});`" />

          <p>This is incredibly useful because you don't need to calculate complex rotations, insteaad you can just rotate the parent and the children follow.</p>

          <h3>Local vs World Coordinates</h3>

          <p>When you set <code>child.position.x = 2</code>, that's in <strong>local space</strong> (relative to the parent). If you need to get the actual position in the scene (i.e. world space), you can use:</p>

          <CodeBlock lang="typescript" :code="`// Get world position
const worldPosition = new THREE.Vector3();
child.getWorldPosition(worldPosition);

// Get world quaternion (rotation)
const worldQuaternion = new THREE.Quaternion();
child.getWorldQuaternion(worldQuaternion);

// Get world scale
const worldScale = new THREE.Vector3();
child.getWorldScale(worldScale);`" />

          <h3>Using Groups</h3>

          <p><code>THREE.Group</code> is an empty container specifically designed for organizing objects. It's like an invisible parent that lets you transform multiple objects together.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="groupCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Create a group
const group = new THREE.Group();

// Add multiple objects to the group
group.add(cube1);
group.add(cube2);
group.add(cube3);

// Now transform them all at once
group.position.y = 1;
group.rotation.z = Math.PI / 4;
group.scale.set(1.5, 1.5, 1.5);

// Add group to scene
scene.add(group);`" />

          <h3>Let's build a Solar System!</h3>

          <p>Parent-child relationships make orbital systems trivial to implement. Each body orbits its parent without complex math. So, in our example solar system, the Sun is the parent of the planet, and the planet is the parent of the moon.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="solarCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Sun at center (added to scene)
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Earth orbits sun
const earthPivot = new THREE.Group(); // invisible pivot point
sun.add(earthPivot);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 5; // distance from sun
earthPivot.add(earth);

// Moon orbits earth
const moonPivot = new THREE.Group();
earth.add(moonPivot);
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.x = 1; // distance from earth
moonPivot.add(moon);

// Animation - just rotate the pivots!
function animate() {
  earthPivot.rotation.y += 0.01;  // Earth orbits sun
  moonPivot.rotation.y += 0.03;   // Moon orbits earth (faster)
  earth.rotation.y += 0.02;       // Earth spins
}`" />

          <h3>Removing Children</h3>

          <p>In more complex scenes, you'll find that you will need to either remove or move children from one parent, and optionally move them to another. You can remove objects from their parent and optionally add them elsewhere like this:</p>

          <CodeBlock lang="typescript" :code="`// Remove from parent
parent.remove(child);

// Remove from scene entirely
scene.remove(object);

// Move to different parent
oldParent.remove(child);
newParent.add(child);

// Clear all children
parent.clear();`" />

          <h3>Traversing the Hierarchy</h3>

          <p>You can walk through all descendants of an object:</p>

          <CodeBlock lang="typescript" :code="`// Visit every descendant
parent.traverse((object) => {
  console.log(object.name);

  // Common pattern: find all meshes
  if (object.isMesh) {
    object.material.wireframe = true;
  }
});

// Only visit visible descendants
parent.traverseVisible((object) => {
  // ...
});

// Get direct children only
parent.children.forEach((child) => {
  // ...
});`" />

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/foundational-threejs/the-scene-graph"
    prevText="The Renderer"
    nextLink="/learn-threejs/foundational-threejs/position-rotation-and-scale"
    nextText="Position, Rotation, and Scale"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const hierarchyCanvas = ref(null);
const groupCanvas = ref(null);
const solarCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(() => {
  if (!hierarchyCanvas.value || !groupCanvas.value || !solarCanvas.value) return;

  const animations = [];

  // ===== SCENE 1: Parent-Child Transform Inheritance =====
  const scene1 = new THREE.Scene();
  scene1.background = new THREE.Color(0x1a1a2e);

  // Parent cube
  const parentMat = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.6 });
  const parent = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), parentMat);
  scene1.add(parent);

  // Child cubes orbiting the parent
  const childMat = new THREE.MeshNormalMaterial();
  const children1 = [];
  for (let i = 0; i < 4; i++) {
    const child = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), childMat);
    const angle = (i / 4) * Math.PI * 2;
    child.position.x = Math.cos(angle) * 2;
    child.position.z = Math.sin(angle) * 2;
    parent.add(child);
    children1.push(child);
  }

  const container1 = hierarchyCanvas.value.parentElement;
  const sizes1 = { width: container1.clientWidth, height: container1.clientHeight };

  const camera1 = new THREE.PerspectiveCamera(75, sizes1.width / sizes1.height, 0.1, 100);
  camera1.position.set(2, 2, 5);
  camera1.lookAt(0, 0, 0);

  const renderer1 = new THREE.WebGLRenderer({ canvas: hierarchyCanvas.value, antialias: true });
  renderer1.setSize(sizes1.width, sizes1.height);
  renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer1);

  animations.push(() => {
    parent.rotation.y += 0.01;
    children1.forEach(child => {
      child.rotation.x += 0.02;
      child.rotation.z += 0.02;
    });
    renderer1.render(scene1, camera1);
  });

  // ===== SCENE 2: Groups Demo =====
  const scene2 = new THREE.Scene();
  scene2.background = new THREE.Color(0x16213e);

  // Create two groups
  const group1 = new THREE.Group();
  const group2 = new THREE.Group();
  scene2.add(group1);
  scene2.add(group2);

  group1.position.x = -1.5;
  group2.position.x = 1.5;

  // Add cubes to group 1 (vertical stack)
  const mat2 = new THREE.MeshNormalMaterial();
  for (let i = 0; i < 3; i++) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), mat2);
    cube.position.y = (i - 1) * 0.8;
    group1.add(cube);
  }

  // Add cubes to group 2 (horizontal row)
  for (let i = 0; i < 3; i++) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), mat2);
    cube.position.x = (i - 1) * 0.8;
    group2.add(cube);
  }

  const container2 = groupCanvas.value.parentElement;
  const sizes2 = { width: container2.clientWidth, height: container2.clientHeight };

  const camera2 = new THREE.PerspectiveCamera(75, sizes2.width / sizes2.height, 0.1, 100);
  camera2.position.set(0, 1, 5);
  camera2.lookAt(0, 0, 0);

  const renderer2 = new THREE.WebGLRenderer({ canvas: groupCanvas.value, antialias: true });
  renderer2.setSize(sizes2.width, sizes2.height);
  renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer2);

  animations.push(() => {
    group1.rotation.x += 0.01;
    group2.rotation.y += 0.01;
    renderer2.render(scene2, camera2);
  });

  // ===== SCENE 3: Solar System =====
  const scene3 = new THREE.Scene();
  scene3.background = new THREE.Color(0x0a0a15);

  // Helper to create orbital path line
  const createOrbitLine = (radius, color, segments = 64) => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 1 });
    return new THREE.Line(geometry, material);
  };

  // Sun (using BasicMaterial so it glows without needing light)
  const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), sunMat);
  scene3.add(sun);

  // Add sun light
  const sunLight = new THREE.PointLight(0xffffff, 100, 50);
  sun.add(sunLight);

  // Earth's orbital path (around sun)
  const earthOrbitLine = createOrbitLine(2.5, 0x4488ff);
  scene3.add(earthOrbitLine);

  // Earth pivot - this rotates around the sun
  const earthPivot = new THREE.Group();
  scene3.add(earthPivot);

  const earthMat = new THREE.MeshStandardMaterial({ color: 0x4488ff });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), earthMat);
  earth.position.x = 2.5;
  earthPivot.add(earth);

  // Moon's orbital path (around earth) - attached to earthPivot so it moves with earth
  const moonOrbitLine = createOrbitLine(0.5, 0xaaaaaa, 32);
  moonOrbitLine.position.x = 2.5; // Position at earth's location
  earthPivot.add(moonOrbitLine);

  // Moon pivot - this rotates around the earth
  const moonPivot = new THREE.Group();
  moonPivot.position.x = 2.5;
  earthPivot.add(moonPivot);

  const moonMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  const moon = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), moonMat);
  moon.position.x = 0.5;
  moonPivot.add(moon);

  // Ambient light for visibility
  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene3.add(ambient);

  const container3 = solarCanvas.value.parentElement;
  const sizes3 = { width: container3.clientWidth, height: container3.clientHeight };

  const camera3 = new THREE.PerspectiveCamera(75, sizes3.width / sizes3.height, 0.1, 100);
  camera3.position.set(0, 4, 3);
  camera3.lookAt(0, 0, 0.5);

  const renderer3 = new THREE.WebGLRenderer({ canvas: solarCanvas.value, antialias: true });
  renderer3.setSize(sizes3.width, sizes3.height);
  renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer3);

  animations.push(() => {
    sun.rotation.y += 0.002;
    earthPivot.rotation.y += 0.008;
    earth.rotation.y += 0.02;
    moonPivot.rotation.y += 0.025;
    renderer3.render(scene3, camera3);
  });

  // Resize handler
  const handleResize = () => {
    [
      { container: container1, camera: camera1, renderer: renderer1, sizes: sizes1 },
      { container: container2, camera: camera2, renderer: renderer2, sizes: sizes2 },
      { container: container3, camera: camera3, renderer: renderer3, sizes: sizes3 }
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
  title: 'Parent-Child Relationships in Three.js'
})

useSeoMeta({
  title: 'Parent-Child Relationships in Three.js',
  ogTitle: 'Parent-Child Relationships in Three.js',
  description: 'Learn how to build object hierarchies using Object3D parent-child relationships and Groups in Three.js.',
  ogDescription: 'Learn how to build object hierarchies using Object3D parent-child relationships and Groups in Three.js.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/foundational-threejs/understanding-parent-child-relationships',
  twitterTitle: 'Parent-Child Relationships in Three.js',
  twitterDescription: 'Learn how to build object hierarchies using Object3D parent-child relationships and Groups in Three.js.',
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
