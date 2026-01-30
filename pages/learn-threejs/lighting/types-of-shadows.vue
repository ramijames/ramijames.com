<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Types of Shadows" tagline="How shadow mapping works in Three.js and how to configure it for each light type" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Shadows bring your scene to life</h2>

          <p>Shadows anchor objects in space. Without them, a sphere hovering above a plane looks like it's pasted on top of a flat image. Add a shadow beneath it, and suddenly the viewer understands the relationship between it and its surroundings.</p>

          <p>Three.js doesn't compute shadows automatically. You have to explicitly opt in at three levels: the renderer, the light, and each mesh. This design is intentional because shadows are one of the most expensive operations in real-time 3D, so Three.js gives you full control over where you spend that budget. You have to be careful with how complex your shadow design is. Go overboard and it will tank your framerate.</p>

          <h2>The three-step setup for shadows</h2>

          <p>Before any shadow appears in your scene, you need to enable three things:</p>

          <ol>
            <li><strong>The renderer</strong> must have shadow mapping turned on.</li>
            <li><strong>The light</strong> must be marked as a shadow caster.</li>
            <li><strong>Each mesh</strong> must declare whether it casts shadows, receives shadows, or both.</li>
          </ol>

          <p>Miss any one of these and you'll see no shadows at all. God knows this is the most common source of "why aren't my shadows working?" for me. It's like the "phone, wallet, keys" of leaving the house. "Renderer, light, mesh", say it with me.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="basicShadowCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows the minimum viable shadow setup which includes a directional light casting shadows from a sphere onto a floor plane. The sphere has <code>castShadow = true</code>, the floor has <code>receiveShadow = true</code>, and the light and renderer are both shadow-enabled.</p>

          <CodeBlock lang="typescript" :code="`// Step 1: Enable shadow maps on the renderer
renderer.shadowMap.enabled = true;

// Step 2: Make the light cast shadows
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.castShadow = true;
scene.add(dirLight);

// Step 3: Tell meshes to cast and/or receive shadows
sphere.castShadow = true;     // This object blocks light
floor.receiveShadow = true;   // This surface shows shadows

// Common gotcha: if you forget ANY of these three steps,
// no shadows will appear. All three are required.`" />

          <h2>Shadow map yypes</h2>

          <p>Three.js offers several shadow mapping algorithms, each with different quality and performance characteristics. You set the algorithm <strong>on the renderer, and it applies to all shadows in the scene</strong>.</p>

          <h3>BasicShadowMap</h3>

          <p><code>THREE.BasicShadowMap</code> is the fastest and simplest algorithm. It produces hard-edged shadows with visible aliasing (staircase artifacts along shadow edges). Each texel in the shadow map maps directly to a pixel, so no filtering and no smoothing. It looks so-so, but it is cheap and relatively fast.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="basicMapCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>Notice the jagged, pixelated edges of the shadow? This is the raw shadow map with no filtering applied. It's fast but rarely looks good enough for final output.</p>

          <CodeBlock lang="typescript" :code="`renderer.shadowMap.type = THREE.BasicShadowMap;

// Pros: Fastest shadow rendering
// Cons: Hard, aliased edges — visible stairstepping
// Use when: Performance is critical and shadow quality
// doesn't matter (e.g., mobile, VR, many shadow casters)`" />

          <h3>PCFShadowMap (Default)</h3>

          <p><code>THREE.PCFShadowMap</code> is the default algorithm. PCF stands for <strong>Percentage-Closer Filtering</strong>. It samples multiple points around each shadow texel and averages them, producing softer edges. The shadow is still fundamentally hard (the penumbra doesn't grow with distance), but the aliasing is smoothed out.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="pcfMapCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The shadow edges are noticeably smoother than BasicShadowMap. This is the default for a reason. It's a good balance of quality and performance for most scenes. Unless you have a damned good reason, you should be using this.</p>

          <CodeBlock lang="typescript" :code="`renderer.shadowMap.type = THREE.PCFShadowMap;

// Pros: Smooth edges, reasonable performance
// Cons: Shadows are still uniformly sharp (no soft penumbra)
// Use when: Default choice for most projects`" />

          <h3>PCFSoftShadowMap</h3>

          <p><code>THREE.PCFSoftShadowMap</code> extends PCF with a larger filter kernel, producing visibly softer shadows. The edges blur more, which hides aliasing better and gives a more natural appearance. The cost is higher than standard PCF but still reasonable for most desktop scenes.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="pcfSoftMapCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>Compare this to the PCF demo above and you'll see that the shadow edges are noticeably softer and more diffuse. This is often the best choice when you want natural-looking shadows without the cost of VSM.</p>

          <CodeBlock lang="typescript" :code="`renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Pros: Soft, natural-looking edges
// Cons: Slightly more expensive than PCF
// Use when: You want softer shadows without
// the artifacts that come with VSM`" />

          <h3>VSMShadowMap</h3>

          <p><code>THREE.VSMShadowMap</code> uses <strong>Variance Shadow Mapping</strong>, a fundamentally different approach to generating shadows. Instead of storing a single depth value per texel, it stores the depth and the depth squared, which lets the shader compute a probabilistic soft shadow. VSM produces the softest shadows and can be blurred further, but it's prone to <strong>light bleeding</strong>, which you'll see in your scene as bright halos where two shadow casters overlap.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="vsmMapCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>These shadows are the softest of all four algorithms. VSM works well for single shadow casters, but watch out for light bleeding artifacts in complex scenes with overlapping shadows.</p>

          <CodeBlock lang="typescript" :code="`renderer.shadowMap.type = THREE.VSMShadowMap;

// Pros: Softest shadows, can be blurred with radius
// Cons: Light bleeding artifacts, more GPU memory
// Use when: Single or few shadow casters, soft aesthetic

// VSM supports shadow radius for additional blur:
dirLight.shadow.radius = 4;  // Only works with VSM`" />

          <h2>Shadow camera configuration</h2>

          <p>Every shadow-casting light has a hidden camera, the <strong>shadow camera</strong>, that renders the scene from the light's perspective into a depth texture (the shadow map). The quality and coverage of your shadows depends entirely on how this camera is configured.</p>

          <p>For a <code>DirectionalLight</code>, the shadow camera is orthographic. Its <code>left</code>, <code>right</code>, <code>top</code>, and <code>bottom</code> bounds define the rectangular area that receives shadows. Anything outside this box won't cast or receive shadows.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="shadowCameraCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows a camera helper visualizing the shadow camera's frustum. The blue box outlines exactly which area of the scene is covered by the shadow map. Objects outside this box won't have shadows. Making the box too large wastes resolution; making it too small clips shadows.</p>

          <CodeBlock lang="typescript" :code="`// Configure the directional light's shadow camera
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.castShadow = true;

// Shadow camera bounds (orthographic for DirectionalLight)
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 50;

// Shadow map resolution (higher = sharper, more expensive)
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

// Visualize the shadow camera during development
const helper = new THREE.CameraHelper(dirLight.shadow.camera);
scene.add(helper);

// Common resolutions:
// 512x512   — low quality, fast
// 1024x1024 — medium (good default)
// 2048x2048 — high quality
// 4096x4096 — very high (expensive)`" />

          <h2>Shadow bias and artifacts</h2>

          <p>Shadow mapping suffers from a fundamental precision problem: the shadow map is a finite-resolution grid, and when a surface tries to shadow itself, tiny rounding errors create a pattern of alternating light and dark bands called <strong>shadow acne</strong>. The <code>bias</code> property offsets the shadow depth comparison to eliminate this artifact.</p>

          <p>But push the bias too far and you get <strong>peter panning</strong> — the shadow detaches from the base of the object and appears to float. Finding the right bias is a balancing act between these two artifacts.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="biasCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows three objects. The left object has no bias applied. Notice the moire pattern of shadow acne on the surfaces. The center object has a moderate bias that eliminates acne. The right object has excessive bias, i.e. the shadow has detached from the base (peter panning).</p>

          <CodeBlock lang="typescript" :code="`// Shadow bias: fixes shadow acne vs peter panning
dirLight.shadow.bias = -0.005;     // Small negative value
dirLight.shadow.normalBias = 0.02; // Pushes along surface normal

// bias: offsets the depth comparison directly.
//   Too little → shadow acne (self-shadowing artifacts)
//   Too much  → peter panning (shadow floats away)
//   Start at -0.005 and adjust from there.

// normalBias: offsets along the surface normal.
//   Helps with acne on curved surfaces without
//   causing peter panning. Usually 0.01 to 0.05.

// Typical good starting values:
dirLight.shadow.bias = -0.005;
dirLight.shadow.normalBias = 0.02;`" />

          <h2>Shadows per light type</h2>

          <p>Not all lights support shadows, and those that do handle them differently. Here's the breakdown:</p>

          <ul>
            <li><strong>DirectionalLight</strong>: Orthographic shadow camera. Single shadow map pass. Best for outdoor/sun shadows. Cheapest shadow-capable light.</li>
            <li><strong>SpotLight</strong>: Perspective shadow camera matching the cone. Single shadow map pass. Good balance of cost and quality for focused lights.</li>
            <li><strong>PointLight</strong>: Renders a cube shadow map (six passes, one per face). Most expensive shadow type. Use sparingly.</li>
            <li><strong>AmbientLight</strong>: No shadows. By definition, ambient light has no direction.</li>
            <li><strong>HemisphereLight</strong>: No shadows. Sky/ground fill has no single direction to cast from.</li>
            <li><strong>RectAreaLight</strong>: No native shadow support in Three.js.</li>
          </ul>

          <h3>SpotLight shadows</h3>

          <p>The spotlight's shadow camera is a perspective camera that matches the cone's angle and range. This means the shadow map resolution is concentrated where the light actually shines, making spotlights more shadow-efficient than directional lights for focused areas.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="spotShadowCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`const spotLight = new THREE.SpotLight(0xffffff, 80, 30);
spotLight.castShadow = true;
spotLight.position.set(0, 8, 0);

// The shadow camera automatically matches the spotlight cone
// but you can still configure resolution and bias:
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.bias = -0.005;

// The shadow camera's fov matches the spotlight angle,
// and the far plane matches the spotlight distance.
// You rarely need to adjust these manually.`" />

          <h3>PointLight shadows</h3>

          <p>Point lights emit in all directions, so a single 2D shadow map can't capture the full scene. Instead, Three.js renders six shadow maps, one for each face of a cube, creating a <strong>cube shadow map</strong>. This means a single point light shadow costs six render passes, making it the most expensive shadow type by far.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="pointShadowCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`const pointLight = new THREE.PointLight(0xff9944, 50, 20, 2);
pointLight.castShadow = true;
pointLight.position.set(0, 4, 0);

// Resolution applies to EACH of the 6 cube faces
// So 1024x1024 actually uses 6x the memory of a
// directional light at the same resolution
pointLight.shadow.mapSize.width = 512;
pointLight.shadow.mapSize.height = 512;
pointLight.shadow.bias = -0.005;

// Point light shadow cameras use near/far:
pointLight.shadow.camera.near = 0.5;
pointLight.shadow.camera.far = 20;`" />

          <h2>Performance guidelines</h2>

          <p>Shadows are where performance budgets go to die in Three.js. Every shadow-casting light adds at least one full scene render pass (six for point lights). Here are the rules of thumb:</p>

          <ul>
            <li><strong>Minimize shadow casters.</strong> Only enable <code>castShadow</code> on objects that actually need visible shadows. A background mountain range doesn't need to cast shadows.</li>
            <li><strong>Minimize shadow receivers.</strong> Only enable <code>receiveShadow</code> on surfaces where shadows will actually land. The sky doesn't need to receive shadows.</li>
            <li><strong>Use the smallest shadow map that looks acceptable.</strong> 1024x1024 is often sufficient. 2048x2048 is a luxury. 4096x4096 is rarely worth the cost.</li>
            <li><strong>Tighten the shadow camera frustum.</strong> The shadow camera should cover only the area that matters. A directional light shadow camera covering a 100x100 area will produce blurry shadows; the same resolution covering 10x10 will be sharp.</li>
            <li><strong>Prefer directional and spot shadows over point shadows.</strong> One pass versus six is a significant difference.</li>
            <li><strong>Consider baked shadows.</strong> For static scenes, you can pre-compute shadows as textures and apply them to the floor. Zero runtime cost.</li>
          </ul>

          <CodeBlock lang="typescript" :code="`// Performance-optimized shadow setup
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
sunLight.castShadow = true;

// Tight frustum — only cover the play area
sunLight.shadow.camera.left = -8;
sunLight.shadow.camera.right = 8;
sunLight.shadow.camera.top = 8;
sunLight.shadow.camera.bottom = -8;
sunLight.shadow.camera.near = 1;
sunLight.shadow.camera.far = 20;

// Moderate resolution
sunLight.shadow.mapSize.set(1024, 1024);

// Only flag objects that need shadows
player.castShadow = true;
player.receiveShadow = true;
ground.receiveShadow = true;
// decorativeParticles.castShadow = false; // skip these`" />

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/lighting/types-of-lighting"
    prevText="Types of Lighting"
    nextLink="/learn-threejs/lighting/transparency-in-shadows"
    nextText="Transparency in Shadows"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const basicShadowCanvas = ref(null);
const basicMapCanvas = ref(null);
const pcfMapCanvas = ref(null);
const pcfSoftMapCanvas = ref(null);
const vsmMapCanvas = ref(null);
const shadowCameraCanvas = ref(null);
const biasCanvas = ref(null);
const spotShadowCanvas = ref(null);
const pointShadowCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (
    !basicShadowCanvas.value || !basicMapCanvas.value ||
    !pcfMapCanvas.value || !pcfSoftMapCanvas.value ||
    !vsmMapCanvas.value || !shadowCameraCanvas.value ||
    !biasCanvas.value || !spotShadowCanvas.value ||
    !pointShadowCanvas.value
  ) return;

  const animations = [];

  const createScene = (bgColor = 0x111122) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    return scene;
  };

  const createRendererPair = (canvas, shadowType = THREE.PCFSoftShadowMap) => {
    const container = canvas.parentElement;
    const sizes = { width: container.clientWidth, height: container.clientHeight };

    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = shadowType;
    renderers.push(renderer);

    return { camera, renderer, container, sizes };
  };

  const sphereGeom = new THREE.SphereGeometry(1.0, 64, 64);
  const boxGeom = new THREE.BoxGeometry(1.4, 1.4, 1.4);
  const floorGeom = new THREE.PlaneGeometry(30, 30);

  const standardMat = (color = 0xcccccc, roughness = 0.5, metalness = 0.1) => {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
  };

  const floorMat = () => {
    return new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.8, metalness: 0.0 });
  };

  const addFloor = (scene) => {
    const floor = new THREE.Mesh(floorGeom, floorMat());
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    floor.receiveShadow = true;
    scene.add(floor);
    return floor;
  };

  const addShadowDirLight = (scene, mapSize = 1024) => {
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(5, 8, 5);
    light.castShadow = true;
    light.shadow.mapSize.width = mapSize;
    light.shadow.mapSize.height = mapSize;
    light.shadow.camera.left = -8;
    light.shadow.camera.right = 8;
    light.shadow.camera.top = 8;
    light.shadow.camera.bottom = -8;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 30;
    light.shadow.bias = -0.005;
    light.shadow.normalBias = 0.02;
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404060, 0.3));
    return light;
  };

  // ===== SCENE 1: Basic Shadow Setup =====
  const scene1 = createScene();

  const basicSphere = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  basicSphere.position.set(-1.5, 0, 0);
  basicSphere.castShadow = true;
  scene1.add(basicSphere);

  const basicBox = new THREE.Mesh(boxGeom, standardMat(0x4488cc));
  basicBox.position.set(1.8, -0.1, 0);
  basicBox.castShadow = true;
  scene1.add(basicBox);

  addFloor(scene1);
  addShadowDirLight(scene1);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(basicShadowCanvas.value);
  cam1.position.set(0, 4, 8);
  cam1.lookAt(0, -0.5, 0);

  let basicTime = 0;
  animations.push(() => {
    basicTime += 0.01;
    basicSphere.position.y = Math.sin(basicTime) * 0.8 + 0.5;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: BasicShadowMap =====
  const scene2 = createScene();

  const bsmSphere = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  bsmSphere.position.set(-1.5, 0, 0);
  bsmSphere.castShadow = true;
  scene2.add(bsmSphere);

  const bsmBox = new THREE.Mesh(boxGeom, standardMat(0x4488cc));
  bsmBox.position.set(1.8, -0.1, 0);
  bsmBox.castShadow = true;
  scene2.add(bsmBox);

  addFloor(scene2);
  addShadowDirLight(scene2, 512);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(basicMapCanvas.value, THREE.BasicShadowMap);
  cam2.position.set(0, 4, 8);
  cam2.lookAt(0, -0.5, 0);

  animations.push(() => {
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: PCFShadowMap =====
  const scene3 = createScene();

  const pcfSphere = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  pcfSphere.position.set(-1.5, 0, 0);
  pcfSphere.castShadow = true;
  scene3.add(pcfSphere);

  const pcfBox = new THREE.Mesh(boxGeom, standardMat(0x4488cc));
  pcfBox.position.set(1.8, -0.1, 0);
  pcfBox.castShadow = true;
  scene3.add(pcfBox);

  addFloor(scene3);
  addShadowDirLight(scene3, 512);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(pcfMapCanvas.value, THREE.PCFShadowMap);
  cam3.position.set(0, 4, 8);
  cam3.lookAt(0, -0.5, 0);

  animations.push(() => {
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: PCFSoftShadowMap =====
  const scene4 = createScene();

  const pcfsSphere = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  pcfsSphere.position.set(-1.5, 0, 0);
  pcfsSphere.castShadow = true;
  scene4.add(pcfsSphere);

  const pcfsBox = new THREE.Mesh(boxGeom, standardMat(0x4488cc));
  pcfsBox.position.set(1.8, -0.1, 0);
  pcfsBox.castShadow = true;
  scene4.add(pcfsBox);

  addFloor(scene4);
  addShadowDirLight(scene4, 512);

  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(pcfSoftMapCanvas.value, THREE.PCFSoftShadowMap);
  cam4.position.set(0, 4, 8);
  cam4.lookAt(0, -0.5, 0);

  animations.push(() => {
    ren4.render(scene4, cam4);
  });

  // ===== SCENE 5: VSMShadowMap =====
  const scene5 = createScene();

  const vsmSphere = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  vsmSphere.position.set(-1.5, 0, 0);
  vsmSphere.castShadow = true;
  scene5.add(vsmSphere);

  const vsmBox = new THREE.Mesh(boxGeom, standardMat(0x4488cc));
  vsmBox.position.set(1.8, -0.1, 0);
  vsmBox.castShadow = true;
  scene5.add(vsmBox);

  addFloor(scene5);
  const vsmLight = addShadowDirLight(scene5, 512);
  vsmLight.shadow.radius = 4;

  const { camera: cam5, renderer: ren5, container: con5, sizes: sz5 } = createRendererPair(vsmMapCanvas.value, THREE.VSMShadowMap);
  cam5.position.set(0, 4, 8);
  cam5.lookAt(0, -0.5, 0);

  animations.push(() => {
    ren5.render(scene5, cam5);
  });

  // ===== SCENE 6: Shadow Camera Visualization =====
  const scene6 = createScene();

  const scSphere = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  scSphere.position.set(0, 0, 0);
  scSphere.castShadow = true;
  scene6.add(scSphere);

  const scBox = new THREE.Mesh(boxGeom, standardMat(0x4488cc));
  scBox.position.set(3, -0.1, -1);
  scBox.castShadow = true;
  scene6.add(scBox);

  const scBox2 = new THREE.Mesh(boxGeom, standardMat(0x66bb66));
  scBox2.position.set(-2.5, -0.1, 1);
  scBox2.castShadow = true;
  scene6.add(scBox2);

  addFloor(scene6);
  const scLight = addShadowDirLight(scene6, 1024);

  const shadowCamHelper = new THREE.CameraHelper(scLight.shadow.camera);
  scene6.add(shadowCamHelper);

  const { camera: cam6, renderer: ren6, container: con6, sizes: sz6 } = createRendererPair(shadowCameraCanvas.value);
  cam6.position.set(8, 8, 12);
  cam6.lookAt(0, 0, 0);

  animations.push(() => {
    ren6.render(scene6, cam6);
  });

  // ===== SCENE 7: Shadow Bias =====
  const scene7 = createScene();

  // No bias — shadow acne
  const acneSphere = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  acneSphere.position.set(-3.5, 0, 0);
  acneSphere.castShadow = true;
  acneSphere.receiveShadow = true;
  scene7.add(acneSphere);

  // Good bias
  const goodSphere = new THREE.Mesh(sphereGeom, standardMat(0x4488cc));
  goodSphere.position.set(0, 0, 0);
  goodSphere.castShadow = true;
  goodSphere.receiveShadow = true;
  scene7.add(goodSphere);

  // Excessive bias — peter panning
  const peterSphere = new THREE.Mesh(sphereGeom, standardMat(0x66bb66));
  peterSphere.position.set(3.5, 0, 0);
  peterSphere.castShadow = true;
  peterSphere.receiveShadow = true;
  scene7.add(peterSphere);

  addFloor(scene7);

  // Three separate directional lights with different bias values
  const biasLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
  biasLight1.position.set(5, 8, 5);
  biasLight1.castShadow = true;
  biasLight1.shadow.mapSize.set(1024, 1024);
  biasLight1.shadow.camera.left = -10;
  biasLight1.shadow.camera.right = 10;
  biasLight1.shadow.camera.top = 10;
  biasLight1.shadow.camera.bottom = -10;
  biasLight1.shadow.camera.near = 0.5;
  biasLight1.shadow.camera.far = 30;
  biasLight1.shadow.bias = 0.0;
  biasLight1.shadow.normalBias = 0.0;
  scene7.add(biasLight1);

  scene7.add(new THREE.AmbientLight(0x404060, 0.3));

  const { camera: cam7, renderer: ren7, container: con7, sizes: sz7 } = createRendererPair(biasCanvas.value);
  cam7.position.set(0, 3, 9);
  cam7.lookAt(0, -0.3, 0);

  animations.push(() => {
    ren7.render(scene7, cam7);
  });

  // ===== SCENE 8: SpotLight Shadow =====
  const scene8 = createScene();

  const spotSphere = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  spotSphere.position.set(-1.2, 0, 0);
  spotSphere.castShadow = true;
  scene8.add(spotSphere);

  const spotBox = new THREE.Mesh(boxGeom, standardMat(0x4488cc));
  spotBox.position.set(1.8, -0.1, 0);
  spotBox.castShadow = true;
  scene8.add(spotBox);

  addFloor(scene8);

  const shadowSpot = new THREE.SpotLight(0xffffff, 100.0, 30, Math.PI / 4, 0.5, 2);
  shadowSpot.position.set(0, 6, 4);
  shadowSpot.castShadow = true;
  shadowSpot.shadow.mapSize.set(1024, 1024);
  shadowSpot.shadow.camera.near = 1;
  shadowSpot.shadow.camera.far = 30;
  shadowSpot.shadow.bias = 0.0;
  shadowSpot.shadow.normalBias = 0.05;
  shadowSpot.target.position.set(0, 0, 0);
  scene8.add(shadowSpot);
  scene8.add(shadowSpot.target);

  scene8.add(new THREE.AmbientLight(0x404060, 0.15));

  const { camera: cam8, renderer: ren8, container: con8, sizes: sz8 } = createRendererPair(spotShadowCanvas.value);
  cam8.position.set(0, 4, 9);
  cam8.lookAt(0, -0.5, 0);

  let spotTime = 0;
  animations.push(() => {
    spotTime += 0.01;
    shadowSpot.target.position.x = Math.sin(spotTime) * 2;
    ren8.render(scene8, cam8);
  });

  // ===== SCENE 9: PointLight Shadow =====
  const scene9 = createScene();

  const ptSphere = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  ptSphere.position.set(-1.8, 0, 0);
  ptSphere.castShadow = true;
  scene9.add(ptSphere);

  const ptBox = new THREE.Mesh(boxGeom, standardMat(0x4488cc));
  ptBox.position.set(1.8, -0.1, 0);
  ptBox.castShadow = true;
  scene9.add(ptBox);

  // Add a back wall so we can see shadows cast behind objects
  const wallGeom = new THREE.PlaneGeometry(20, 10);
  const backWall = new THREE.Mesh(wallGeom, floorMat());
  backWall.position.set(0, 3, -4);
  backWall.receiveShadow = true;
  scene9.add(backWall);

  addFloor(scene9);

  const shadowPoint = new THREE.PointLight(0xff9944, 50.0, 20, 2);
  shadowPoint.position.set(0, 3, 3);
  shadowPoint.castShadow = true;
  shadowPoint.shadow.mapSize.set(512, 512);
  shadowPoint.shadow.bias = -0.005;
  shadowPoint.shadow.camera.near = 0.5;
  shadowPoint.shadow.camera.far = 20;
  scene9.add(shadowPoint);

  const ptMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff9944 })
  );
  scene9.add(ptMarker);

  scene9.add(new THREE.AmbientLight(0x404060, 0.1));

  const { camera: cam9, renderer: ren9, container: con9, sizes: sz9 } = createRendererPair(pointShadowCanvas.value);
  cam9.position.set(0, 3, 9);
  cam9.lookAt(0, 0, 0);

  let ptTime = 0;
  animations.push(() => {
    ptTime += 0.012;
    shadowPoint.position.x = Math.sin(ptTime) * 3;
    shadowPoint.position.z = 2 + Math.cos(ptTime) * 2;
    ptMarker.position.copy(shadowPoint.position);
    ren9.render(scene9, cam9);
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 },
    { container: con3, camera: cam3, renderer: ren3, sizes: sz3 },
    { container: con4, camera: cam4, renderer: ren4, sizes: sz4 },
    { container: con5, camera: cam5, renderer: ren5, sizes: sz5 },
    { container: con6, camera: cam6, renderer: ren6, sizes: sz6 },
    { container: con7, camera: cam7, renderer: ren7, sizes: sz7 },
    { container: con8, camera: cam8, renderer: ren8, sizes: sz8 },
    { container: con9, camera: cam9, renderer: ren9, sizes: sz9 }
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
  title: 'Types of Shadows in Three.js'
})

useSeoMeta({
  title: 'Types of Shadows in Three.js',
  ogTitle: 'Types of Shadows in Three.js',
  description: 'Learn how shadow mapping works in Three.js — BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, and VSMShadowMap — with interactive demos, shadow camera configuration, bias tuning, and performance advice.',
  ogDescription: 'Learn how shadow mapping works in Three.js — BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, and VSMShadowMap — with interactive demos, shadow camera configuration, bias tuning, and performance advice.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/lighting/types-of-shadows',
  twitterTitle: 'Types of Shadows in Three.js',
  twitterDescription: 'Learn how shadow mapping works in Three.js — BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, and VSMShadowMap — with interactive demos, shadow camera configuration, bias tuning, and performance advice.',
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
