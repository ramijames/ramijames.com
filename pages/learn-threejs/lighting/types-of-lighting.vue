<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Types of Lighting" tagline="Understanding every light source Three.js offers and when to use each one" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Why Lighting Matters</h2>

          <p>Without light, a 3D scene is a black void. Every material in Three.js, from <code>MeshBasicMaterial</code> to <code>MeshPhysicalMaterial</code>, relies on lights to determine what the viewer actually sees. The type, position, color, and intensity of your lights define the mood, depth, and realism of your scene more than almost any other factor.</p>

          <p>Three.js provides six built-in light types. Each one models a different real-world lighting scenario, and each comes with its own performance profile and use cases. This article walks through all of them so you can choose the right tool for each situation.</p>

          <h2>AmbientLight</h2>

          <p><strong>AmbientLight</strong> applies a flat, uniform color to every surface in the scene, regardless of position or orientation. It has no direction and casts no shadows. Think of it as simulating the indirect light that bounces around a room. The light that fills in the dark areas so nothing is completely black.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="ambientCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows two spheres lit only by ambient light. Notice how there's no sense of depth. There is no bright side, no dark side. Every face receives the same amount of light. This is exactly why ambient light should never be your only light source. It exists to fill in shadows, not to define them.</p>

          <CodeBlock lang="typescript" :code="`// AmbientLight: uniform light in all directions
const ambient = new THREE.AmbientLight(
  0x404060,  // color, usually dim, cool-toned
  0.5        // intensity, keep it low
);
scene.add(ambient);

// Common mistake: cranking ambient intensity to 1.0+
// This washes out your scene and kills all contrast.
// Use it as a subtle fill, not a primary source.`" />

          <p><strong>When to use it:</strong> Almost always, as a subtle fill light. Pair it with a directional or point light to prevent pitch-black shadows. Keep intensity low, 0.2 to 0.6 is typical.</p>

          <p><strong>Performance:</strong> Negligible cost. AmbientLight adds almost nothing to your render time since it applies a single flat color without any per-pixel direction calculations.</p>

          <h2>DirectionalLight</h2>

          <p><strong>DirectionalLight</strong> emits parallel rays in a single direction, as if the light source is infinitely far away. This is how the sun works. The rays are effectively parallel by the time they reach objects on the ground. The light's <code>position</code> defines the direction it shines from (toward the origin by default), not where it physically sits.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="directionalCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The two spheres above are lit by a single directional light coming from the upper right. Notice the crisp division between the lit and unlit sides, this is characteristic of directional light. Every object receives light from the same angle, regardless of where it is in the scene.</p>

          <CodeBlock lang="typescript" :code="`// DirectionalLight: parallel rays from a direction
const dirLight = new THREE.DirectionalLight(
  0xffffff,  // color, white sunlight
  1.5        // intensity
);

// Position defines the direction, not the location.
// This light shines FROM (5, 10, 5) TOWARD (0, 0, 0).
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// To change the target (default is origin):
dirLight.target.position.set(2, 0, 0);
scene.add(dirLight.target);`" />

          <p><strong>When to use it:</strong> Outdoor scenes, any situation where you need sun-like illumination. It's the most common primary light in Three.js scenes. Also useful for UI/product shots where you want even, predictable lighting.</p>

          <p><strong>Performance:</strong> Low cost per light. Shadow mapping with directional lights is the most common shadow technique, the shadow camera covers a rectangular area, which you'll need to configure carefully for large scenes to avoid blurry or clipped shadows.</p>

          <h2>PointLight</h2>

          <p><strong>PointLight</strong> emits light in all directions from a single point in space, like a bare light bulb or a candle. Light intensity falls off with distance, objects closer to the point are brighter, and objects far away receive little or no light. This falloff is controlled by the <code>distance</code> and <code>decay</code> parameters.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="pointCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>In the demo, a point light orbits around the spheres. Watch how each sphere brightens as the light approaches and dims as it recedes. The side facing the light is bright; the opposite side falls into shadow. This radial falloff is what gives point lights their natural, organic feel.</p>

          <CodeBlock lang="typescript" :code="`// PointLight: omnidirectional from a point
const pointLight = new THREE.PointLight(
  0xff9944,  // color, warm incandescent
  2.0,       // intensity
  50,        // distance, max range (0 = infinite)
  2          // decay, how fast light fades (2 = physically correct)
);
pointLight.position.set(3, 4, 2);
scene.add(pointLight);

// decay: 2 is physically accurate (inverse-square law)
// decay: 1 is linear falloff (less realistic, easier to control)
// decay: 0 means no falloff (light reaches everywhere equally)`" />

          <p><strong>When to use it:</strong> Indoor scenes, light bulbs, candles, torches, magic effects, explosions. It's for any localized light source that radiates outward. Multiple point lights create rich, layered indoor environments.</p>

          <p><strong>Performance:</strong> Moderate cost. Each point light adds a per-pixel calculation for every fragment it reaches. Shadow mapping for point lights is expensive because the GPU must render a cube map (six shadow passes instead of one). If you need many point lights, consider disabling shadows on most of them.</p>

          <h2>SpotLight</h2>

          <p><strong>SpotLight</strong> emits a cone of light from a point in a specific direction, like a flashlight or a stage spotlight. It combines the position-based nature of a point light with directional focus. You control the cone's width with <code>angle</code> and the softness of the cone's edge with <code>penumbra</code>.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="spotCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The spotlight above shines down at an angle, creating a visible cone of light. The floor plane shows the circular pool of light with soft edges. Adjusting <code>penumbra</code> from 0 (hard edge) to 1 (fully soft edge) dramatically changes the feel. Use hard-edged for dramatic stage lighting and soft for natural indoor fixtures.</p>

          <CodeBlock lang="typescript" :code="`// SpotLight: focused cone of light
const spotLight = new THREE.SpotLight(
  0xffffff,  // color
  3.0,       // intensity
  30,        // distance, max range
  Math.PI / 6,  // angle, cone half-angle (30° here)
  0.5,       // penumbra, 0 = hard edge, 1 = fully soft
  2          // decay, physically correct falloff
);
spotLight.position.set(0, 8, 0);
scene.add(spotLight);

// The spotlight points at its target (default: origin)
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight.target);

// You can attach the target to a moving object:
// spotLight.target = myCharacter;`" />

          <p><strong>When to use it:</strong> Flashlights, desk lamps, stage lighting, streetlights, any focused beam. Spotlights are the most visually expressive light in that they create clear pools of light and shadow that draw the viewer's eye.</p>

          <p><strong>Performance:</strong> Similar cost to point lights for the light calculation itself. Shadow maps are a single pass (unlike point lights) since the light only covers a cone, so spotlight shadows are cheaper than point light shadows. The <code>penumbra</code> softness is computed in the shader and adds minimal cost.</p>

          <h2>HemisphereLight</h2>

          <p><strong>HemisphereLight</strong> simulates the broad, two-tone illumination of an outdoor sky. It defines a <em>sky color</em> (shining down) and a <em>ground color</em> (shining up), and surfaces receive a blend of the two based on their orientation. A surface facing straight up gets full sky color; a surface facing straight down gets full ground color; surfaces at angles get a smooth mix.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="hemisphereCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo shows spheres lit by a hemisphere light with a blue sky color and a warm brown ground color. The tops of the spheres are cool blue-white, while the undersides pick up the warm ground tone. This two-tone gradient is immediately more naturalistic than flat ambient light.</p>

          <CodeBlock lang="typescript" :code="`// HemisphereLight: sky + ground ambient
const hemiLight = new THREE.HemisphereLight(
  0x87ceeb,  // sky color, light blue
  0x654321,  // ground color, brown earth
  1.0        // intensity
);
scene.add(hemiLight);

// Common outdoor setup: hemisphere for fill + directional for sun
const sun = new THREE.DirectionalLight(0xffeedd, 1.5);
sun.position.set(5, 10, 3);
scene.add(sun);

// This combo gives you natural outdoor lighting with
// almost no setup cost.`" />

          <p><strong>When to use it:</strong> Replace <code>AmbientLight</code> in outdoor scenes. The sky/ground gradient is a massive visual upgrade over flat ambient for zero additional performance cost. It's the fastest way to make an outdoor scene look natural.</p>

          <p><strong>Performance:</strong> Same as AmbientLight, it's damned near free. It's a per-vertex calculation with no shadow mapping. Use it liberally.</p>

          <h2>RectAreaLight</h2>

          <p><strong>RectAreaLight</strong> emits light uniformly across a rectangular plane, simulating the behavior of fluorescent panels, windows, or LED screens. Unlike other lights, it produces soft, physically-based illumination with natural falloff across its surface area. The larger the rectangle, the softer the shadows on nearby objects.</p>

          <p>There's an important caveat: <code>RectAreaLight</code> only works with <code>MeshStandardMaterial</code> and <code>MeshPhysicalMaterial</code>. It doesn't cast shadows natively. You'd need a workaround for that, and you must import the <code>RectAreaLightUniformsLib</code> helper to initialize the required shader uniforms.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="rectAreaCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The panel of light above casts a soft, broad wash across the spheres. Notice how the illumination wraps around the curved surfaces differently from a point or directional light, the rectangular shape of the source is visible in the reflections and the way light grades off at the edges.</p>

          <CodeBlock lang="typescript" :code="`import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

// MUST be called once before using RectAreaLight
RectAreaLightUniformsLib.init();

const rectLight = new THREE.RectAreaLight(
  0xffffff,  // color
  5.0,       // intensity
  4,         // width
  2          // height
);
rectLight.position.set(0, 5, 0);
rectLight.lookAt(0, 0, 0);  // Aim the panel
scene.add(rectLight);

// Optional: visualize the light panel
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
scene.add(new RectAreaLightHelper(rectLight));`" />

          <p><strong>When to use it:</strong> Architectural visualization, interior design scenes, product shots, any scene with panel lighting or large light sources like windows. It's the most physically accurate light type for soft, area-based illumination.</p>

          <p><strong>Performance:</strong> The most expensive light type. The shader calculations are significantly heavier than point or directional lights. It doesn't support shadows natively, which paradoxically makes it cheaper in that regard, but the illumination computation itself is costly. Use sparingly. One or two per scene is reasonable, not a dozen.</p>

          <h2>Choosing the Right Light</h2>

          <p>In practice, most scenes use a combination of two or three light types. Here's a quick reference for common setups:</p>

          <ul>
            <li><strong>Simple product viewer:</strong> <code>DirectionalLight</code> + <code>AmbientLight</code>. Clean, even, predictable.</li>
            <li><strong>Outdoor environment:</strong> <code>DirectionalLight</code> (sun) + <code>HemisphereLight</code> (sky/ground fill). Natural and cheap.</li>
            <li><strong>Indoor room:</strong> Multiple <code>PointLight</code>s + <code>AmbientLight</code>. Place them where real fixtures would be.</li>
            <li><strong>Dramatic/cinematic:</strong> <code>SpotLight</code>s for key lighting + dim <code>AmbientLight</code> for fill. High contrast, focused attention.</li>
            <li><strong>Architectural interior:</strong> <code>RectAreaLight</code>s for panel fixtures + <code>PointLight</code>s for accent.</li>
          </ul>

          <h3>Performance Summary</h3>

          <p>Not all lights are equal in computational cost. Here's how they rank from cheapest to most expensive:</p>

          <ol>
            <li><strong>AmbientLight / HemisphereLight</strong>: Nearly free. No per-pixel direction calculations.</li>
            <li><strong>DirectionalLight</strong>: Low cost. Parallel rays simplify the math. Shadow maps are a single 2D pass.</li>
            <li><strong>SpotLight</strong>: Moderate. Per-pixel cone math plus single-pass shadow maps.</li>
            <li><strong>PointLight</strong>: Moderate to high. Omnidirectional, and shadow maps require six passes (cube map).</li>
            <li><strong>RectAreaLight</strong>: Highest. Complex area-light shader math. No native shadow support.</li>
          </ol>

          <p>The general rule: every shadow-casting light is far more expensive than a non-shadow-casting one. If your scene has ten point lights, enable shadows on the one or two that matter most and leave the rest shadow-free. The visual difference is rarely worth the GPU cost of shadowing every light.</p>

          <h3>Light Helpers</h3>

          <p>When positioning lights, it's hard to tell exactly where they're pointing or how wide their cone is. Three.js includes helper objects that visualize each light's position, direction, and shape. These are invaluable during development, so add them while building your scene, then remove them before shipping.</p>

          <CodeBlock lang="typescript" :code="`// Helpers for debugging light placement
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

// DirectionalLight helper, shows direction arrow
const dirHelper = new THREE.DirectionalLightHelper(dirLight, 1);
scene.add(dirHelper);

// PointLight helper, shows a wireframe sphere
const pointHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(pointHelper);

// SpotLight helper, shows the cone
const spotHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotHelper);

// HemisphereLight helper, shows sky/ground orientation
const hemiHelper = new THREE.HemisphereLightHelper(hemiLight, 1);
scene.add(hemiHelper);

// RectAreaLight helper, shows the panel
const rectHelper = new RectAreaLightHelper(rectLight);
scene.add(rectHelper);

// Remember to call helper.update() if you move the light
// after creating the helper.`" />

          <p>The scene below shows a directional light, a point light, and a spotlight all rendered with their helpers enabled. The yellow lines show the directional light's direction, the wireframe sphere marks the point light, and the cone outlines the spotlight's coverage area.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="helpersCanvas"></canvas>
          </div>
          </ClientOnly>

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/building-blocks/advanced-mapping-concepts"
    prevText="Advanced Mapping Concepts"
    nextLink="/learn-threejs/lighting/types-of-shadows"
    nextText="Types of Shadows"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

const ambientCanvas = ref(null);
const directionalCanvas = ref(null);
const pointCanvas = ref(null);
const spotCanvas = ref(null);
const hemisphereCanvas = ref(null);
const rectAreaCanvas = ref(null);
const helpersCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!ambientCanvas.value || !directionalCanvas.value || !pointCanvas.value || !spotCanvas.value || !hemisphereCanvas.value || !rectAreaCanvas.value || !helpersCanvas.value) return;

  const animations = [];

  const createScene = (bgColor = 0x111122) => {
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderers.push(renderer);

    return { camera, renderer, container, sizes };
  };

  const sphereGeom = new THREE.SphereGeometry(1.0, 64, 64);
  const floorGeom = new THREE.PlaneGeometry(20, 20);

  const standardMat = (color = 0xcccccc, roughness = 0.5, metalness = 0.1) => {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
  };

  const floorMat = () => {
    return new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.9, metalness: 0.0 });
  };

  const addFloor = (scene) => {
    const floor = new THREE.Mesh(floorGeom, floorMat());
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    scene.add(floor);
    return floor;
  };

  // ===== SCENE 1: AmbientLight =====
  const scene1 = createScene();

  const ambSphere1 = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  ambSphere1.position.x = -1.8;
  scene1.add(ambSphere1);

  const ambSphere2 = new THREE.Mesh(sphereGeom, standardMat(0x4488cc));
  ambSphere2.position.x = 1.8;
  scene1.add(ambSphere2);

  addFloor(scene1);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene1.add(ambientLight);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(ambientCanvas.value);
  cam1.position.set(0, 2, 6);
  cam1.lookAt(0, 0, 0);

  animations.push(() => {
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: DirectionalLight =====
  const scene2 = createScene();

  const dirSphere1 = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  dirSphere1.position.x = -1.8;
  scene2.add(dirSphere1);

  const dirSphere2 = new THREE.Mesh(sphereGeom, standardMat(0x4488cc));
  dirSphere2.position.x = 1.8;
  scene2.add(dirSphere2);

  addFloor(scene2);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(5, 8, 3);
  scene2.add(dirLight);

  scene2.add(new THREE.AmbientLight(0x404060, 0.15));

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(directionalCanvas.value);
  cam2.position.set(0, 2, 6);
  cam2.lookAt(0, 0, 0);

  animations.push(() => {
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: PointLight =====
  const scene3 = createScene();

  const ptSphere1 = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  ptSphere1.position.x = -1.8;
  scene3.add(ptSphere1);

  const ptSphere2 = new THREE.Mesh(sphereGeom, standardMat(0x4488cc));
  ptSphere2.position.x = 1.8;
  scene3.add(ptSphere2);

  addFloor(scene3);

  const pointLight = new THREE.PointLight(0xff9944, 3.0, 20, 2);
  pointLight.position.set(3, 2, 3);
  scene3.add(pointLight);

  scene3.add(new THREE.AmbientLight(0x404060, 0.1));

  // Small glowing sphere to mark the point light position
  const pointMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff9944 })
  );
  scene3.add(pointMarker);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(pointCanvas.value);
  cam3.position.set(0, 2, 6);
  cam3.lookAt(0, 0, 0);

  let pointTime = 0;
  animations.push(() => {
    pointTime += 0.015;
    pointLight.position.x = Math.sin(pointTime) * 4;
    pointLight.position.z = Math.cos(pointTime) * 4;
    pointLight.position.y = 2 + Math.sin(pointTime * 0.7) * 0.5;
    pointMarker.position.copy(pointLight.position);
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: SpotLight =====
  const scene4 = createScene();

  const spotSphere1 = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  spotSphere1.position.x = -1.8;
  scene4.add(spotSphere1);

  const spotSphere2 = new THREE.Mesh(sphereGeom, standardMat(0x4488cc));
  spotSphere2.position.x = 1.8;
  scene4.add(spotSphere2);

  addFloor(scene4);

  const spotLight = new THREE.SpotLight(0xffffff, 80.0, 30, Math.PI / 5, 0.6, 2);
  spotLight.position.set(0, 6, 3);
  spotLight.target.position.set(0, 0, 0);
  scene4.add(spotLight);
  scene4.add(spotLight.target);

  scene4.add(new THREE.AmbientLight(0x404060, 0.1));

  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(spotCanvas.value);
  cam4.position.set(0, 3, 7);
  cam4.lookAt(0, 0, 0);

  let spotTime = 0;
  animations.push(() => {
    spotTime += 0.01;
    spotLight.target.position.x = Math.sin(spotTime) * 3;
    spotLight.target.position.z = Math.cos(spotTime) * 2;
    ren4.render(scene4, cam4);
  });

  // ===== SCENE 5: HemisphereLight =====
  const scene5 = createScene();

  const hemiSphere1 = new THREE.Mesh(sphereGeom, standardMat(0xcccccc, 0.6, 0.1));
  hemiSphere1.position.x = -1.8;
  scene5.add(hemiSphere1);

  const hemiSphere2 = new THREE.Mesh(sphereGeom, standardMat(0xcccccc, 0.6, 0.1));
  hemiSphere2.position.x = 1.8;
  scene5.add(hemiSphere2);

  addFloor(scene5);

  const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x654321, 1.2);
  scene5.add(hemiLight);

  const { camera: cam5, renderer: ren5, container: con5, sizes: sz5 } = createRendererPair(hemisphereCanvas.value);
  cam5.position.set(0, 2, 6);
  cam5.lookAt(0, 0, 0);

  animations.push(() => {
    ren5.render(scene5, cam5);
  });

  // ===== SCENE 6: RectAreaLight =====
  const scene6 = createScene();
  RectAreaLightUniformsLib.init();

  const rectSphere1 = new THREE.Mesh(sphereGeom, standardMat(0xcccccc, 0.3, 0.2));
  rectSphere1.position.x = -1.8;
  scene6.add(rectSphere1);

  const rectSphere2 = new THREE.Mesh(sphereGeom, standardMat(0xcccccc, 0.3, 0.2));
  rectSphere2.position.x = 1.8;
  scene6.add(rectSphere2);

  addFloor(scene6);

  const rectLight = new THREE.RectAreaLight(0xffffff, 8.0, 6, 3);
  rectLight.position.set(0, 4, 3);
  rectLight.lookAt(0, 0, 0);
  scene6.add(rectLight);

  scene6.add(new THREE.AmbientLight(0x404060, 0.1));

  const { camera: cam6, renderer: ren6, container: con6, sizes: sz6 } = createRendererPair(rectAreaCanvas.value);
  cam6.position.set(0, 2, 7);
  cam6.lookAt(0, 0, 0);

  animations.push(() => {
    ren6.render(scene6, cam6);
  });

  // ===== SCENE 7: Light Helpers =====
  const scene7 = createScene();

  const helperFloor = new THREE.Mesh(floorGeom, floorMat());
  helperFloor.rotation.x = -Math.PI / 2;
  helperFloor.position.y = -1.5;
  scene7.add(helperFloor);

  const helperSphere = new THREE.Mesh(sphereGeom, standardMat(0xcccccc, 0.5, 0.1));
  scene7.add(helperSphere);

  // Directional light + helper
  const hDir = new THREE.DirectionalLight(0xffdd88, 1.5);
  hDir.position.set(4, 5, 2);
  scene7.add(hDir);
  const dirHelper = new THREE.DirectionalLightHelper(hDir, 1);
  scene7.add(dirHelper);

  // Point light + helper
  const hPoint = new THREE.PointLight(0x44aaff, 40.0, 15, 2);
  hPoint.position.set(-3, 3, 2);
  scene7.add(hPoint);
  const ptHelper = new THREE.PointLightHelper(hPoint, 0.4);
  scene7.add(ptHelper);

  // Spot light + helper
  const hSpot = new THREE.SpotLight(0xff6644, 60.0, 20, Math.PI / 6, 0.5, 2);
  hSpot.position.set(2, 5, -3);
  hSpot.target.position.set(0, 0, 0);
  scene7.add(hSpot);
  scene7.add(hSpot.target);
  const sptHelper = new THREE.SpotLightHelper(hSpot);
  scene7.add(sptHelper);

  scene7.add(new THREE.AmbientLight(0x404060, 0.15));

  const { camera: cam7, renderer: ren7, container: con7, sizes: sz7 } = createRendererPair(helpersCanvas.value);
  cam7.position.set(0, 5, 10);
  cam7.lookAt(0, 0, 0);

  let helperTime = 0;
  animations.push(() => {
    helperTime += 0.008;
    hPoint.position.x = -3 + Math.sin(helperTime) * 2;
    hPoint.position.z = 2 + Math.cos(helperTime) * 2;
    ptHelper.update();
    hSpot.target.position.x = Math.sin(helperTime * 0.7) * 2;
    sptHelper.update();
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

definePageMeta({
  layout: 'learnthreejs'
})

useHead({
  title: 'Types of Lighting in Three.js'
})

useSeoMeta({
  title: 'Types of Lighting in Three.js',
  ogTitle: 'Types of Lighting in Three.js',
  description: 'A complete guide to every light type in Three.js — AmbientLight, DirectionalLight, PointLight, SpotLight, HemisphereLight, and RectAreaLight — with interactive demos and performance advice.',
  ogDescription: 'A complete guide to every light type in Three.js — AmbientLight, DirectionalLight, PointLight, SpotLight, HemisphereLight, and RectAreaLight — with interactive demos and performance advice.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/lighting/types-of-lighting',
  twitterTitle: 'Types of Lighting in Three.js',
  twitterDescription: 'A complete guide to every light type in Three.js — AmbientLight, DirectionalLight, PointLight, SpotLight, HemisphereLight, and RectAreaLight — with interactive demos and performance advice.',
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
