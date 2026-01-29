<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="The Spectrum of Materials" tagline="How surfaces interact with light in Three.js" />

      <main class="w-content page-top">
        <section class="content">

          <h2>What Materials Do</h2>

          <p>A material defines how a mesh's surface responds to light. In Three.js, materials range from completely unlit (ignoring all light sources) to physically-based rendering (PBR) that simulates real-world light behavior. Choosing the right material is a trade-off between visual fidelity and performance.</p>

          <p>Every material in Three.js extends the base <code>Material</code> class and shares common properties like <code>opacity</code>, <code>transparent</code>, <code>side</code>, and <code>wireframe</code>. The differences are in how they compute the color of each pixel.</p>

          <h3>MeshBasicMaterial — No Lighting</h3>

          <p><code>MeshBasicMaterial</code> ignores all lights in the scene. It renders the mesh with a flat color, a texture, or vertex colors — nothing more. This makes it the fastest material and useful for UI elements, backgrounds, wireframes, or any object that shouldn't react to lighting.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="basicCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Flat color, no light interaction
const material = new THREE.MeshBasicMaterial({
  color: 0x4488cc
});

// With wireframe overlay
const wireframe = new THREE.MeshBasicMaterial({
  color: 0x4488cc,
  wireframe: true
});

// With transparency
const glass = new THREE.MeshBasicMaterial({
  color: 0x88ccff,
  transparent: true,
  opacity: 0.5
});`" />

          <h3>MeshNormalMaterial — Debugging and Visualization</h3>

          <p><code>MeshNormalMaterial</code> maps each face's normal direction to a color. Faces pointing along the X axis appear red/cyan, Y axis appears green/magenta, and Z axis appears blue/yellow. It doesn't need lights and is invaluable for debugging geometry — you can immediately see if normals are correct, faces are oriented properly, or vertices are shared.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="normalCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`const material = new THREE.MeshNormalMaterial();

// With flat shading to see individual faces
const flat = new THREE.MeshNormalMaterial({
  flatShading: true
});`" />

          <h3>MeshLambertMaterial — Matte Surfaces</h3>

          <p><code>MeshLambertMaterial</code> is the simplest lit material. It uses <strong>Lambertian reflectance</strong>, which calculates lighting only at vertices and interpolates across faces. This creates a soft, matte look — good for clay, fabric, unpolished wood, or any surface that doesn't have a shine. It's significantly cheaper than Phong or Standard materials.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="lambertCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`const material = new THREE.MeshLambertMaterial({
  color: 0xcc8844
});

// With emissive glow (self-illumination)
const glowing = new THREE.MeshLambertMaterial({
  color: 0x884422,
  emissive: 0x331100
});`" />

          <h3>MeshPhongMaterial — Shiny Surfaces</h3>

          <p><code>MeshPhongMaterial</code> adds <strong>specular highlights</strong> on top of Lambert's diffuse shading. The <code>shininess</code> property controls how tight the highlight is — low values create a broad, soft sheen (like rubber), high values create a tight, bright spot (like polished metal). The <code>specular</code> color controls the highlight's tint.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="phongCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Moderate shine (plastic-like)
const plastic = new THREE.MeshPhongMaterial({
  color: 0x4488cc,
  shininess: 60,
  specular: 0x222222
});

// High shine (polished)
const polished = new THREE.MeshPhongMaterial({
  color: 0xcc4444,
  shininess: 200,
  specular: 0xffffff
});

// Low shine (rubber)
const rubber = new THREE.MeshPhongMaterial({
  color: 0x44cc88,
  shininess: 5,
  specular: 0x111111
});`" />

          <h3>MeshStandardMaterial — Physically-Based Rendering</h3>

          <p><code>MeshStandardMaterial</code> is the workhorse PBR material. Instead of separate diffuse/specular/shininess controls, it uses two intuitive properties: <code>roughness</code> (0 = mirror, 1 = completely diffuse) and <code>metalness</code> (0 = dielectric like plastic, 1 = metal). This model produces more realistic results because it conserves energy — as a surface becomes more reflective, it scatters less light diffusely.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="standardCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Smooth metal
const chrome = new THREE.MeshStandardMaterial({
  color: 0xcccccc,
  roughness: 0.1,
  metalness: 1.0
});

// Rough plastic
const plastic = new THREE.MeshStandardMaterial({
  color: 0xcc4444,
  roughness: 0.8,
  metalness: 0.0
});

// Semi-rough metal
const brushedMetal = new THREE.MeshStandardMaterial({
  color: 0xddaa44,
  roughness: 0.4,
  metalness: 0.9
});`" />

          <p>The demo above shows a grid of spheres with roughness increasing left-to-right and metalness increasing bottom-to-top. Notice how smooth metals reflect the environment crisply, while rough dielectrics scatter light softly.</p>

          <h3>MeshPhysicalMaterial — Advanced PBR</h3>

          <p><code>MeshPhysicalMaterial</code> extends Standard with additional properties for specialized effects: <code>clearcoat</code> (a second reflective layer, like car paint or lacquered wood), <code>transmission</code> (light passing through, for glass), <code>thickness</code> (how deep the transparent object is), <code>ior</code> (index of refraction), and <code>iridescence</code> (thin-film interference, like soap bubbles or oil slicks). It's the most expensive material but produces the most realistic results.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="physicalCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Glass sphere
const glass = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 0.0,
  metalness: 0.0,
  transmission: 1.0,
  thickness: 1.5,
  ior: 1.5
});

// Car paint (clearcoat)
const carPaint = new THREE.MeshPhysicalMaterial({
  color: 0xcc0000,
  roughness: 0.4,
  metalness: 0.0,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1
});

// Iridescent surface
const iridescent = new THREE.MeshPhysicalMaterial({
  color: 0x888888,
  roughness: 0.3,
  metalness: 0.8,
  iridescence: 1.0,
  iridescenceIOR: 1.3
});`" />

          <h3>MeshToonMaterial — Cel Shading</h3>

          <p><code>MeshToonMaterial</code> renders surfaces with discrete shading steps instead of smooth gradients, creating a cartoon or cel-shaded look. By default it uses a two-tone (light/shadow) gradient, but you can provide a custom <code>gradientMap</code> texture for more steps. It responds to lights like Lambert but quantizes the result.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="toonCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`// Default two-tone cel shading
const toon = new THREE.MeshToonMaterial({
  color: 0x44aacc
});

// Custom gradient with more steps
const format = THREE.RedFormat;

// Three-tone gradient
const colors = new Uint8Array(3);
colors[0] = 60;   // Dark
colors[1] = 140;  // Mid
colors[2] = 255;  // Light

const gradientMap = new THREE.DataTexture(colors, 3, 1, format);
gradientMap.needsUpdate = true;

const threeTone = new THREE.MeshToonMaterial({
  color: 0xcc6644,
  gradientMap: gradientMap
});`" />

          <h3>Comparing Materials Side by Side</h3>

          <p>The best way to understand materials is to see them on the same geometry under the same lighting. The demo below places seven spheres in a row — one for each material type — lit by the same directional and ambient lights. Notice how each responds differently to the same light conditions.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="comparisonCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>From left to right: <strong>Basic</strong> (flat, unlit), <strong>Normal</strong> (debug colors), <strong>Lambert</strong> (soft matte), <strong>Phong</strong> (specular highlight), <strong>Standard</strong> (PBR roughness/metalness), <strong>Physical</strong> (clearcoat), <strong>Toon</strong> (cel-shaded steps).</p>

          <h3>Common Material Properties</h3>

          <p>All materials share a set of properties inherited from the base <code>Material</code> class:</p>

          <ul>
            <li><code>transparent</code> / <code>opacity</code> — Enable transparency and set how see-through the surface is (0 = invisible, 1 = fully opaque).</li>
            <li><code>side</code> — Which faces to render: <code>THREE.FrontSide</code> (default), <code>THREE.BackSide</code>, or <code>THREE.DoubleSide</code>.</li>
            <li><code>wireframe</code> — Render only the edges of each triangle.</li>
            <li><code>flatShading</code> — Use face normals instead of vertex normals, making each triangle visually distinct.</li>
            <li><code>vertexColors</code> — Use per-vertex colors from the geometry's <code>color</code> attribute instead of (or multiplied with) the material color.</li>
            <li><code>depthWrite</code> / <code>depthTest</code> — Control whether the material writes to and reads from the depth buffer. Useful for overlays and particle effects.</li>
          </ul>

          <h3>Which Material Should You Use?</h3>

          <ul>
            <li><strong>MeshBasicMaterial</strong> — When you don't need lighting: UI, skyboxes, wireframes, flat-shaded stylized art.</li>
            <li><strong>MeshNormalMaterial</strong> — Debugging geometry, visualizing normals, quick prototyping.</li>
            <li><strong>MeshLambertMaterial</strong> — Performance-sensitive scenes with many objects that only need basic diffuse lighting.</li>
            <li><strong>MeshPhongMaterial</strong> — When you need specular highlights but don't need full PBR realism.</li>
            <li><strong>MeshStandardMaterial</strong> — The default choice for most 3D scenes. Good balance of realism and performance.</li>
            <li><strong>MeshPhysicalMaterial</strong> — When you need glass, clearcoat, iridescence, or other advanced effects.</li>
            <li><strong>MeshToonMaterial</strong> — Stylized, cartoon, or anime-inspired visuals.</li>
          </ul>

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/building-blocks/procedural-terrain"
    prevText="Procedural Terrain"
    nextLink="/learn-threejs/building-blocks/physically-based-rendering"
    nextText="Physically Based Rendering"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const basicCanvas = ref(null);
const normalCanvas = ref(null);
const lambertCanvas = ref(null);
const phongCanvas = ref(null);
const standardCanvas = ref(null);
const physicalCanvas = ref(null);
const toonCanvas = ref(null);
const comparisonCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(() => {
  if (!basicCanvas.value || !normalCanvas.value || !lambertCanvas.value || !phongCanvas.value || !standardCanvas.value || !physicalCanvas.value || !toonCanvas.value || !comparisonCanvas.value) return;

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

  const addLights = (scene) => {
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(5, 8, 5);
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0x404060, 0.8));
  };

  // Shared geometries
  const sphereGeom = new THREE.SphereGeometry(1, 32, 32);
  const torusKnotGeom = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);

  // ===== SCENE 1: MeshBasicMaterial =====
  const scene1 = createScene(0x111122);

  const basicGroup = new THREE.Group();

  // Solid
  const basicSolid = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshBasicMaterial({ color: 0x4488cc })
  );
  basicSolid.position.x = -2.5;
  basicGroup.add(basicSolid);

  // Wireframe
  const basicWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.MeshBasicMaterial({ color: 0x44cc88, wireframe: true })
  );
  basicGroup.add(basicWire);

  // Transparent
  const basicTransparent = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshBasicMaterial({ color: 0xcc4488, transparent: true, opacity: 0.5 })
  );
  basicTransparent.position.x = 2.5;
  basicGroup.add(basicTransparent);

  scene1.add(basicGroup);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(basicCanvas.value);
  cam1.position.set(0, 1, 5);
  cam1.lookAt(0, 0, 0);

  animations.push(() => {
    basicGroup.rotation.y += 0.005;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: MeshNormalMaterial =====
  const scene2 = createScene(0x111122);

  const normalGroup = new THREE.Group();

  const normalSmooth = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshNormalMaterial()
  );
  normalSmooth.position.x = -2;
  normalGroup.add(normalSmooth);

  const normalFlat = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.MeshNormalMaterial({ flatShading: true })
  );
  normalFlat.position.x = 2;
  normalGroup.add(normalFlat);

  scene2.add(normalGroup);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(normalCanvas.value);
  cam2.position.set(0, 1, 5);
  cam2.lookAt(0, 0, 0);

  animations.push(() => {
    normalGroup.rotation.y += 0.005;
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: MeshLambertMaterial =====
  const scene3 = createScene(0x111122);
  addLights(scene3);

  const lambertGroup = new THREE.Group();

  const lambertPlain = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshLambertMaterial({ color: 0xcc8844 })
  );
  lambertPlain.position.x = -2.5;
  lambertGroup.add(lambertPlain);

  const lambertEmissive = new THREE.Mesh(
    torusKnotGeom,
    new THREE.MeshLambertMaterial({ color: 0x884422, emissive: 0x331100 })
  );
  lambertGroup.add(lambertEmissive);

  const lambertGreen = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshLambertMaterial({ color: 0x44aa66 })
  );
  lambertGreen.position.x = 2.5;
  lambertGroup.add(lambertGreen);

  scene3.add(lambertGroup);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(lambertCanvas.value);
  cam3.position.set(0, 1, 5);
  cam3.lookAt(0, 0, 0);

  animations.push(() => {
    lambertGroup.rotation.y += 0.005;
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: MeshPhongMaterial — shininess comparison =====
  const scene4 = createScene(0x111122);
  addLights(scene4);

  const phongGroup = new THREE.Group();

  // Low shininess (rubber)
  const phongLow = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhongMaterial({ color: 0x44cc88, shininess: 5, specular: 0x111111 })
  );
  phongLow.position.x = -3;
  phongGroup.add(phongLow);

  // Medium shininess (plastic)
  const phongMid = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhongMaterial({ color: 0x4488cc, shininess: 60, specular: 0x444444 })
  );
  phongGroup.add(phongMid);

  // High shininess (polished)
  const phongHigh = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshPhongMaterial({ color: 0xcc4444, shininess: 200, specular: 0xffffff })
  );
  phongHigh.position.x = 3;
  phongGroup.add(phongHigh);

  scene4.add(phongGroup);

  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(phongCanvas.value);
  cam4.position.set(0, 1, 6);
  cam4.lookAt(0, 0, 0);

  animations.push(() => {
    phongGroup.rotation.y += 0.005;
    ren4.render(scene4, cam4);
  });

  // ===== SCENE 5: MeshStandardMaterial — roughness/metalness grid =====
  const scene5 = createScene(0x111122);
  addLights(scene5);

  // Add a point light for reflections
  const pointLight5 = new THREE.PointLight(0xffeedd, 1.0, 20);
  pointLight5.position.set(-3, 3, 3);
  scene5.add(pointLight5);

  const standardGroup = new THREE.Group();
  const gridSize = 5;
  const spacing = 1.8;
  const smallSphere = new THREE.SphereGeometry(0.6, 32, 32);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const roughness = col / (gridSize - 1);
      const metalness = row / (gridSize - 1);

      const mat = new THREE.MeshStandardMaterial({
        color: 0xcc8844,
        roughness,
        metalness
      });

      const mesh = new THREE.Mesh(smallSphere, mat);
      mesh.position.x = (col - (gridSize - 1) / 2) * spacing;
      mesh.position.y = (row - (gridSize - 1) / 2) * spacing;
      standardGroup.add(mesh);
    }
  }

  scene5.add(standardGroup);

  const { camera: cam5, renderer: ren5, container: con5, sizes: sz5 } = createRendererPair(standardCanvas.value);
  cam5.position.set(0, 0, 8);
  cam5.lookAt(0, 0, 0);

  animations.push(() => {
    standardGroup.rotation.y += 0.003;
    ren5.render(scene5, cam5);
  });

  // ===== SCENE 6: MeshPhysicalMaterial =====
  const scene6 = createScene(0x111122);
  addLights(scene6);

  const pointLight6 = new THREE.PointLight(0xffeedd, 1.0, 20);
  pointLight6.position.set(-3, 3, 3);
  scene6.add(pointLight6);

  const physicalGroup = new THREE.Group();

  // Glass (transmission)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.0,
    metalness: 0.0,
    transmission: 1.0,
    thickness: 1.5,
    ior: 1.5
  });
  const glassMesh = new THREE.Mesh(sphereGeom, glassMat);
  glassMesh.position.x = -3;
  physicalGroup.add(glassMesh);

  // Clearcoat (car paint)
  const clearcoatMat = new THREE.MeshPhysicalMaterial({
    color: 0xcc0000,
    roughness: 0.4,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });
  const clearcoatMesh = new THREE.Mesh(sphereGeom, clearcoatMat);
  physicalGroup.add(clearcoatMesh);

  // Iridescent
  const iridescentMat = new THREE.MeshPhysicalMaterial({
    color: 0x888888,
    roughness: 0.3,
    metalness: 0.8,
    iridescence: 1.0,
    iridescenceIOR: 1.3
  });
  const iridescentMesh = new THREE.Mesh(sphereGeom, iridescentMat);
  iridescentMesh.position.x = 3;
  physicalGroup.add(iridescentMesh);

  scene6.add(physicalGroup);

  const { camera: cam6, renderer: ren6, container: con6, sizes: sz6 } = createRendererPair(physicalCanvas.value);
  cam6.position.set(0, 1, 6);
  cam6.lookAt(0, 0, 0);

  animations.push(() => {
    physicalGroup.rotation.y += 0.005;
    ren6.render(scene6, cam6);
  });

  // ===== SCENE 7: MeshToonMaterial =====
  const scene7 = createScene(0x111122);
  addLights(scene7);

  const toonGroup = new THREE.Group();

  // Default two-tone
  const toonDefault = new THREE.Mesh(
    torusKnotGeom,
    new THREE.MeshToonMaterial({ color: 0x44aacc })
  );
  toonDefault.position.x = -2.5;
  toonGroup.add(toonDefault);

  // Three-tone gradient
  const threeColors = new Uint8Array(3);
  threeColors[0] = 60;
  threeColors[1] = 140;
  threeColors[2] = 255;
  const threeGradient = new THREE.DataTexture(threeColors, 3, 1, THREE.RedFormat);
  threeGradient.magFilter = THREE.NearestFilter;
  threeGradient.needsUpdate = true;

  const toonThree = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshToonMaterial({ color: 0xcc6644, gradientMap: threeGradient })
  );
  toonGroup.add(toonThree);

  // Five-tone gradient
  const fiveColors = new Uint8Array(5);
  fiveColors[0] = 30;
  fiveColors[1] = 80;
  fiveColors[2] = 140;
  fiveColors[3] = 200;
  fiveColors[4] = 255;
  const fiveGradient = new THREE.DataTexture(fiveColors, 5, 1, THREE.RedFormat);
  fiveGradient.magFilter = THREE.NearestFilter;
  fiveGradient.needsUpdate = true;

  const toonFive = new THREE.Mesh(
    torusKnotGeom,
    new THREE.MeshToonMaterial({ color: 0xaa44cc, gradientMap: fiveGradient })
  );
  toonFive.position.x = 2.5;
  toonGroup.add(toonFive);

  scene7.add(toonGroup);

  const { camera: cam7, renderer: ren7, container: con7, sizes: sz7 } = createRendererPair(toonCanvas.value);
  cam7.position.set(0, 1, 5);
  cam7.lookAt(0, 0, 0);

  animations.push(() => {
    toonGroup.rotation.y += 0.005;
    ren7.render(scene7, cam7);
  });

  // ===== SCENE 8: Side-by-side comparison =====
  const scene8 = createScene(0x111122);
  addLights(scene8);

  const pointLight8 = new THREE.PointLight(0xffeedd, 0.8, 20);
  pointLight8.position.set(-4, 4, 4);
  scene8.add(pointLight8);

  const compGroup = new THREE.Group();
  const compSphere = new THREE.SphereGeometry(0.7, 32, 32);
  const compSpacing = 2.2;

  const compMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xcc8844 }),
    new THREE.MeshNormalMaterial(),
    new THREE.MeshLambertMaterial({ color: 0xcc8844 }),
    new THREE.MeshPhongMaterial({ color: 0xcc8844, shininess: 100, specular: 0x444444 }),
    new THREE.MeshStandardMaterial({ color: 0xcc8844, roughness: 0.3, metalness: 0.6 }),
    new THREE.MeshPhysicalMaterial({ color: 0xcc8844, roughness: 0.2, metalness: 0.0, clearcoat: 1.0, clearcoatRoughness: 0.05 }),
    new THREE.MeshToonMaterial({ color: 0xcc8844 })
  ];

  compMaterials.forEach((mat, i) => {
    const mesh = new THREE.Mesh(compSphere, mat);
    mesh.position.x = (i - 3) * compSpacing;
    compGroup.add(mesh);
  });

  scene8.add(compGroup);

  const { camera: cam8, renderer: ren8, container: con8, sizes: sz8 } = createRendererPair(comparisonCanvas.value);
  cam8.position.set(0, 2, 10);
  cam8.lookAt(0, 0, 0);

  animations.push(() => {
    compGroup.rotation.y += 0.004;
    ren8.render(scene8, cam8);
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
    { container: con8, camera: cam8, renderer: ren8, sizes: sz8 }
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
  title: 'The Spectrum of Materials in Three.js'
})

useSeoMeta({
  title: 'The Spectrum of Materials in Three.js',
  ogTitle: 'The Spectrum of Materials in Three.js',
  description: 'Explore every Three.js material from MeshBasicMaterial to MeshPhysicalMaterial — understand lighting models, PBR properties, and when to use each one.',
  ogDescription: 'Explore every Three.js material from MeshBasicMaterial to MeshPhysicalMaterial — understand lighting models, PBR properties, and when to use each one.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/building-blocks/the-spectrum-of-materials',
  twitterTitle: 'The Spectrum of Materials in Three.js',
  twitterDescription: 'Explore every Three.js material from MeshBasicMaterial to MeshPhysicalMaterial — understand lighting models, PBR properties, and when to use each one.',
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
