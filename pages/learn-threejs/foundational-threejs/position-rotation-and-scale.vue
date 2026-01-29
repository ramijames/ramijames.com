<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Position, Rotation, and Scale" tagline="The three fundamental transforms" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Transforming Objects in 3D Space</h2>

          <p>Every object in Three.js has three fundamental properties that control where it is and how it appears: <strong>position</strong>, <strong>rotation</strong>, and <strong>scale</strong>. These are all inherited from <code>Object3D</code>, so they work the same way for meshes, groups, lights, and cameras.</p>

          <h3>Position</h3>

          <p>Position is a <code>Vector3</code> that defines where an object sits in 3D space. The three axes are:</p>
          <ul>
            <li><strong>X</strong> - Left/Right (positive = right)</li>
            <li><strong>Y</strong> - Up/Down (positive = up)</li>
            <li><strong>Z</strong> - Forward/Back (positive = toward camera)</li>
          </ul>

          <div class="scene-container">
            <canvas ref="positionCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`// Set position properties individually
mesh.position.x = 2;
mesh.position.y = 1;
mesh.position.z = -3;

// Or use the set() method
mesh.position.set(2, 1, -3);

// Position is a Vector3, so you can use vector methods
mesh.position.copy(otherMesh.position);
mesh.position.add(new THREE.Vector3(1, 0, 0));
mesh.position.multiplyScalar(2);

// Get distance from another point
const distance = mesh.position.distanceTo(camera.position);

// Get length (distance from origin)
const length = mesh.position.length();`" />

          <h3>Rotation</h3>

          <p>Rotation uses <strong>Euler angles</strong> by default, which are three values representing rotation around each axis, measured in <strong>radians</strong> (not degrees). A full rotation is <code>Math.PI * 2</code> (approximately 6.28). If you need a refresher on Radians, I highly suggest <a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:trig/x2ec2f6f830c9fb89:radians/v/radian-and-degree-conversion-practice">this video on Khan Academy</a> for what they are and why we use them instead of Degrees.</p>

          <div class="scene-container">
            <canvas ref="rotationCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`// Rotate around each axis (in radians)
mesh.rotation.x = Math.PI / 4;  // 45 degrees
mesh.rotation.y = Math.PI / 2;  // 90 degrees
mesh.rotation.z = Math.PI;      // 180 degrees

// Use set() for all at once
mesh.rotation.set(0, Math.PI / 4, 0);

// Convert degrees to radians
const degrees = 45;
mesh.rotation.y = THREE.MathUtils.degToRad(degrees);

// Rotation order matters! Default is 'XYZ'
mesh.rotation.order = 'YXZ'; // Rotate Y first, then X, then Z`" />

          <p>The order that rotations are applied matters. If you're getting unexpected results, try changing <code>rotation.order</code>. For character controllers, <code>'YXZ'</code> is often more intuitive.</p>

          <h4>Quaternions</h4>

          <p>For complex rotations or smooth interpolation, use <strong>quaternions</strong> instead of Euler angles. They avoid "gimbal lock" (where axes align and you lose a degree of freedom):</p>

          <CodeBlock lang="typescript" :code="`// Set rotation using quaternion
mesh.quaternion.setFromAxisAngle(
  new THREE.Vector3(0, 1, 0),  // axis to rotate around
  Math.PI / 4                   // angle in radians
);

// Smoothly interpolate between rotations
mesh.quaternion.slerp(targetQuaternion, 0.1);

// Look at a point (uses quaternion internally)
mesh.lookAt(0, 0, 0);
mesh.lookAt(targetMesh.position);`" />

          <p>If you're new to Quaternions, I highly suggest <a href="https://www.youtube.com/watch?v=d4EgbgTm0Bg">this 3Blue1Brown video</a>.</p>

          <h3>Scale</h3>

          <p>Scale multiplies the size of an object along each axis. A scale of 1 is the original size, 2 is double, 0.5 is half.</p>

          <div class="scene-container">
            <canvas ref="scaleCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`// Scale each axis independently
mesh.scale.x = 2;   // Stretch horizontally
mesh.scale.y = 0.5; // Squash vertically
mesh.scale.z = 1;   // Keep depth the same

// Uniform scaling (same on all axes)
mesh.scale.set(1.5, 1.5, 1.5);
// or
mesh.scale.setScalar(1.5);

// Scale is also a Vector3
mesh.scale.multiplyScalar(2); // Double the current scale`" />

          <h3>Combining Transforms</h3>

          <p>You can combine all three transforms on a single object. Internally, Three.js combines these into a <strong>transformation matrix</strong> and saves you the headache of doing this manually, one by one.</p>

          <div class="scene-container">
            <canvas ref="combinedCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`// All transforms together
mesh.position.set(2, 0, 0);
mesh.rotation.set(0, Math.PI / 4, 0);
mesh.scale.set(1, 2, 1);

// The order of operations is always:
// 1. Scale
// 2. Rotate
// 3. Translate (position)

// Force matrix update (usually automatic)
mesh.updateMatrix();

// Access the combined transformation matrix
console.log(mesh.matrix);`" />

          <h3>Helper Methods</h3>

          <p>Three.js provides convenient methods for relative transforms and when possible, you should use them.</p>

          <CodeBlock lang="typescript" :code="`// Translate relative to current position
mesh.translateX(1);  // Move 1 unit along local X axis
mesh.translateY(2);  // Move 2 units along local Y axis
mesh.translateZ(-1); // Move 1 unit along local Z axis

// These respect the object's rotation!
// translateZ moves forward relative to where the object is facing

// Rotate relative to current rotation
mesh.rotateX(0.1);
mesh.rotateY(0.1);
mesh.rotateZ(0.1);

// Rotate around world axis (not local)
mesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.1);

// Point at something
mesh.lookAt(target.position);
camera.lookAt(scene.position);`" />

          <h3>Local vs World Space</h3>

          <p>Local space defines an object's position relative to its parent, meaning if you move a car, the steering wheel’s local coordinates remain unchanged. World space is the "big picture" view, representing an object's absolute location relative to the scene’s origin (0,0,0) regardless of its parentage.</p>
            
          <p>You typically use local space for internal motions like a character’s arm swinging, while world space is essential for global logic like physics and collision detection. Since Three.js defaults to local coordinates for its .position property, you must use methods like .getWorldPosition() to find an object's true location in the universe.</p>

          <p>To get or set world-space values:</p>

          <CodeBlock lang="typescript" :code="`// Get world position (accounting for all parents)
const worldPos = new THREE.Vector3();
mesh.getWorldPosition(worldPos);

// Get world rotation
const worldQuat = new THREE.Quaternion();
mesh.getWorldQuaternion(worldQuat);

// Get world scale
const worldScale = new THREE.Vector3();
mesh.getWorldScale(worldScale);

// Convert between local and world
const localPoint = new THREE.Vector3(1, 0, 0);
const worldPoint = mesh.localToWorld(localPoint.clone());
const backToLocal = mesh.worldToLocal(worldPoint.clone());`" />

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/foundational-threejs/understanding-parent-child-relationships"
    prevText="Parent-Child Relationships"
    nextLink="/learn-threejs/foundational-threejs/the-animation-loop"
    nextText="The Animation Loop"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const positionCanvas = ref(null);
const rotationCanvas = ref(null);
const scaleCanvas = ref(null);
const combinedCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(() => {
  if (!positionCanvas.value || !rotationCanvas.value || !scaleCanvas.value || !combinedCanvas.value) return;

  const animations = [];

  // Helper to create axis lines
  const createAxesHelper = (size = 2) => {
    const axes = new THREE.Group();

    // X axis (red)
    const xMat = new THREE.LineBasicMaterial({ color: 0xff4444 });
    const xGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(size, 0, 0)
    ]);
    axes.add(new THREE.Line(xGeom, xMat));

    // Y axis (green)
    const yMat = new THREE.LineBasicMaterial({ color: 0x44ff44 });
    const yGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, size, 0)
    ]);
    axes.add(new THREE.Line(yGeom, yMat));

    // Z axis (blue)
    const zMat = new THREE.LineBasicMaterial({ color: 0x4444ff });
    const zGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, size)
    ]);
    axes.add(new THREE.Line(zGeom, zMat));

    return axes;
  };

  // ===== SCENE 1: Position Demo =====
  const scene1 = new THREE.Scene();
  scene1.background = new THREE.Color(0x1a1a2e);

  const mat1 = new THREE.MeshNormalMaterial();
  const cubes1 = [];

  // Create cubes at different positions
  for (let i = 0; i < 3; i++) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), mat1);
    scene1.add(cube);
    cubes1.push(cube);
  }

  scene1.add(createAxesHelper(3));

  const container1 = positionCanvas.value.parentElement;
  const sizes1 = { width: container1.clientWidth, height: container1.clientHeight };

  const camera1 = new THREE.PerspectiveCamera(75, sizes1.width / sizes1.height, 0.1, 100);
  camera1.position.set(3, 3, 5);
  camera1.lookAt(0, 0, 0);

  const renderer1 = new THREE.WebGLRenderer({ canvas: positionCanvas.value, antialias: true });
  renderer1.setSize(sizes1.width, sizes1.height);
  renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer1);

  let time1 = 0;
  animations.push(() => {
    time1 += 0.02;
    // Animate cubes along different axes
    cubes1[0].position.x = Math.sin(time1) * 2;
    cubes1[1].position.y = Math.sin(time1 * 0.8) * 2;
    cubes1[2].position.z = Math.sin(time1 * 0.6) * 2;
    renderer1.render(scene1, camera1);
  });

  // ===== SCENE 2: Rotation Demo =====
  const scene2 = new THREE.Scene();
  scene2.background = new THREE.Color(0x16213e);

  const mat2 = new THREE.MeshNormalMaterial();
  const cubes2 = [];

  // Create cubes that rotate on different axes
  const positions2 = [[-2, 0, 0], [0, 0, 0], [2, 0, 0]];
  positions2.forEach(pos => {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), mat2);
    cube.position.set(...pos);
    scene2.add(cube);
    cubes2.push(cube);
  });

  const container2 = rotationCanvas.value.parentElement;
  const sizes2 = { width: container2.clientWidth, height: container2.clientHeight };

  const camera2 = new THREE.PerspectiveCamera(75, sizes2.width / sizes2.height, 0.1, 100);
  camera2.position.set(0, 2, 5);
  camera2.lookAt(0, 0, 0);

  const renderer2 = new THREE.WebGLRenderer({ canvas: rotationCanvas.value, antialias: true });
  renderer2.setSize(sizes2.width, sizes2.height);
  renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer2);

  animations.push(() => {
    // Rotate each cube on a different axis
    cubes2[0].rotation.x += 0.02; // Pitch
    cubes2[1].rotation.y += 0.02; // Yaw
    cubes2[2].rotation.z += 0.02; // Roll
    renderer2.render(scene2, camera2);
  });

  // ===== SCENE 3: Scale Demo =====
  const scene3 = new THREE.Scene();
  scene3.background = new THREE.Color(0x1e3a5f);

  const mat3 = new THREE.MeshNormalMaterial();
  const cubes3 = [];

  // Create cubes that scale differently
  const positions3 = [[-2, 0, 0], [0, 0, 0], [2, 0, 0]];
  positions3.forEach(pos => {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), mat3);
    cube.position.set(...pos);
    scene3.add(cube);
    cubes3.push(cube);
  });

  const container3 = scaleCanvas.value.parentElement;
  const sizes3 = { width: container3.clientWidth, height: container3.clientHeight };

  const camera3 = new THREE.PerspectiveCamera(75, sizes3.width / sizes3.height, 0.1, 100);
  camera3.position.set(0, 2, 5);
  camera3.lookAt(0, 0, 0);

  const renderer3 = new THREE.WebGLRenderer({ canvas: scaleCanvas.value, antialias: true });
  renderer3.setSize(sizes3.width, sizes3.height);
  renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer3);

  let time3 = 0;
  animations.push(() => {
    time3 += 0.02;
    const s = Math.sin(time3) * 0.5 + 1; // Oscillate between 0.5 and 1.5

    // Scale X only
    cubes3[0].scale.set(s, 1, 1);
    // Scale Y only
    cubes3[1].scale.set(1, s, 1);
    // Uniform scale
    cubes3[2].scale.setScalar(s);

    // Add rotation for visual interest
    cubes3.forEach(c => c.rotation.y += 0.01);

    renderer3.render(scene3, camera3);
  });

  // ===== SCENE 4: Combined Transforms =====
  const scene4 = new THREE.Scene();
  scene4.background = new THREE.Color(0x0d1b2a);

  const mat4 = new THREE.MeshNormalMaterial();
  const cube4 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat4);
  scene4.add(cube4);

  // Add a "ghost" cube showing the original position
  const ghostMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  const ghost = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), ghostMat);
  scene4.add(ghost);

  scene4.add(createAxesHelper(2));

  const container4 = combinedCanvas.value.parentElement;
  const sizes4 = { width: container4.clientWidth, height: container4.clientHeight };

  const camera4 = new THREE.PerspectiveCamera(75, sizes4.width / sizes4.height, 0.1, 100);
  camera4.position.set(3, 3, 5);
  camera4.lookAt(0, 0, 0);

  const renderer4 = new THREE.WebGLRenderer({ canvas: combinedCanvas.value, antialias: true });
  renderer4.setSize(sizes4.width, sizes4.height);
  renderer4.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(renderer4);

  let time4 = 0;
  animations.push(() => {
    time4 += 0.01;

    // Combine all three transforms
    cube4.position.x = Math.sin(time4) * 2;
    cube4.position.y = Math.sin(time4 * 2) * 0.5;
    cube4.rotation.y = time4;
    cube4.rotation.x = Math.sin(time4) * 0.3;
    cube4.scale.setScalar(1 + Math.sin(time4 * 3) * 0.2);

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
  title: 'Position, Rotation, and Scale in Three.js'
})

useSeoMeta({
  title: 'Position, Rotation, and Scale in Three.js',
  ogTitle: 'Position, Rotation, and Scale in Three.js',
  description: 'Learn how to transform objects in Three.js using position, rotation, and scale properties.',
  ogDescription: 'Learn how to transform objects in Three.js using position, rotation, and scale properties.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/foundational-threejs/position-rotation-and-scale',
  twitterTitle: 'Position, Rotation, and Scale in Three.js',
  twitterDescription: 'Learn how to transform objects in Three.js using position, rotation, and scale properties.',
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
