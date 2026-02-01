<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Raycasting and Mouse Events" tagline="Bridging the gap between screen clicks and 3D objects" />

      <main class="w-content page-top">
        <section class="content">

          <h2>The problem with clicking in 3D</h2>

          <p>In a normal web page, clicking a button is straightforward. The browser knows where the button is and fires a click event. In Three.js, you're rendering a 3D scene onto a flat 2D canvas. The browser has no idea that a cube or a character exists inside that canvas. As far as the DOM is concerned, it's just pixels. So how do you know which 3D object the user clicked on?</p>

          <p>The answer is <strong>raycasting</strong>. You shoot an invisible ray from the camera through the point on the screen where the user clicked, and check which objects in the scene that ray intersects. It's the fundamental technique for all mouse-based interaction in Three.js.</p>

          <h3>How raycasting works</h3>

          <p>A raycast works in three steps:</p>

          <ol>
            <li>Convert the mouse position from screen pixels to <strong>normalized device coordinates</strong> (NDC), a coordinate system where the center of the canvas is (0, 0), the top-right is (1, 1), and the bottom-left is (-1, -1).</li>
            <li>Use <code>Raycaster.setFromCamera()</code> to create a ray that starts at the camera and passes through that NDC point.</li>
            <li>Call <code>Raycaster.intersectObjects()</code> to test which objects the ray hits. The results come back sorted by distance, closest first.</li>
          </ol>

          <h3>Setting up the raycaster</h3>

          <p>Three.js gives you a <code>Raycaster</code> class that handles the math. You pair it with a <code>Vector2</code> to track the mouse position in NDC space.</p>

          <CodeBlock lang="typescript" :code="`const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();`" />

          <p>The raycaster and mouse vector are created once and reused. There's no need to instantiate new ones on every event.</p>

          <h3>Converting mouse coordinates</h3>

          <p>Browser mouse events give you pixel coordinates relative to the page. You need to convert those into the -1 to +1 range that the raycaster expects. If your canvas fills the full window, the conversion looks like this:</p>

          <CodeBlock lang="typescript" :code="`function onMouseMove(event) {
  // Convert pixel coordinates to NDC (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove);`" />

          <p>Notice that the Y axis is flipped. In the browser, Y increases downward. In NDC, Y increases upward. That's why there's a negation on the Y calculation.</p>

          <p>If your canvas doesn't fill the entire window, you'll need to account for the canvas's position and size using <code>getBoundingClientRect()</code>:</p>

          <CodeBlock lang="typescript" :code="`function onMouseMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

renderer.domElement.addEventListener('mousemove', onMouseMove);`" />

          <p>This version is more robust and works regardless of where the canvas sits on the page. It's the one you should default to in most projects.</p>

          <h3>Detecting intersections</h3>

          <p>With the mouse position tracked, you cast the ray and check for hits. This typically happens inside your animation loop or in response to a click event. Try clicking on the cubes below to see it in action:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="clickCanvas"></canvas>
            <div class="scene-label">{{ clickLabel }}</div>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`function onClick(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const firstHit = intersects[0];
    console.log('Hit:', firstHit.object.name);
    console.log('At point:', firstHit.point);
    console.log('Distance:', firstHit.distance);
  }
}

renderer.domElement.addEventListener('click', onClick);`" />

          <p>The <code>intersects</code> array contains objects with useful information:</p>

          <ul>
            <li><code>object</code>: The <code>Object3D</code> that was hit</li>
            <li><code>point</code>: The exact <code>Vector3</code> world position where the ray hit the surface</li>
            <li><code>distance</code>: How far the hit point is from the camera</li>
            <li><code>face</code>: The triangle face that was intersected</li>
            <li><code>faceIndex</code>: The index of that face in the geometry</li>
          </ul>

          <h3>Recursive intersection testing</h3>

          <p>By default, <code>intersectObjects</code> only tests the objects you pass in directly. If your scene uses groups or loaded models (which are deeply nested), you need to pass <code>true</code> as the second argument to test children recursively:</p>

          <CodeBlock lang="typescript" :code="`// Only tests direct children of the scene
raycaster.intersectObjects(scene.children);

// Tests all descendants, including nested meshes inside groups
raycaster.intersectObjects(scene.children, true);`" />

          <p>If you're working with loaded glTF models, you almost always want recursive mode. The meshes inside a loaded model are buried several levels deep in the scene graph.</p>

          <h3>Hover effects</h3>

          <p>A common pattern is highlighting objects when the user hovers over them. You do this by raycasting on every frame (or on mousemove) and tracking which object is currently under the cursor. Move your mouse over the shapes below:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="hoverCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`let hoveredObject = null;

function onMouseMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  // Reset the previous hover
  if (hoveredObject) {
    hoveredObject.material.emissive.setHex(0x000000);
    hoveredObject = null;
    document.body.style.cursor = 'default';
  }

  // Apply hover to the first hit
  if (intersects.length > 0) {
    hoveredObject = intersects[0].object;
    hoveredObject.material.emissive.setHex(0x333333);
    document.body.style.cursor = 'pointer';
  }
}`" />

          <p>The <code>emissive</code> property adds a glow-like tint to the material without replacing its base color. Setting it to a dark gray on hover gives a subtle but clear visual feedback. You can also swap materials entirely, change opacity, adjust scale, or do whatever makes sense for your project.</p>

          <h3>Limiting what gets tested</h3>

          <p>Raycasting against every object in the scene is wasteful if you only care about a few interactive objects. Instead, keep a separate array of clickable objects and test only against those. In the scene below, only the colored shapes are interactive. The gray background cubes are ignored by the raycaster entirely. Try hovering and clicking to see the difference:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="selectiveCanvas"></canvas>
            <div class="scene-label">{{ selectiveLabel }}</div>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`const clickableObjects = [];

// When creating interactive objects, add them to the array
const cube = new THREE.Mesh(geometry, material);
cube.name = 'interactive-cube';
scene.add(cube);
clickableObjects.push(cube);

// Raycast only against clickable objects
const intersects = raycaster.intersectObjects(clickableObjects, true);`" />

          <p>This is both a performance optimization and a way to keep your interaction logic clean. Background objects, ground planes, and decorative meshes won't interfere with your click handling.</p>

          <h3>Changing the cursor</h3>

          <p>A small but important detail is changing the cursor to indicate that something is interactive. The canvas element uses the default cursor by default, which gives users no hint that they can click on things. Updating <code>document.body.style.cursor</code> (or the canvas element's cursor style) based on hover state makes a big difference for usability.</p>

          <h3>Performance considerations</h3>

          <p>Raycasting is not free. It tests the ray against every triangle in every object you pass to <code>intersectObjects</code>. For simple scenes with a few dozen objects, this is fast enough that you won't notice. For complex scenes with high-poly models, it can become a bottleneck if you're doing it every frame.</p>

          <p>A few strategies to keep it fast:</p>

          <ul>
            <li>Limit the objects array to only interactive objects, as shown above</li>
            <li>Use simpler collision meshes (invisible low-poly versions) for raycast testing instead of the detailed visible meshes</li>
            <li>Throttle mousemove raycasts so they don't fire on every pixel of movement</li>
            <li>Set <code>raycaster.far</code> to limit how far the ray travels, skipping distant objects</li>
          </ul>

          <CodeBlock lang="typescript" :code="`// Only test objects within 100 units of the camera
raycaster.far = 100;

// Use layers to control what the raycaster can see
raycaster.layers.set(1);
interactiveMesh.layers.enable(1);`" />

          <p>The <code>layers</code> system is a useful alternative to maintaining your own arrays. Objects and raycasters each have a layer mask, and the raycaster only tests objects that share at least one enabled layer. This lets you tag objects as interactive without managing separate arrays.</p>

        </section>

        <LearnThreejsBottomNav
          prevLink="/learn-threejs/assets/traversing-loaded-models"
          prevText="Traversing loaded models"
          nextLink="/learn-threejs/interaction/interaction-managers-and-libraries"
          nextText="Interaction Managers and Libraries"
        />
      </main>
    </main>
  </section>

  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const clickCanvas = ref(null);
const hoverCanvas = ref(null);
const selectiveCanvas = ref(null);

const clickLabel = ref('Click on a cube');
const selectiveLabel = ref('Only colored shapes are interactive');

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!clickCanvas.value || !hoverCanvas.value || !selectiveCanvas.value) return;

  const animations = [];

  const createScene = (bgColor = 0x1a1a2e) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    return scene;
  };

  const createRendererPair = (canvas) => {
    const container = canvas.parentElement;
    const sizes = { width: container.clientWidth, height: container.clientHeight };

    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderers.push(renderer);

    return { camera, renderer, container, sizes };
  };

  // ===== SCENE 1: Click Detection =====
  const scene1 = createScene(0x1a1a2e);

  const light1 = new THREE.DirectionalLight(0xffffff, 1.2);
  light1.position.set(3, 4, 5);
  scene1.add(light1);
  scene1.add(new THREE.AmbientLight(0x404040, 0.8));

  const clickCubes = [];
  const cubeColors = [0x4488ff, 0xff4466, 0x44cc88, 0xffaa22, 0xaa44ff];
  const cubeGeom = new THREE.BoxGeometry(0.8, 0.8, 0.8);

  for (let i = 0; i < 5; i++) {
    const mat = new THREE.MeshStandardMaterial({ color: cubeColors[i] });
    const cube = new THREE.Mesh(cubeGeom, mat);
    cube.position.x = (i - 2) * 1.5;
    cube.name = `Cube ${i + 1}`;
    cube.userData.originalColor = cubeColors[i];
    cube.userData.originalScale = 1;
    scene1.add(cube);
    clickCubes.push(cube);
  }

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(clickCanvas.value);
  cam1.position.set(0, 1.5, 6);
  cam1.lookAt(0, 0, 0);

  const raycaster1 = new THREE.Raycaster();
  const mouse1 = new THREE.Vector2();

  clickCanvas.value.addEventListener('click', (event) => {
    const rect = ren1.domElement.getBoundingClientRect();
    mouse1.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse1.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster1.setFromCamera(mouse1, cam1);
    const intersects = raycaster1.intersectObjects(clickCubes);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      // Random new color on click
      const newColor = Math.random() * 0xffffff;
      hit.material.color.setHex(newColor);
      // Pop animation
      hit.scale.setScalar(1.3);
      hit.userData.popTime = 0.3;

      clickLabel.value = `Clicked: ${hit.name} at distance ${intersects[0].distance.toFixed(2)}`;
    }
  });

  animations.push((delta) => {
    clickCubes.forEach((cube) => {
      cube.rotation.y += 0.005;
      // Animate pop back to normal scale
      if (cube.userData.popTime > 0) {
        cube.userData.popTime -= delta;
        if (cube.userData.popTime <= 0) {
          cube.scale.setScalar(1);
        }
      }
    });
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: Hover Effects =====
  const scene2 = createScene(0x16213e);

  const light2 = new THREE.DirectionalLight(0xffffff, 1.2);
  light2.position.set(3, 4, 5);
  scene2.add(light2);
  scene2.add(new THREE.AmbientLight(0x404040, 0.8));

  const hoverObjects = [];
  const shapes = [
    { geom: new THREE.BoxGeometry(1, 1, 1), color: 0x4488ff, x: -2.5 },
    { geom: new THREE.SphereGeometry(0.6, 32, 32), color: 0xff4466, x: -0.8 },
    { geom: new THREE.ConeGeometry(0.6, 1.2, 32), color: 0x44cc88, x: 0.8 },
    { geom: new THREE.TorusGeometry(0.5, 0.2, 16, 32), color: 0xffaa22, x: 2.5 },
  ];

  shapes.forEach(({ geom, color, x }) => {
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.x = x;
    mesh.userData.originalColor = color;
    scene2.add(mesh);
    hoverObjects.push(mesh);
  });

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(hoverCanvas.value);
  cam2.position.set(0, 1, 5);
  cam2.lookAt(0, 0, 0);

  const raycaster2 = new THREE.Raycaster();
  const mouse2 = new THREE.Vector2();
  let hoveredObj = null;

  hoverCanvas.value.addEventListener('mousemove', (event) => {
    const rect = ren2.domElement.getBoundingClientRect();
    mouse2.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse2.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster2.setFromCamera(mouse2, cam2);
    const intersects = raycaster2.intersectObjects(hoverObjects);

    // Reset previous hover
    if (hoveredObj) {
      hoveredObj.material.emissive.setHex(0x000000);
      hoveredObj.scale.setScalar(1);
      hoveredObj = null;
      hoverCanvas.value.style.cursor = 'default';
    }

    if (intersects.length > 0) {
      hoveredObj = intersects[0].object;
      hoveredObj.material.emissive.setHex(0x333333);
      hoveredObj.scale.setScalar(1.15);
      hoverCanvas.value.style.cursor = 'pointer';
    }
  });

  hoverCanvas.value.addEventListener('mouseleave', () => {
    if (hoveredObj) {
      hoveredObj.material.emissive.setHex(0x000000);
      hoveredObj.scale.setScalar(1);
      hoveredObj = null;
      hoverCanvas.value.style.cursor = 'default';
    }
  });

  animations.push(() => {
    hoverObjects.forEach((obj) => {
      obj.rotation.y += 0.008;
    });
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: Selective Raycasting =====
  const scene3 = createScene(0x1e3a5f);

  const light3 = new THREE.DirectionalLight(0xffffff, 1.2);
  light3.position.set(3, 4, 5);
  scene3.add(light3);
  scene3.add(new THREE.AmbientLight(0x404040, 0.8));

  const interactiveObjects = [];

  // Non-interactive background cubes (gray)
  const bgGeom = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const bgMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.9 });
  for (let i = 0; i < 12; i++) {
    const bg = new THREE.Mesh(bgGeom, bgMat.clone());
    bg.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4 - 1
    );
    bg.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    bg.userData.isBackground = true;
    scene3.add(bg);
  }

  // Interactive colored shapes in the foreground
  const interactiveShapes = [
    { geom: new THREE.IcosahedronGeometry(0.6, 0), color: 0xff6644, x: -2 },
    { geom: new THREE.OctahedronGeometry(0.6, 0), color: 0x44bbff, x: 0 },
    { geom: new THREE.TorusKnotGeometry(0.4, 0.15, 64, 16), color: 0x88ff44, x: 2 },
  ];

  interactiveShapes.forEach(({ geom, color, x }) => {
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.x = x;
    mesh.userData.originalColor = color;
    scene3.add(mesh);
    interactiveObjects.push(mesh);
  });

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(selectiveCanvas.value);
  cam3.position.set(0, 0.5, 5);
  cam3.lookAt(0, 0, 0);

  const raycaster3 = new THREE.Raycaster();
  const mouse3 = new THREE.Vector2();
  let hoveredObj3 = null;

  selectiveCanvas.value.addEventListener('mousemove', (event) => {
    const rect = ren3.domElement.getBoundingClientRect();
    mouse3.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse3.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster3.setFromCamera(mouse3, cam3);
    // Only test interactive objects, not background cubes
    const intersects = raycaster3.intersectObjects(interactiveObjects);

    if (hoveredObj3) {
      hoveredObj3.material.emissive.setHex(0x000000);
      hoveredObj3.scale.setScalar(1);
      hoveredObj3 = null;
      selectiveCanvas.value.style.cursor = 'default';
    }

    if (intersects.length > 0) {
      hoveredObj3 = intersects[0].object;
      hoveredObj3.material.emissive.setHex(0x333333);
      hoveredObj3.scale.setScalar(1.15);
      selectiveCanvas.value.style.cursor = 'pointer';
    }
  });

  selectiveCanvas.value.addEventListener('click', (event) => {
    const rect = ren3.domElement.getBoundingClientRect();
    mouse3.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse3.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster3.setFromCamera(mouse3, cam3);
    const intersects = raycaster3.intersectObjects(interactiveObjects);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const newColor = Math.random() * 0xffffff;
      hit.material.color.setHex(newColor);
      hit.scale.setScalar(1.3);
      hit.userData.popTime = 0.3;
      selectiveLabel.value = `Clicked interactive shape at (${intersects[0].point.x.toFixed(1)}, ${intersects[0].point.y.toFixed(1)}, ${intersects[0].point.z.toFixed(1)})`;
    } else {
      selectiveLabel.value = 'Missed! Gray cubes are not in the interactive array';
    }
  });

  selectiveCanvas.value.addEventListener('mouseleave', () => {
    if (hoveredObj3) {
      hoveredObj3.material.emissive.setHex(0x000000);
      hoveredObj3.scale.setScalar(1);
      hoveredObj3 = null;
      selectiveCanvas.value.style.cursor = 'default';
    }
  });

  animations.push((delta) => {
    interactiveObjects.forEach((obj) => {
      obj.rotation.y += 0.01;
      if (obj.userData.popTime > 0) {
        obj.userData.popTime -= delta;
        if (obj.userData.popTime <= 0) {
          obj.scale.setScalar(1);
        }
      }
    });
    ren3.render(scene3, cam3);
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 },
    { container: con3, camera: cam3, renderer: ren3, sizes: sz3 },
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
  const clock = new THREE.Clock();
  const tick = () => {
    const delta = clock.getDelta();
    animations.forEach(fn => fn(delta));
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
  title: 'Raycasting and Mouse Events in Three.js'
})

useSeoMeta({
  title: 'Raycasting and Mouse Events in Three.js',
  ogTitle: 'Raycasting and Mouse Events in Three.js',
  description: 'Learn how to make 3D objects interactive in Three.js using raycasting, mouse events, hover effects, and click detection.',
  ogDescription: 'Learn how to make 3D objects interactive in Three.js using raycasting, mouse events, hover effects, and click detection.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/interaction/raycasting-and-mouse-events',
  twitterTitle: 'Raycasting and Mouse Events in Three.js',
  twitterDescription: 'Learn how to make 3D objects interactive in Three.js using raycasting, mouse events, hover effects, and click detection.',
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

.scene-label {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-family: monospace;
  pointer-events: none;
}
</style>
