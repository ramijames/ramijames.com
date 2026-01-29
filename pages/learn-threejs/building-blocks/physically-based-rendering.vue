<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Physically-Based Rendering" tagline="Simulating real-world light behavior with roughness, metalness, and environment maps" />

      <main class="w-content page-top">
        <section class="content">

          <h2>What is PBR?</h2>

          <p><strong>Physically-based rendering</strong> (PBR) is a shading approach that models how light actually behaves in the real world. Instead of artistic knobs like "shininess" and "specular color," PBR uses measurable physical properties — roughness, metalness, and index of refraction — to produce materials that look correct under any lighting condition.</p>

          <p>Three.js provides two PBR materials: <NuxtLink to="/learn-threejs/building-blocks/the-spectrum-of-materials">MeshStandardMaterial</NuxtLink> (the everyday workhorse) and <code>MeshPhysicalMaterial</code> (an extended version with advanced features). This article digs deeper into how PBR works and how to get the most out of it.</p>

          <h3>Energy Conservation</h3>

          <p>The core principle of PBR is <strong>energy conservation</strong>: a surface can't reflect more light than it receives. When light hits a surface, it's either reflected (specular) or absorbed and re-emitted (diffuse). The more a surface reflects, the less it scatters diffusely. PBR materials enforce this automatically — you don't need to manually balance diffuse and specular like you do with Phong shading.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="energyCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The row above shows spheres with increasing roughness from left to right. As roughness increases, specular reflections spread out and become dimmer, while diffuse shading becomes more prominent — but the total light energy stays constant.</p>

          <CodeBlock lang="typescript" :code="`// Energy conservation happens automatically in PBR
// As roughness increases, specular gets broader and dimmer
// while diffuse becomes more visible

const smooth = new THREE.MeshStandardMaterial({
  color: 0xcccccc,
  roughness: 0.0, // Mirror-like, almost all specular
  metalness: 0.0
});

const rough = new THREE.MeshStandardMaterial({
  color: 0xcccccc,
  roughness: 1.0, // Fully diffuse, no visible specular
  metalness: 0.0
});`" />

          <h3>The Roughness-Metalness Model</h3>

          <p>PBR in Three.js uses the <strong>metallic-roughness</strong> workflow, defined by two parameters:</p>

          <ul>
            <li><code>roughness</code> (0–1) — How smooth or rough the microsurface is. 0 is a perfect mirror; 1 is completely diffuse.</li>
            <li><code>metalness</code> (0–1) — Whether the material is a dielectric (0, like plastic, wood, skin) or a metal (1, like gold, steel, copper).</li>
          </ul>

          <p>Metals and dielectrics behave fundamentally differently. Metals absorb almost all refracted light, so they have no diffuse component — their color comes entirely from tinted reflections. Dielectrics reflect a small amount of white light at grazing angles (Fresnel effect) and scatter the rest as diffuse color.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="gridCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The grid above maps roughness (left to right) against metalness (bottom to top). The bottom-left sphere is a smooth dielectric (like polished plastic). The top-right is a rough metal (like brushed steel). The top-left is a smooth metal (like chrome).</p>

          <CodeBlock lang="typescript" :code="`// Dielectric: colored diffuse + white specular reflections
const plastic = new THREE.MeshStandardMaterial({
  color: 0xcc4444,
  roughness: 0.3,
  metalness: 0.0  // No metallic behavior
});

// Metal: no diffuse, colored specular reflections
const gold = new THREE.MeshStandardMaterial({
  color: 0xffcc44,  // This tints the reflections, not diffuse
  roughness: 0.2,
  metalness: 1.0   // Fully metallic
});

// In-between: rarely physically correct, but can be useful
const coated = new THREE.MeshStandardMaterial({
  color: 0x88aacc,
  roughness: 0.4,
  metalness: 0.5
});`" />

          <h3>The Fresnel Effect</h3>

          <p>All surfaces become more reflective at <strong>grazing angles</strong> — look at a table from a steep angle and it reflects the room. This is the <strong>Fresnel effect</strong>, and PBR handles it automatically. For dielectrics, reflections are strongest at edges. For metals, the entire surface is reflective, but the color shifts at grazing angles.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="fresnelCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The large sphere above uses a low roughness dielectric material. Notice how the edges appear brighter and more reflective than the center — that's the Fresnel effect in action. The flat plane behind it also shows Fresnel reflections at a shallow viewing angle.</p>

          <CodeBlock lang="typescript" :code="`// Fresnel is automatic in PBR — no special setup needed
// It's most visible on smooth dielectric surfaces

const glossyPlastic = new THREE.MeshStandardMaterial({
  color: 0x222244,
  roughness: 0.05,
  metalness: 0.0
});

// On metals, Fresnel shifts the reflection color
// rather than adding white reflections
const copper = new THREE.MeshStandardMaterial({
  color: 0xcc6633,
  roughness: 0.15,
  metalness: 1.0
});`" />

          <h3>Environment Maps</h3>

          <p>PBR materials look flat without something to reflect. In the real world, objects reflect their surroundings. In Three.js, an <strong>environment map</strong> provides this ambient reflection and lighting. You can set it on individual materials or on the entire scene.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="envmapCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows the same set of spheres with a procedural environment map applied to the scene. Smooth metals now show clear reflections, and even rough surfaces pick up subtle ambient color from the environment.</p>

          <CodeBlock lang="typescript" :code="`// Create a simple procedural environment map using PMREMGenerator
const pmremGenerator = new THREE.PMREMGenerator(renderer);

// Option 1: Use a solid color environment
const envScene = new THREE.Scene();
envScene.background = new THREE.Color(0x88aacc);
const envMap = pmremGenerator.fromScene(envScene).texture;

// Apply to the entire scene
scene.environment = envMap;

// Or apply to individual materials
material.envMap = envMap;
material.envMapIntensity = 1.0; // Scale the reflection strength

pmremGenerator.dispose();`" />

          <h3>MeshPhysicalMaterial — Beyond Standard PBR</h3>

          <p><code>MeshPhysicalMaterial</code> extends the standard metallic-roughness model with several advanced features. Each adds realism at a GPU cost, so use them selectively.</p>

          <h3>Clearcoat</h3>

          <p>A <code>clearcoat</code> adds a second, independent reflective layer on top of the base material — like the lacquer on a car, the varnish on wood, or the glossy finish on a phone case. The clearcoat has its own roughness, separate from the base layer.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="clearcoatCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Car paint: rough base color + smooth clearcoat
const carPaint = new THREE.MeshPhysicalMaterial({
  color: 0xcc0022,
  roughness: 0.6,    // Base layer is fairly rough
  metalness: 0.0,
  clearcoat: 1.0,          // Full clearcoat
  clearcoatRoughness: 0.05 // Very smooth top layer
});

// Carbon fiber: dark rough base + glossy clear layer
const carbonFiber = new THREE.MeshPhysicalMaterial({
  color: 0x222222,
  roughness: 0.8,
  metalness: 0.0,
  clearcoat: 0.8,
  clearcoatRoughness: 0.1
});`" />

          <h3>Transmission and Refraction</h3>

          <p><code>transmission</code> makes light pass through the material instead of being reflected or absorbed — essential for glass, water, crystals, and translucent plastics. Combined with <code>ior</code> (index of refraction) and <code>thickness</code>, you can control how much light bends and how deep the object appears.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="transmissionCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Clear glass
const glass = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 0.0,
  metalness: 0.0,
  transmission: 1.0,  // Fully transparent
  thickness: 1.0,     // Depth for refraction calculation
  ior: 1.5            // Glass has IOR ~1.5
});

// Frosted glass
const frosted = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 0.4,     // Roughness blurs the transmission
  metalness: 0.0,
  transmission: 1.0,
  thickness: 0.5,
  ior: 1.5
});

// Tinted water
const water = new THREE.MeshPhysicalMaterial({
  color: 0x88ccff,    // Color tints what you see through it
  roughness: 0.0,
  metalness: 0.0,
  transmission: 0.95,
  thickness: 2.0,
  ior: 1.33           // Water has IOR ~1.33
});`" />

          <h3>Iridescence</h3>

          <p><code>iridescence</code> simulates thin-film interference — the rainbow sheen on soap bubbles, oil slicks, beetle shells, and some coated metals. The effect shifts color based on viewing angle and is controlled by <code>iridescenceIOR</code> and an optional thickness range.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="iridescenceCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Soap bubble
const bubble = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 0.0,
  metalness: 0.0,
  transmission: 0.9,
  thickness: 0.1,
  ior: 1.3,
  iridescence: 1.0,
  iridescenceIOR: 1.3,
  iridescenceThicknessRange: [100, 400]
});

// Oil slick on metal
const oilSlick = new THREE.MeshPhysicalMaterial({
  color: 0x333333,
  roughness: 0.1,
  metalness: 0.9,
  iridescence: 1.0,
  iridescenceIOR: 1.5,
  iridescenceThicknessRange: [200, 600]
});`" />

          <h3>Sheen</h3>

          <p><code>sheen</code> adds a soft glow at grazing angles, simulating fabrics like velvet, satin, or microfiber. Unlike specular highlights, sheen produces a broad, soft halo rather than a sharp reflection.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="sheenCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Velvet fabric
const velvet = new THREE.MeshPhysicalMaterial({
  color: 0x880022,
  roughness: 1.0,
  metalness: 0.0,
  sheen: 1.0,
  sheenRoughness: 0.5,
  sheenColor: new THREE.Color(0xff4466)
});

// Satin
const satin = new THREE.MeshPhysicalMaterial({
  color: 0x224488,
  roughness: 0.8,
  metalness: 0.0,
  sheen: 0.8,
  sheenRoughness: 0.3,
  sheenColor: new THREE.Color(0x6688cc)
});`" />

          <h3>Putting It All Together</h3>

          <p>The final demo combines several PBR techniques in one scene — metals, dielectrics, glass, clearcoat, and iridescence — all lit by the same environment. This shows how PBR materials respond consistently to the same lighting, producing a coherent, believable scene.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="showcaseCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>From left to right: gold metal, glossy red clearcoat, clear glass, iridescent sphere, and velvet fabric — all using <code>MeshPhysicalMaterial</code> with different property combinations.</p>

          <CodeBlock lang="typescript" :code="`// Gold metal
const gold = new THREE.MeshPhysicalMaterial({
  color: 0xffcc44,
  roughness: 0.15,
  metalness: 1.0
});

// Red clearcoat (car paint)
const carPaint = new THREE.MeshPhysicalMaterial({
  color: 0xcc0022,
  roughness: 0.5,
  metalness: 0.0,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05
});

// Clear glass
const glass = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 0.0,
  metalness: 0.0,
  transmission: 1.0,
  thickness: 1.5,
  ior: 1.5
});

// Iridescent metal
const iridescent = new THREE.MeshPhysicalMaterial({
  color: 0x888888,
  roughness: 0.1,
  metalness: 0.8,
  iridescence: 1.0,
  iridescenceIOR: 1.5,
  iridescenceThicknessRange: [200, 600]
});

// Velvet fabric
const velvet = new THREE.MeshPhysicalMaterial({
  color: 0x880022,
  roughness: 1.0,
  metalness: 0.0,
  sheen: 1.0,
  sheenRoughness: 0.5,
  sheenColor: new THREE.Color(0xff4466)
});

// Apply a procedural environment map for reflections
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const envScene = new THREE.Scene();
envScene.background = new THREE.Color(0x88aacc);
scene.environment = pmremGenerator.fromScene(envScene).texture;
pmremGenerator.dispose();`" />

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/building-blocks/the-spectrum-of-materials"
    prevText="The Spectrum of Materials"
    nextLink="/learn-threejs/building-blocks/advanced-mapping-concepts"
    nextText="Advanced Mapping Concepts"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const energyCanvas = ref(null);
const gridCanvas = ref(null);
const fresnelCanvas = ref(null);
const envmapCanvas = ref(null);
const clearcoatCanvas = ref(null);
const transmissionCanvas = ref(null);
const iridescenceCanvas = ref(null);
const sheenCanvas = ref(null);
const showcaseCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!energyCanvas.value || !gridCanvas.value || !fresnelCanvas.value || !envmapCanvas.value || !clearcoatCanvas.value || !transmissionCanvas.value || !iridescenceCanvas.value || !sheenCanvas.value || !showcaseCanvas.value) return;

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

  // Helper: create a procedural environment map
  const createEnvMap = (renderer) => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();

    // Create a gradient sky
    envScene.background = new THREE.Color(0x88aacc);

    // Add some colored lights to create interesting reflections
    const light1 = new THREE.PointLight(0xffeedd, 50, 0);
    light1.position.set(5, 5, 5);
    envScene.add(light1);

    const light2 = new THREE.PointLight(0xddeeff, 30, 0);
    light2.position.set(-5, 3, -3);
    envScene.add(light2);

    const light3 = new THREE.PointLight(0xffddcc, 20, 0);
    light3.position.set(0, -3, 5);
    envScene.add(light3);

    const envMap = pmremGenerator.fromScene(envScene).texture;
    pmremGenerator.dispose();
    return envMap;
  };

  const sphereGeom = new THREE.SphereGeometry(1, 64, 64);

  // ===== SCENE 1: Energy conservation — roughness row =====
  const scene1 = createScene(0x111122);
  addLights(scene1);

  const energyGroup = new THREE.Group();
  const energyCount = 7;

  for (let i = 0; i < energyCount; i++) {
    const roughness = i / (energyCount - 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness,
      metalness: 0.0
    });
    const mesh = new THREE.Mesh(sphereGeom, mat);
    mesh.position.x = (i - (energyCount - 1) / 2) * 2.2;
    energyGroup.add(mesh);
  }

  scene1.add(energyGroup);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(energyCanvas.value);
  cam1.position.set(0, 1, 9);
  cam1.lookAt(0, 0, 0);

  const envMap1 = createEnvMap(ren1);
  scene1.environment = envMap1;

  animations.push(() => {
    energyGroup.rotation.y += 0.004;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: Roughness-metalness grid =====
  const scene2 = createScene(0x111122);
  addLights(scene2);

  const gridGroup = new THREE.Group();
  const gridSize = 5;
  const gridSpacing = 1.8;
  const gridSphere = new THREE.SphereGeometry(0.6, 48, 48);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const roughness = col / (gridSize - 1);
      const metalness = row / (gridSize - 1);

      const mat = new THREE.MeshStandardMaterial({
        color: 0xcc8844,
        roughness,
        metalness
      });

      const mesh = new THREE.Mesh(gridSphere, mat);
      mesh.position.x = (col - (gridSize - 1) / 2) * gridSpacing;
      mesh.position.y = (row - (gridSize - 1) / 2) * gridSpacing;
      gridGroup.add(mesh);
    }
  }

  scene2.add(gridGroup);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(gridCanvas.value);
  cam2.position.set(0, 0, 8);
  cam2.lookAt(0, 0, 0);

  const envMap2 = createEnvMap(ren2);
  scene2.environment = envMap2;

  animations.push(() => {
    gridGroup.rotation.y += 0.003;
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: Fresnel effect =====
  const scene3 = createScene(0x0a0a1a);
  addLights(scene3);

  const fresnelGroup = new THREE.Group();

  // Large glossy sphere
  const fresnelSphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.8, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0x222244,
      roughness: 0.05,
      metalness: 0.0
    })
  );
  fresnelGroup.add(fresnelSphere);

  // Flat plane behind to show Fresnel on flat surface
  const fresnelPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 6),
    new THREE.MeshStandardMaterial({
      color: 0x222233,
      roughness: 0.1,
      metalness: 0.0
    })
  );
  fresnelPlane.position.z = -3;
  fresnelGroup.add(fresnelPlane);

  // Metal sphere for comparison
  const fresnelMetal = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 48, 48),
    new THREE.MeshStandardMaterial({
      color: 0xcc6633,
      roughness: 0.1,
      metalness: 1.0
    })
  );
  fresnelMetal.position.x = 3;
  fresnelMetal.position.y = -0.5;
  fresnelGroup.add(fresnelMetal);

  scene3.add(fresnelGroup);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(fresnelCanvas.value);
  cam3.position.set(0, 0.5, 5);
  cam3.lookAt(0, 0, 0);

  const envMap3 = createEnvMap(ren3);
  scene3.environment = envMap3;

  animations.push(() => {
    fresnelSphere.rotation.y += 0.004;
    fresnelMetal.rotation.y += 0.006;
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: Environment map comparison =====
  const scene4 = createScene(0x111122);
  addLights(scene4);

  const envGroup = new THREE.Group();

  const envMaterials = [
    { roughness: 0.0, metalness: 1.0, color: 0xcccccc },  // Chrome
    { roughness: 0.0, metalness: 1.0, color: 0xffcc44 },  // Gold
    { roughness: 0.3, metalness: 1.0, color: 0xcc6633 },  // Copper
    { roughness: 0.0, metalness: 0.0, color: 0x222244 },  // Glossy plastic
    { roughness: 0.5, metalness: 0.0, color: 0xcc4444 },  // Matte plastic
  ];

  envMaterials.forEach((props, i) => {
    const mat = new THREE.MeshStandardMaterial(props);
    const mesh = new THREE.Mesh(sphereGeom, mat);
    mesh.position.x = (i - 2) * 2.5;
    envGroup.add(mesh);
  });

  scene4.add(envGroup);

  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(envmapCanvas.value);
  cam4.position.set(0, 1, 7);
  cam4.lookAt(0, 0, 0);

  const envMap4 = createEnvMap(ren4);
  scene4.environment = envMap4;

  animations.push(() => {
    envGroup.rotation.y += 0.004;
    ren4.render(scene4, cam4);
  });

  // ===== SCENE 5: Clearcoat =====
  const scene5 = createScene(0x111122);
  addLights(scene5);

  const clearcoatGroup = new THREE.Group();

  // No clearcoat
  const noClearcoat = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0xcc0022,
      roughness: 0.6,
      metalness: 0.0,
      clearcoat: 0.0
    })
  );
  noClearcoat.position.x = -3;
  clearcoatGroup.add(noClearcoat);

  // Half clearcoat
  const halfClearcoat = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0xcc0022,
      roughness: 0.6,
      metalness: 0.0,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1
    })
  );
  clearcoatGroup.add(halfClearcoat);

  // Full clearcoat
  const fullClearcoat = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0xcc0022,
      roughness: 0.6,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    })
  );
  fullClearcoat.position.x = 3;
  clearcoatGroup.add(fullClearcoat);

  scene5.add(clearcoatGroup);

  const { camera: cam5, renderer: ren5, container: con5, sizes: sz5 } = createRendererPair(clearcoatCanvas.value);
  cam5.position.set(0, 1, 6);
  cam5.lookAt(0, 0, 0);

  const envMap5 = createEnvMap(ren5);
  scene5.environment = envMap5;

  animations.push(() => {
    clearcoatGroup.rotation.y += 0.005;
    ren5.render(scene5, cam5);
  });

  // ===== SCENE 6: Transmission =====
  const scene6 = createScene(0x111122);
  addLights(scene6);

  const transGroup = new THREE.Group();

  // Something behind the glass to see refraction
  const backPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 5),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1.0,
      metalness: 0.0
    })
  );
  backPlane.position.z = -3;
  transGroup.add(backPlane);

  // Colored boxes behind glass
  const boxGeom = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  const boxColors = [0xcc4444, 0x44cc44, 0x4444cc, 0xcccc44, 0xcc44cc];
  boxColors.forEach((col, i) => {
    const box = new THREE.Mesh(boxGeom, new THREE.MeshStandardMaterial({ color: col, roughness: 0.3 }));
    box.position.set((i - 2) * 2.5, -0.8, -1.5);
    box.rotation.set(0.3, 0.5, 0);
    transGroup.add(box);
  });

  // Clear glass
  const clearGlass = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.0,
      metalness: 0.0,
      transmission: 1.0,
      thickness: 1.5,
      ior: 1.5
    })
  );
  clearGlass.position.x = -3;
  transGroup.add(clearGlass);

  // Frosted glass
  const frostedGlass = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.0,
      transmission: 1.0,
      thickness: 0.5,
      ior: 1.5
    })
  );
  transGroup.add(frostedGlass);

  // Tinted glass
  const tintedGlass = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      roughness: 0.0,
      metalness: 0.0,
      transmission: 0.95,
      thickness: 2.0,
      ior: 1.33
    })
  );
  tintedGlass.position.x = 3;
  transGroup.add(tintedGlass);

  scene6.add(transGroup);

  const { camera: cam6, renderer: ren6, container: con6, sizes: sz6 } = createRendererPair(transmissionCanvas.value);
  cam6.position.set(0, 0.5, 6);
  cam6.lookAt(0, 0, 0);

  const envMap6 = createEnvMap(ren6);
  scene6.environment = envMap6;

  animations.push(() => {
    clearGlass.rotation.y += 0.005;
    frostedGlass.rotation.y += 0.005;
    tintedGlass.rotation.y += 0.005;
    ren6.render(scene6, cam6);
  });

  // ===== SCENE 7: Iridescence =====
  const scene7 = createScene(0x0a0a18);
  addLights(scene7);

  const iridGroup = new THREE.Group();

  // Subtle iridescence
  const iridSubtle = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0x666666,
      roughness: 0.2,
      metalness: 0.8,
      iridescence: 0.5,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, 400]
    })
  );
  iridSubtle.position.x = -3;
  iridGroup.add(iridSubtle);

  // Full iridescence on metal
  const iridFull = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0x888888,
      roughness: 0.1,
      metalness: 0.9,
      iridescence: 1.0,
      iridescenceIOR: 1.5,
      iridescenceThicknessRange: [200, 600]
    })
  );
  iridGroup.add(iridFull);

  // Iridescent dark surface (oil slick)
  const iridOil = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      roughness: 0.05,
      metalness: 0.7,
      iridescence: 1.0,
      iridescenceIOR: 1.8,
      iridescenceThicknessRange: [300, 800]
    })
  );
  iridOil.position.x = 3;
  iridGroup.add(iridOil);

  scene7.add(iridGroup);

  const { camera: cam7, renderer: ren7, container: con7, sizes: sz7 } = createRendererPair(iridescenceCanvas.value);
  cam7.position.set(0, 1, 6);
  cam7.lookAt(0, 0, 0);

  const envMap7 = createEnvMap(ren7);
  scene7.environment = envMap7;

  animations.push(() => {
    iridGroup.rotation.y += 0.005;
    ren7.render(scene7, cam7);
  });

  // ===== SCENE 8: Sheen =====
  const scene8 = createScene(0x111122);
  addLights(scene8);

  const sheenGroup = new THREE.Group();

  // No sheen (reference)
  const noSheen = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0x880022,
      roughness: 1.0,
      metalness: 0.0,
      sheen: 0.0
    })
  );
  noSheen.position.x = -3;
  sheenGroup.add(noSheen);

  // Velvet
  const velvet = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0x880022,
      roughness: 1.0,
      metalness: 0.0,
      sheen: 1.0,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color(0xff4466)
    })
  );
  sheenGroup.add(velvet);

  // Satin
  const satin = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0x224488,
      roughness: 0.8,
      metalness: 0.0,
      sheen: 0.8,
      sheenRoughness: 0.3,
      sheenColor: new THREE.Color(0x6688cc)
    })
  );
  satin.position.x = 3;
  sheenGroup.add(satin);

  scene8.add(sheenGroup);

  const { camera: cam8, renderer: ren8, container: con8, sizes: sz8 } = createRendererPair(sheenCanvas.value);
  cam8.position.set(0, 1, 6);
  cam8.lookAt(0, 0, 0);

  const envMap8 = createEnvMap(ren8);
  scene8.environment = envMap8;

  animations.push(() => {
    sheenGroup.rotation.y += 0.005;
    ren8.render(scene8, cam8);
  });

  // ===== SCENE 9: Showcase — all PBR features =====
  const scene9 = createScene(0x0a0a18);
  addLights(scene9);

  const showcaseGroup = new THREE.Group();

  // Gold metal
  const goldMesh = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0xffcc44,
      roughness: 0.15,
      metalness: 1.0
    })
  );
  goldMesh.position.x = -5;
  showcaseGroup.add(goldMesh);

  // Red clearcoat
  const redClearcoat = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0xcc0022,
      roughness: 0.5,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    })
  );
  redClearcoat.position.x = -2.5;
  showcaseGroup.add(redClearcoat);

  // Glass
  const showcaseGlass = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.0,
      metalness: 0.0,
      transmission: 1.0,
      thickness: 1.5,
      ior: 1.5
    })
  );
  showcaseGroup.add(showcaseGlass);

  // Iridescent
  const showcaseIrid = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0x888888,
      roughness: 0.1,
      metalness: 0.8,
      iridescence: 1.0,
      iridescenceIOR: 1.5,
      iridescenceThicknessRange: [200, 600]
    })
  );
  showcaseIrid.position.x = 2.5;
  showcaseGroup.add(showcaseIrid);

  // Velvet fabric
  const showcaseVelvet = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhysicalMaterial({
      color: 0x880022,
      roughness: 1.0,
      metalness: 0.0,
      sheen: 1.0,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color(0xff4466)
    })
  );
  showcaseVelvet.position.x = 5;
  showcaseGroup.add(showcaseVelvet);

  scene9.add(showcaseGroup);

  const { camera: cam9, renderer: ren9, container: con9, sizes: sz9 } = createRendererPair(showcaseCanvas.value);
  cam9.position.set(0, 1.5, 8);
  cam9.lookAt(0, 0, 0);

  const envMap9 = createEnvMap(ren9);
  scene9.environment = envMap9;

  animations.push(() => {
    showcaseGroup.rotation.y += 0.004;
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
  title: 'Physically-Based Rendering in Three.js'
})

useSeoMeta({
  title: 'Physically-Based Rendering in Three.js',
  ogTitle: 'Physically-Based Rendering in Three.js',
  description: 'Deep dive into PBR in Three.js — energy conservation, roughness-metalness workflow, Fresnel effect, environment maps, clearcoat, transmission, iridescence, and sheen.',
  ogDescription: 'Deep dive into PBR in Three.js — energy conservation, roughness-metalness workflow, Fresnel effect, environment maps, clearcoat, transmission, iridescence, and sheen.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/building-blocks/physically-based-rendering',
  twitterTitle: 'Physically-Based Rendering in Three.js',
  twitterDescription: 'Deep dive into PBR in Three.js — energy conservation, roughness-metalness workflow, Fresnel effect, environment maps, clearcoat, transmission, iridescence, and sheen.',
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
