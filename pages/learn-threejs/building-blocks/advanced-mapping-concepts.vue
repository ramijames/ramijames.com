<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Advanced Mapping Concepts" tagline="Using texture maps to control every aspect of a PBR material" />

      <main class="w-content page-top">
        <section class="content">

          <h2>The Anatomy of a PBR Material</h2>

          <p>In the <NuxtLink to="/learn-threejs/building-blocks/physically-based-rendering">previous article</NuxtLink>, we used single values for roughness, metalness, and color — the entire surface had the same properties. Real objects aren't uniform. A rusted iron bar is shiny where the metal is exposed and rough where rust has formed. A wooden floor is smooth where it's polished and matte where it's scuffed.</p>

          <p>To create this kind of variation, PBR materials use <strong>texture maps</strong> — 2D images that control a specific property at every point on the surface. Each pixel in the map corresponds to a point on the mesh, and its value overrides the scalar property. Four primary maps form the foundation of any realistic PBR material.</p>

          <h3>1. Color Map (Albedo / Diffuse)</h3>

          <p>The <strong>color map</strong> — also called <strong>albedo</strong> or <strong>diffuse map</strong> — defines the base color pattern of the surface. It tells the GPU "this part is brick red, this part is gray mortar." In PBR, the color map should contain <em>only</em> the raw surface color — no baked-in shadows, no lighting, no ambient occlusion. The lighting system handles all of that.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="colorMapCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The left sphere uses a flat color. The right sphere uses a procedural color map — same geometry, same lighting, but the texture gives it a pattern. The map is applied to the <code>map</code> property.</p>

          <CodeBlock lang="typescript" :code="`// Load a color (albedo) texture
const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load('/textures/brick_color.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap  // Replaces the flat 'color' property
});

// Pro tip: your color map should NEVER contain
// baked shadows — the PBR lighting handles that.
// Keep it as the pure, flat surface color.`" />

          <h3>2. Roughness Map</h3>

          <p>The <strong>roughness map</strong> is a grayscale image that controls how rough or smooth each point on the surface is. White pixels (1.0) mean fully rough — light scatters in all directions, like chalk or matte paint. Black pixels (0.0) mean perfectly smooth — light reflects crisply, like a mirror. Gray values are in between.</p>

          <p>A "scratched metal" texture uses a roughness map where the scratches are white (rough, light scatters) and the polished metal between scratches is black (smooth, sharp reflections).</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="roughnessMapCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The left sphere has uniform roughness. The right sphere uses a roughness map — notice how some areas reflect sharply while others scatter light diffusely, all on the same object.</p>

          <CodeBlock lang="typescript" :code="`const roughnessMap = textureLoader.load('/textures/brick_roughness.jpg');

const material = new THREE.MeshStandardMaterial({
  color: 0xcccccc,
  roughnessMap: roughnessMap, // Per-pixel roughness
  roughness: 1.0              // Scales the map values
});

// roughness acts as a multiplier:
// final roughness = roughnessMap pixel * roughness value
// So roughness: 0.5 with a white pixel (1.0) = 0.5`" />

          <h3>3. Metalness Map</h3>

          <p>The <strong>metalness map</strong> tells Three.js which parts of the object are metal and which are dielectric (plastic, wood, stone). This is usually a high-contrast image — a gold ring on a wooden table would have white (metal) for the ring and black (non-metal) for the wood. In-between values are rare in physically accurate materials since real surfaces are either metal or not.</p>

          <p>Why does this matter? Metals reflect light fundamentally differently — they tint the color of their reflections and have no diffuse component. Getting this map right is critical for realism.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="metalnessMapCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The left sphere is uniformly metallic. The right sphere uses a metalness map — some regions behave as metal (tinted reflections, no diffuse) while others behave as dielectric (white reflections, colored diffuse).</p>

          <CodeBlock lang="typescript" :code="`const metalnessMap = textureLoader.load('/textures/rust_metalness.jpg');

const material = new THREE.MeshStandardMaterial({
  color: 0xcc8844,
  metalnessMap: metalnessMap, // Per-pixel metalness
  metalness: 1.0              // Scales the map values
});

// White pixels = metal (tinted reflections, no diffuse)
// Black pixels = dielectric (white reflections, colored diffuse)
// For physically accurate results, avoid gray values`" />

          <h3>4. Normal Map (The Illusion of Detail)</h3>

          <p>The <strong>normal map</strong> is the most powerful map in the toolkit. It's the strange-looking purple and blue image that tricks the lighting into thinking the surface has bumps, dents, cracks, and grooves — without adding a single extra vertex. Each pixel encodes a direction (the surface normal at that point), and the shader uses it to calculate how light bounces off that pixel.</p>

          <p>This lets you make a flat plane look like a rugged stone wall, or a smooth sphere look like a golf ball — all by changing how light interacts with the surface, not the actual geometry.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="normalMapCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The left sphere is geometrically smooth with no normal map. The right sphere uses a procedural normal map — the geometry is identical, but the lighting creates the illusion of a textured surface. The <code>normalScale</code> vector controls the intensity of the effect.</p>

          <CodeBlock lang="typescript" :code="`const normalMap = textureLoader.load('/textures/brick_normal.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
  normalScale: new THREE.Vector2(1.0, 1.0) // Strength of the effect
});

// normalScale controls intensity:
// (1, 1) = full strength
// (0.5, 0.5) = half strength (subtler bumps)
// (2, 2) = exaggerated bumps
// Negative values invert the bump direction`" />

          <h3>The Layering Logic</h3>

          <p>These four maps work together to build a complete material. Each map controls one independent aspect of the surface, and the shader combines them per-pixel to produce the final result. For example, to create a realistic wet cobblestone street:</p>

          <ul>
            <li><strong>Color Map</strong> — The gray stone texture with mortar lines between blocks.</li>
            <li><strong>Normal Map</strong> — Creates the bumps between and across the stones without extra geometry.</li>
            <li><strong>Roughness Map</strong> — Puddles are black (perfectly smooth, mirror-like reflections) and dry stone is white (rough, scattered light).</li>
            <li><strong>Metalness Map</strong> — Entirely black, since stone isn't metal.</li>
          </ul>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="layeringCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows a sphere with all four maps applied simultaneously. The color map provides the pattern, the normal map adds surface detail, the roughness map creates variation in shininess, and the metalness map defines which regions are metallic. Together they produce a surface that looks far more complex than the underlying geometry.</p>

          <CodeBlock lang="typescript" :code="`// A complete PBR material with all four maps
const material = new THREE.MeshStandardMaterial({
  map: colorMap,              // Base color pattern
  normalMap: normalMap,        // Surface detail / bumps
  normalScale: new THREE.Vector2(1.0, 1.0),
  roughnessMap: roughnessMap,  // Per-pixel roughness
  roughness: 1.0,
  metalnessMap: metalnessMap,  // Metal vs non-metal regions
  metalness: 1.0
});

// The scalar roughness/metalness values act as multipliers
// for their respective maps. Set them to 1.0 when using
// maps so the map has full control.`" />

          <h3>Additional Map Types</h3>

          <p>Beyond the four primary maps, Three.js supports several more that add further realism:</p>

          <ul>
            <li><code>aoMap</code> — <strong>Ambient Occlusion</strong>: darkens crevices and corners where ambient light can't reach. Requires a second UV set (<code>uv2</code>).</li>
            <li><code>displacementMap</code> — Actually moves vertices based on a heightmap, creating real geometry changes (unlike normal maps which only fake it). Requires a high-poly mesh to work well.</li>
            <li><code>emissiveMap</code> — Controls which parts of the surface glow. Combined with the <code>emissive</code> color.</li>
            <li><code>alphaMap</code> — Controls transparency per-pixel. Requires <code>transparent: true</code> on the material.</li>
            <li><code>envMap</code> — An environment map for reflections, as covered in the <NuxtLink to="/learn-threejs/building-blocks/physically-based-rendering">PBR article</NuxtLink>.</li>
          </ul>

          <h3>Displacement vs Normal Maps</h3>

          <p>Normal maps and displacement maps solve the same problem — adding surface detail — but in fundamentally different ways. A <strong>normal map</strong> fakes the detail by changing how light calculates on a flat surface. A <strong>displacement map</strong> actually moves the vertices, creating real geometric changes. The trade-off: displacement requires a highly subdivided mesh (many vertices to move), while normal maps work on any geometry.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="displacementCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>Left: a smooth sphere with only a normal map — the silhouette is perfectly round, but the surface looks bumpy. Right: the same sphere with a displacement map — the silhouette itself is deformed, and the bumps are real geometry. Displacement is more convincing at edges and in silhouette, but costs more vertices.</p>

          <CodeBlock lang="typescript" :code="`// Normal map only — fake bumps, smooth silhouette
const normalOnly = new THREE.MeshStandardMaterial({
  normalMap: normalMap,
  normalScale: new THREE.Vector2(1.5, 1.5)
});

// Displacement map — real geometry deformation
const displaced = new THREE.MeshStandardMaterial({
  displacementMap: heightMap,
  displacementScale: 0.3,  // How far vertices move
  displacementBias: -0.15, // Offset (center the displacement)
  normalMap: normalMap       // Often used together
});

// Displacement needs a high-poly mesh to look good
const geometry = new THREE.SphereGeometry(1, 128, 128);`" />

          <h3>UV Mapping and Texture Coordinates</h3>

          <p>For texture maps to work, every vertex in a mesh needs <strong>UV coordinates</strong> — a 2D position (u, v) that maps it to a point on the texture image. All built-in Three.js geometries come with UVs pre-computed. For custom <NuxtLink to="/learn-threejs/building-blocks/buffer-geometry">BufferGeometry</NuxtLink>, you need to set the <code>uv</code> attribute yourself.</p>

          <p>You can control how textures tile and offset using the texture's <code>repeat</code>, <code>offset</code>, and <code>wrapS</code>/<code>wrapT</code> properties:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="uvCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows the same texture at different tiling scales. Increasing <code>repeat</code> tiles the pattern more densely across the surface.</p>

          <CodeBlock lang="typescript" :code="`// Tile a texture 4x4 across the surface
const texture = textureLoader.load('/textures/pattern.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);

// Offset the tiling origin
texture.offset.set(0.25, 0.0);

// For custom BufferGeometry, set UVs manually
const uvs = new Float32Array([
  0, 0,  // vertex 0: bottom-left of texture
  1, 0,  // vertex 1: bottom-right
  1, 1,  // vertex 2: top-right
  0, 1   // vertex 3: top-left
]);
geometry.setAttribute('uv',
  new THREE.BufferAttribute(uvs, 2));`" />

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/building-blocks/physically-based-rendering"
    prevText="Physically Based Rendering"
    nextLink="/learn-threejs/building-blocks"
    nextText="Building Blocks"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const colorMapCanvas = ref(null);
const roughnessMapCanvas = ref(null);
const metalnessMapCanvas = ref(null);
const normalMapCanvas = ref(null);
const layeringCanvas = ref(null);
const displacementCanvas = ref(null);
const uvCanvas = ref(null);

let renderers = [];
let animationId = null;

// ===== Procedural texture generators =====

// Generate a brick-like color texture
function createBrickColorTexture(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Mortar background
  ctx.fillStyle = '#888880';
  ctx.fillRect(0, 0, size, size);

  const brickW = size / 4;
  const brickH = size / 8;
  const gap = size * 0.01;

  const brickColors = ['#b85533', '#c46040', '#a84828', '#cc6644', '#b05030'];

  for (let row = 0; row < 8; row++) {
    const offset = (row % 2) * (brickW / 2);
    for (let col = -1; col < 5; col++) {
      const x = col * brickW + offset + gap;
      const y = row * brickH + gap;
      const color = brickColors[(row * 5 + col + 3) % brickColors.length];
      ctx.fillStyle = color;
      ctx.fillRect(x, y, brickW - gap * 2, brickH - gap * 2);

      // Subtle variation
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
      ctx.fillRect(x, y, brickW - gap * 2, brickH - gap * 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Generate a roughness map (bricks rough, mortar rougher)
function createBrickRoughnessTexture(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Mortar: very rough
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  const brickW = size / 4;
  const brickH = size / 8;
  const gap = size * 0.01;

  for (let row = 0; row < 8; row++) {
    const offset = (row % 2) * (brickW / 2);
    for (let col = -1; col < 5; col++) {
      const x = col * brickW + offset + gap;
      const y = row * brickH + gap;
      // Bricks: medium rough, some variation
      const v = 140 + Math.floor(Math.random() * 40);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, brickW - gap * 2, brickH - gap * 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Generate a metalness map (mostly non-metal with metallic patches)
function createMetalnessTexture(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Base: non-metal
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);

  // Add some metallic patches (like exposed metal under paint)
  for (let i = 0; i < 12; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 20 + Math.random() * 40;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.6, '#aaaaaa');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Generate a simple procedural normal map (bumpy surface)
function createProceduralNormalMap(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Generate height data first
  const heightData = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let h = 0;
      // Layered noise-like pattern
      h += Math.sin(x * 0.05) * Math.cos(y * 0.05) * 0.5;
      h += Math.sin(x * 0.12 + y * 0.08) * 0.3;
      h += Math.sin(x * 0.25 - y * 0.18) * 0.15;
      h += Math.sin(x * 0.5 + y * 0.4) * 0.05;
      heightData[y * size + x] = h;
    }
  }

  // Convert height to normal map
  const imageData = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      const left = heightData[y * size + ((x - 1 + size) % size)];
      const right = heightData[y * size + ((x + 1) % size)];
      const up = heightData[((y - 1 + size) % size) * size + x];
      const down = heightData[((y + 1) % size) * size + x];

      // Normal from height differences
      const dx = (left - right) * 2.0;
      const dy = (up - down) * 2.0;
      const dz = 1.0;

      // Normalize
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // Map from [-1,1] to [0,255]
      imageData.data[idx] = ((dx / len) * 0.5 + 0.5) * 255;
      imageData.data[idx + 1] = ((dy / len) * 0.5 + 0.5) * 255;
      imageData.data[idx + 2] = ((dz / len) * 0.5 + 0.5) * 255;
      imageData.data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Generate a brick-shaped normal map
function createBrickNormalMap(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Build height data for bricks
  const heightData = new Float32Array(size * size);
  const brickW = size / 4;
  const brickH = size / 8;
  const gap = size * 0.015;

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const row = Math.floor(py / brickH);
      const offset = (row % 2) * (brickW / 2);
      const localX = ((px - offset + size) % size) % brickW;
      const localY = py % brickH;

      // In mortar gap?
      if (localX < gap || localX > brickW - gap || localY < gap || localY > brickH - gap) {
        heightData[py * size + px] = 0.0;
      } else {
        heightData[py * size + px] = 0.8 + Math.random() * 0.05;
      }
    }
  }

  // Convert height to normals
  const imageData = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const left = heightData[y * size + ((x - 1 + size) % size)];
      const right = heightData[y * size + ((x + 1) % size)];
      const up = heightData[((y - 1 + size) % size) * size + x];
      const down = heightData[((y + 1) % size) * size + x];

      const dx = (left - right) * 3.0;
      const dy = (up - down) * 3.0;
      const dz = 1.0;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);

      imageData.data[idx] = ((dx / len) * 0.5 + 0.5) * 255;
      imageData.data[idx + 1] = ((dy / len) * 0.5 + 0.5) * 255;
      imageData.data[idx + 2] = ((dz / len) * 0.5 + 0.5) * 255;
      imageData.data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Generate a displacement/height map
function createDisplacementTexture(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const imageData = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let h = 0;
      h += Math.sin(x * 0.04) * Math.cos(y * 0.04) * 0.4;
      h += Math.sin(x * 0.1 + y * 0.07) * 0.3;
      h += Math.sin(x * 0.2 - y * 0.15) * 0.2;
      h += Math.sin(x * 0.5 + y * 0.35) * 0.1;

      const v = Math.floor((h * 0.5 + 0.5) * 255);
      const idx = (y * size + x) * 4;
      imageData.data[idx] = v;
      imageData.data[idx + 1] = v;
      imageData.data[idx + 2] = v;
      imageData.data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Generate a checkerboard pattern for UV demo
function createCheckerTexture(size = 512, divisions = 8) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const cellSize = size / divisions;
  for (let row = 0; row < divisions; row++) {
    for (let col = 0; col < divisions; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? '#cc8844' : '#664422';
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

onMounted(() => {
  if (!colorMapCanvas.value || !roughnessMapCanvas.value || !metalnessMapCanvas.value || !normalMapCanvas.value || !layeringCanvas.value || !displacementCanvas.value || !uvCanvas.value) return;

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

  const createEnvMap = (renderer) => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x88aacc);

    const light1 = new THREE.PointLight(0xffeedd, 50, 0);
    light1.position.set(5, 5, 5);
    envScene.add(light1);

    const light2 = new THREE.PointLight(0xddeeff, 30, 0);
    light2.position.set(-5, 3, -3);
    envScene.add(light2);

    const envMap = pmremGenerator.fromScene(envScene).texture;
    pmremGenerator.dispose();
    return envMap;
  };

  const sphereGeom = new THREE.SphereGeometry(1.2, 64, 64);

  // Pre-generate textures
  const brickColor = createBrickColorTexture();
  const brickRoughness = createBrickRoughnessTexture();
  const metalnessMap = createMetalnessTexture();
  const proceduralNormal = createProceduralNormalMap();
  const brickNormal = createBrickNormalMap();
  const displacementTex = createDisplacementTexture();
  const checkerTex = createCheckerTexture();

  // ===== SCENE 1: Color Map =====
  const scene1 = createScene(0x111122);
  addLights(scene1);

  const colorGroup = new THREE.Group();

  // Flat color sphere
  const flatSphere = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({ color: 0xb85533, roughness: 0.7 })
  );
  flatSphere.position.x = -2;
  colorGroup.add(flatSphere);

  // Color map sphere
  const colorMapSphere = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({ map: brickColor, roughness: 0.7 })
  );
  colorMapSphere.position.x = 2;
  colorGroup.add(colorMapSphere);

  scene1.add(colorGroup);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(colorMapCanvas.value);
  cam1.position.set(0, 0.5, 5);
  cam1.lookAt(0, 0, 0);

  const envMap1 = createEnvMap(ren1);
  scene1.environment = envMap1;

  animations.push(() => {
    colorGroup.rotation.y += 0.004;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: Roughness Map =====
  const scene2 = createScene(0x111122);
  addLights(scene2);

  const roughGroup = new THREE.Group();

  // Uniform roughness
  const uniformRough = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.5, metalness: 0.5 })
  );
  uniformRough.position.x = -2;
  roughGroup.add(uniformRough);

  // Roughness map
  const roughMapSphere = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({ color: 0xcccccc, roughnessMap: brickRoughness, roughness: 1.0, metalness: 0.5 })
  );
  roughMapSphere.position.x = 2;
  roughGroup.add(roughMapSphere);

  scene2.add(roughGroup);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(roughnessMapCanvas.value);
  cam2.position.set(0, 0.5, 5);
  cam2.lookAt(0, 0, 0);

  const envMap2 = createEnvMap(ren2);
  scene2.environment = envMap2;

  animations.push(() => {
    roughGroup.rotation.y += 0.004;
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: Metalness Map =====
  const scene3 = createScene(0x111122);
  addLights(scene3);

  const metalGroup = new THREE.Group();

  // Uniform metalness
  const uniformMetal = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({ color: 0xcc8844, roughness: 0.3, metalness: 1.0 })
  );
  uniformMetal.position.x = -2;
  metalGroup.add(uniformMetal);

  // Metalness map
  const metalMapSphere = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({ color: 0xcc8844, roughness: 0.3, metalnessMap: metalnessMap, metalness: 1.0 })
  );
  metalMapSphere.position.x = 2;
  metalGroup.add(metalMapSphere);

  scene3.add(metalGroup);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(metalnessMapCanvas.value);
  cam3.position.set(0, 0.5, 5);
  cam3.lookAt(0, 0, 0);

  const envMap3 = createEnvMap(ren3);
  scene3.environment = envMap3;

  animations.push(() => {
    metalGroup.rotation.y += 0.004;
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: Normal Map =====
  const scene4 = createScene(0x111122);
  addLights(scene4);

  const normalGroup = new THREE.Group();

  // No normal map
  const smoothSphere = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({ color: 0xccaa88, roughness: 0.4, metalness: 0.2 })
  );
  smoothSphere.position.x = -2;
  normalGroup.add(smoothSphere);

  // Normal map sphere
  const normalMapSphere = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({
      color: 0xccaa88,
      roughness: 0.4,
      metalness: 0.2,
      normalMap: proceduralNormal,
      normalScale: new THREE.Vector2(1.5, 1.5)
    })
  );
  normalMapSphere.position.x = 2;
  normalGroup.add(normalMapSphere);

  scene4.add(normalGroup);

  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(normalMapCanvas.value);
  cam4.position.set(0, 0.5, 5);
  cam4.lookAt(0, 0, 0);

  const envMap4 = createEnvMap(ren4);
  scene4.environment = envMap4;

  animations.push(() => {
    normalGroup.rotation.y += 0.004;
    ren4.render(scene4, cam4);
  });

  // ===== SCENE 5: All Maps Layered =====
  const scene5 = createScene(0x111122);
  addLights(scene5);

  const layerGroup = new THREE.Group();

  const fullMaterialSphere = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({
      map: brickColor,
      normalMap: brickNormal,
      normalScale: new THREE.Vector2(1.5, 1.5),
      roughnessMap: brickRoughness,
      roughness: 1.0,
      metalnessMap: metalnessMap,
      metalness: 1.0
    })
  );
  layerGroup.add(fullMaterialSphere);

  scene5.add(layerGroup);

  const { camera: cam5, renderer: ren5, container: con5, sizes: sz5 } = createRendererPair(layeringCanvas.value);
  cam5.position.set(0, 0.5, 3.5);
  cam5.lookAt(0, 0, 0);

  const envMap5 = createEnvMap(ren5);
  scene5.environment = envMap5;

  animations.push(() => {
    layerGroup.rotation.y += 0.004;
    ren5.render(scene5, cam5);
  });

  // ===== SCENE 6: Displacement vs Normal Map =====
  const scene6 = createScene(0x111122);
  addLights(scene6);

  const dispGroup = new THREE.Group();

  // Normal map only (low-poly sphere is fine)
  const normalOnlySphere = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({
      color: 0xccaa88,
      roughness: 0.5,
      normalMap: proceduralNormal,
      normalScale: new THREE.Vector2(2.0, 2.0)
    })
  );
  normalOnlySphere.position.x = -2;
  dispGroup.add(normalOnlySphere);

  // Displacement map (needs high-poly sphere)
  const highPolySphere = new THREE.SphereGeometry(1.2, 128, 128);
  const displacedSphere = new THREE.Mesh(
    highPolySphere,
    new THREE.MeshStandardMaterial({
      color: 0xccaa88,
      roughness: 0.5,
      displacementMap: displacementTex,
      displacementScale: 0.25,
      displacementBias: -0.125,
      normalMap: proceduralNormal,
      normalScale: new THREE.Vector2(1.0, 1.0)
    })
  );
  displacedSphere.position.x = 2;
  dispGroup.add(displacedSphere);

  scene6.add(dispGroup);

  const { camera: cam6, renderer: ren6, container: con6, sizes: sz6 } = createRendererPair(displacementCanvas.value);
  cam6.position.set(0, 0.5, 5);
  cam6.lookAt(0, 0, 0);

  const envMap6 = createEnvMap(ren6);
  scene6.environment = envMap6;

  animations.push(() => {
    dispGroup.rotation.y += 0.004;
    ren6.render(scene6, cam6);
  });

  // ===== SCENE 7: UV Tiling =====
  const scene7 = createScene(0x111122);
  addLights(scene7);

  const uvGroup = new THREE.Group();

  // 1x tiling
  const tex1x = checkerTex.clone();
  tex1x.needsUpdate = true;
  const uv1 = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({ map: tex1x, roughness: 0.5 })
  );
  uv1.position.x = -3.5;
  uvGroup.add(uv1);

  // 2x tiling
  const tex2x = checkerTex.clone();
  tex2x.repeat.set(2, 2);
  tex2x.needsUpdate = true;
  const uv2 = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({ map: tex2x, roughness: 0.5 })
  );
  uv2.position.x = 0;
  uvGroup.add(uv2);

  // 4x tiling
  const tex4x = checkerTex.clone();
  tex4x.repeat.set(4, 4);
  tex4x.needsUpdate = true;
  const uv3 = new THREE.Mesh(
    sphereGeom,
    new THREE.MeshStandardMaterial({ map: tex4x, roughness: 0.5 })
  );
  uv3.position.x = 3.5;
  uvGroup.add(uv3);

  scene7.add(uvGroup);

  const { camera: cam7, renderer: ren7, container: con7, sizes: sz7 } = createRendererPair(uvCanvas.value);
  cam7.position.set(0, 0.5, 6);
  cam7.lookAt(0, 0, 0);

  const envMap7 = createEnvMap(ren7);
  scene7.environment = envMap7;

  animations.push(() => {
    uvGroup.rotation.y += 0.004;
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
  title: 'Advanced Mapping Concepts in Three.js'
})

useSeoMeta({
  title: 'Advanced Mapping Concepts in Three.js',
  ogTitle: 'Advanced Mapping Concepts in Three.js',
  description: 'Learn how to use color maps, roughness maps, metalness maps, normal maps, and displacement maps to create realistic PBR materials in Three.js.',
  ogDescription: 'Learn how to use color maps, roughness maps, metalness maps, normal maps, and displacement maps to create realistic PBR materials in Three.js.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/building-blocks/mapping',
  twitterTitle: 'Advanced Mapping Concepts in Three.js',
  twitterDescription: 'Learn how to use color maps, roughness maps, metalness maps, normal maps, and displacement maps to create realistic PBR materials in Three.js.',
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
