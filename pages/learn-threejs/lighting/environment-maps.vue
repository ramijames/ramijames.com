<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Environment Maps" tagline="Using HDR images to light, reflect, and ground your 3D scenes in reality" />

      <main class="w-content page-top">
        <section class="content">

          <h2>What Are Environment Maps?</h2>

          <p>An environment map is an image that wraps around your entire scene, representing the surrounding world. It serves two purposes: it can act as a <strong>background</strong> (what the viewer sees behind your objects) and as a <strong>light source</strong> (what your materials reflect and what illuminates their surfaces). Environment maps are the fastest way to achieve realistic reflections and lighting without placing dozens of individual lights.</p>

          <p>In the real world, objects are lit by everything around them: the sky, the ground, nearby walls, distant buildings. Environment maps capture this omnidirectional lighting in a single image. When applied to a scene, they provide the kind of nuanced, natural illumination that point lights and directional lights alone can't match.</p>

          <h2>Types of Environment Maps</h2>

          <p>Three.js supports two primary formats for environment maps:</p>

          <ul>
            <li><strong>Cube maps</strong> — Six square images arranged as the faces of a cube (positive X, negative X, positive Y, negative Y, positive Z, negative Z). This is the classic format, but managing six separate files is cumbersome.</li>
            <li><strong>Equirectangular maps</strong> — A single panoramic image that wraps around a sphere, like a Mercator projection of the sky. This is the modern standard. Most HDR environment maps you'll find online use this format.</li>
          </ul>

          <p>The equirectangular format has largely won out. It's a single file, easier to work with, and Three.js handles the conversion to a cube map internally via the <code>PMREMGenerator</code>. For the rest of this article, we'll focus on equirectangular HDR maps.</p>

          <h2>Loading an HDR Environment Map</h2>

          <p>HDR (High Dynamic Range) images store brightness values beyond the 0–255 range of standard images. This extra range is critical for realistic lighting because it preserves the intensity differences between, say, the sun and the sky around it. Three.js uses the <code>RGBELoader</code> to load <code>.hdr</code> files.</p>

          <CodeBlock lang="typescript" :code="`import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

new RGBELoader().load('/path/to/environment.hdr', (texture) => {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;

  // Use as scene background
  scene.background = envMap;

  // Use as lighting source for all materials
  scene.environment = envMap;

  // Clean up
  texture.dispose();
  pmremGenerator.dispose();
});`" />

          <p>The <code>PMREMGenerator</code> (Prefiltered Mipmapped Radiance Environment Map Generator) processes the raw HDR texture into a format optimized for physically based materials. It pre-computes multiple blur levels so that rough surfaces reflect a blurry version of the environment while smooth surfaces reflect it sharply. Without this step, all reflections would be mirror-sharp regardless of material roughness.</p>

          <h2>Environment Map as Background</h2>

          <p>Setting <code>scene.background</code> to an environment map texture places the panoramic image behind everything in your scene. The viewer sees the environment surrounding the objects, giving the impression that the scene exists in a real location.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="backgroundCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows a metallic sphere placed inside an HDR environment. The environment map serves as both the visible background and the source of reflections on the sphere's surface. Notice how the sphere picks up colors and light from the surrounding environment, not from any placed lights.</p>

          <CodeBlock lang="typescript" :code="`// Setting the environment map as background
scene.background = envMap;

// You can also control the background blur
scene.backgroundBlurriness = 0.0;  // 0 = sharp, 1 = fully blurred
scene.backgroundIntensity = 1.0;   // brightness of the background`" />

          <h2>Environment Map as Lighting</h2>

          <p>Setting <code>scene.environment</code> tells Three.js to use the environment map as the lighting source for all <code>MeshStandardMaterial</code> and <code>MeshPhysicalMaterial</code> objects in the scene. This is called <strong>image-based lighting</strong> (IBL). Every surface samples the environment map to determine what light is hitting it and what it should reflect.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="iblCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>This demo shows three spheres with different roughness values, all lit exclusively by the environment map (no directional or point lights). The leftmost sphere is mirror-smooth and shows crisp reflections. The middle sphere is moderately rough, showing blurred reflections. The rightmost sphere is very rough, reflecting only broad color tones from the environment. This is the PMREMGenerator at work: each roughness level samples a different pre-filtered mip level of the environment map.</p>

          <CodeBlock lang="typescript" :code="`// Use environment map for lighting all PBR materials
scene.environment = envMap;

// You can also set envMap per-material for more control:
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1.0,
  roughness: 0.0,
  envMap: envMap,           // override scene.environment
  envMapIntensity: 1.5      // boost reflections on this material
});`" />

          <h2>Separating Background from Lighting</h2>

          <p>You don't have to use the same map for both background and lighting. A common technique is to use an environment map for lighting but set the background to a solid color or a blurred version of the map. This keeps the lighting realistic while giving you creative control over the backdrop.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="separateCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>Here the objects are lit by an HDR environment map, but the background is a plain dark color. The reflections on the metallic surfaces still show the environment, yet the background is clean and uncluttered. This is a common setup for product visualization and portfolio pieces.</p>

          <CodeBlock lang="typescript" :code="`// Lighting from environment map, plain background
scene.environment = envMap;
scene.background = new THREE.Color(0x111111);

// Or use a blurred version of the same map
scene.background = envMap;
scene.backgroundBlurriness = 0.8;  // Soft, out-of-focus background`" />

          <h2>Material Properties and Environment Maps</h2>

          <p>How strongly an environment map affects a material depends on three properties: <code>metalness</code>, <code>roughness</code>, and <code>envMapIntensity</code>. Understanding these interactions is essential for getting the look you want.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="materialsCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The grid above shows spheres across a range of metalness (left to right) and roughness (top to bottom). Metallic surfaces reflect the environment directly as their color. Non-metallic (dielectric) surfaces show the environment only in their specular highlights. Higher roughness blurs the reflection regardless of metalness. The <code>envMapIntensity</code> property scales how bright the environment reflection appears.</p>

          <CodeBlock lang="typescript" :code="`// Metallic, mirror-smooth: strong, crisp reflections
const chrome = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1.0,
  roughness: 0.0,
  envMapIntensity: 1.0
});

// Non-metallic, smooth: subtle reflections in highlights
const plastic = new THREE.MeshStandardMaterial({
  color: 0xff4444,
  metalness: 0.0,
  roughness: 0.2,
  envMapIntensity: 1.0
});

// Rough metal: broad, blurred color from environment
const brushedMetal = new THREE.MeshStandardMaterial({
  color: 0xcccccc,
  metalness: 1.0,
  roughness: 0.6,
  envMapIntensity: 1.0
});`" />

          <h2>Loading Cube Map Environments</h2>

          <p>While equirectangular HDR maps are the modern standard, you may encounter cube maps, especially in older tutorials or game assets. A cube map consists of six images representing the faces of a cube: px, nx, py, ny, pz, nz (positive/negative X, Y, Z).</p>

          <CodeBlock lang="typescript" :code="`import { CubeTextureLoader } from 'three';

const cubeLoader = new CubeTextureLoader();
cubeLoader.setPath('/textures/cubemap/');

const cubeMap = cubeLoader.load([
  'px.png', 'nx.png',  // right, left
  'py.png', 'ny.png',  // top, bottom
  'pz.png', 'nz.png'   // front, back
]);

scene.background = cubeMap;
scene.environment = cubeMap;

// Cube maps work directly without PMREMGenerator,
// but for proper roughness-based reflections you should
// still process them:
const envMap = pmremGenerator.fromCubemap(cubeMap).texture;
scene.environment = envMap;`" />

          <h2>Performance Considerations</h2>

          <p>Environment maps are one of the best performance bargains in 3D rendering. A single HDR map replaces potentially dozens of light sources, and the PMREMGenerator does its heavy work once at load time rather than every frame. That said, there are a few things to watch:</p>

          <ul>
            <li><strong>Texture resolution:</strong> HDR environment maps are large. A 4K equirectangular map is common and works well for most cases. Going to 8K or higher increases load time and GPU memory without much visible benefit unless you're displaying the background at full screen with no blur.</li>
            <li><strong>PMREMGenerator cost:</strong> The generation step happens once, but it's not free. On low-end GPUs it can cause a brief stutter. Call <code>pmremGenerator.compileEquirectangularShader()</code> early to spread the cost.</li>
            <li><strong>Tone mapping:</strong> HDR environments require tone mapping to display correctly on standard screens. <code>THREE.ACESFilmicToneMapping</code> is the most common choice. Without it, bright areas will clip to white and you'll lose the dynamic range that makes HDR valuable.</li>
            <li><strong>Dispose when done:</strong> Always dispose of the source texture and the PMREMGenerator after creating the environment map. The processed texture lives on the GPU; the source data is no longer needed.</li>
          </ul>

          <CodeBlock lang="typescript" :code="`// Proper cleanup pattern
new RGBELoader().load('/environment.hdr', (texture) => {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;

  scene.background = envMap;
  scene.environment = envMap;

  // Free the source texture and generator
  texture.dispose();
  pmremGenerator.dispose();
});

// Tone mapping is essential for HDR
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;  // adjust to taste

// Other tone mapping options:
// THREE.LinearToneMapping      — no adjustment (clips HDR)
// THREE.ReinhardToneMapping    — soft rolloff
// THREE.CineonToneMapping      — film-like response
// THREE.ACESFilmicToneMapping  — industry standard, best default`" />

          <h2>Where to Find Environment Maps</h2>

          <p>You don't need to create your own HDR panoramas. Several sites offer free, high-quality environment maps licensed for commercial use:</p>

          <ul>
            <li><strong>Poly Haven</strong> (polyhaven.com/hdris) — Hundreds of free CC0-licensed HDR environments. This is the go-to source for most Three.js developers. Maps are available in multiple resolutions.</li>
            <li><strong>ambientCG</strong> (ambientcg.com) — Another large collection of CC0 HDR environments alongside PBR materials and textures.</li>
            <li><strong>iHDRI</strong> (ihdri.com) — Curated HDR panoramas, free for personal and commercial use.</li>
          </ul>

          <p>Download in <code>.hdr</code> format for use with <code>RGBELoader</code>. A 2K resolution (2048 x 1024) is sufficient for lighting-only use. Use 4K if the map will also serve as a visible background.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/lighting/custom-shadow-materials"
    prevText="Custom Shadow Materials"
    nextLink="/learn-threejs/assets/asset-standards"
    nextText="Asset Standards"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const backgroundCanvas = ref(null);
const iblCanvas = ref(null);
const separateCanvas = ref(null);
const materialsCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!backgroundCanvas.value || !iblCanvas.value || !separateCanvas.value || !materialsCanvas.value) return;

  const animations = [];

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

  // Generate a procedural environment map (a gradient sky with a bright sun spot)
  const createProceduralEnvMap = (renderer) => {
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();

    // Create a simple scene that acts as our environment
    const envScene = new THREE.Scene();

    // Sky gradient using a large sphere with a gradient material
    const skyGeo = new THREE.SphereGeometry(50, 64, 64);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color(0x0077cc) },
        bottomColor: { value: new THREE.Color(0x88aacc) },
        groundColor: { value: new THREE.Color(0x665544) },
        sunColor: { value: new THREE.Color(0xffffee) },
        sunDirection: { value: new THREE.Vector3(0.5, 0.4, 0.3).normalize() },
        sunSize: { value: 0.07 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform vec3 groundColor;
        uniform vec3 sunColor;
        uniform vec3 sunDirection;
        uniform float sunSize;
        varying vec3 vWorldPosition;

        void main() {
          vec3 dir = normalize(vWorldPosition);
          float y = dir.y;

          // Sky gradient
          vec3 sky = mix(bottomColor, topColor, max(y, 0.0));

          // Ground
          if (y < 0.0) {
            sky = mix(groundColor * 0.5, groundColor, smoothstep(-1.0, 0.0, y));
          }

          // Sun disc
          float sunDot = dot(dir, sunDirection);
          float sunFactor = smoothstep(1.0 - sunSize, 1.0, sunDot);
          sky += sunColor * sunFactor * 8.0;

          // Sun glow
          float glowFactor = smoothstep(0.7, 1.0, sunDot);
          sky += sunColor * glowFactor * 0.4;

          gl_FragColor = vec4(sky, 1.0);
        }
      `
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    envScene.add(skyMesh);

    const envMap = pmrem.fromScene(envScene, 0, 0.1, 100).texture;

    skyMat.dispose();
    skyGeo.dispose();
    pmrem.dispose();

    return envMap;
  };

  // ===== SCENE 1: Environment Map as Background =====
  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(backgroundCanvas.value);

  const scene1 = new THREE.Scene();
  const envMap1 = createProceduralEnvMap(ren1);
  scene1.background = envMap1;
  scene1.environment = envMap1;

  const bgSphere = new THREE.Mesh(sphereGeom, new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.05
  }));
  scene1.add(bgSphere);

  cam1.position.set(0, 0.5, 3.5);
  cam1.lookAt(0, 0, 0);

  let time1 = 0;
  animations.push(() => {
    time1 += 0.005;
    bgSphere.rotation.y = time1;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: IBL with different roughness =====
  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(iblCanvas.value);

  const scene2 = new THREE.Scene();
  const envMap2 = createProceduralEnvMap(ren2);
  scene2.background = envMap2;
  scene2.environment = envMap2;

  const roughnessValues = [0.0, 0.4, 0.85];
  const iblSpheres = roughnessValues.map((r, i) => {
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: r
    });
    const mesh = new THREE.Mesh(sphereGeom, mat);
    mesh.position.x = (i - 1) * 2.8;
    scene2.add(mesh);
    return mesh;
  });

  cam2.position.set(0, 0.5, 6);
  cam2.lookAt(0, 0, 0);

  let time2 = 0;
  animations.push(() => {
    time2 += 0.003;
    iblSpheres.forEach(s => { s.rotation.y = time2; });
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: Separate background from lighting =====
  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(separateCanvas.value);

  const scene3 = new THREE.Scene();
  const envMap3 = createProceduralEnvMap(ren3);
  scene3.environment = envMap3;
  scene3.background = new THREE.Color(0x111118);

  const sepSphere1 = new THREE.Mesh(sphereGeom, new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.1
  }));
  sepSphere1.position.x = -2;
  scene3.add(sepSphere1);

  const sepSphere2 = new THREE.Mesh(sphereGeom, new THREE.MeshStandardMaterial({
    color: 0xff4444,
    metalness: 0.0,
    roughness: 0.2
  }));
  sepSphere2.position.x = 0;
  scene3.add(sepSphere2);

  const sepSphere3 = new THREE.Mesh(sphereGeom, new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.8,
    roughness: 0.3
  }));
  sepSphere3.position.x = 2;
  scene3.add(sepSphere3);

  // Add a floor
  const floorGeom = new THREE.PlaneGeometry(20, 20);
  const floor3 = new THREE.Mesh(floorGeom, new THREE.MeshStandardMaterial({
    color: 0x222228,
    roughness: 0.8,
    metalness: 0.0
  }));
  floor3.rotation.x = -Math.PI / 2;
  floor3.position.y = -1.2;
  scene3.add(floor3);

  cam3.position.set(0, 1.5, 6);
  cam3.lookAt(0, 0, 0);

  let time3 = 0;
  animations.push(() => {
    time3 += 0.004;
    sepSphere1.rotation.y = time3;
    sepSphere2.rotation.y = time3 * 0.8;
    sepSphere3.rotation.y = time3 * 1.2;
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: Material properties grid =====
  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(materialsCanvas.value);

  const scene4 = new THREE.Scene();
  const envMap4 = createProceduralEnvMap(ren4);
  scene4.environment = envMap4;
  scene4.background = new THREE.Color(0x111118);

  const smallSphere = new THREE.SphereGeometry(0.5, 48, 48);
  const gridRows = 3; // roughness levels
  const gridCols = 3; // metalness levels

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const metalness = col / (gridCols - 1);
      const roughness = row / (gridRows - 1);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness,
        roughness
      });
      const mesh = new THREE.Mesh(smallSphere, mat);
      mesh.position.x = (col - 1) * 2.0;
      mesh.position.y = (1 - row) * 1.8;
      scene4.add(mesh);
    }
  }

  cam4.position.set(0, 0, 6.5);
  cam4.lookAt(0, 0, 0);

  let time4 = 0;
  animations.push(() => {
    time4 += 0.002;
    scene4.children.forEach(child => {
      if (child.isMesh) child.rotation.y = time4;
    });
    ren4.render(scene4, cam4);
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 },
    { container: con3, camera: cam3, renderer: ren3, sizes: sz3 },
    { container: con4, camera: cam4, renderer: ren4, sizes: sz4 }
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
  title: 'Environment Maps in Three.js'
})

useSeoMeta({
  title: 'Environment Maps in Three.js',
  ogTitle: 'Environment Maps in Three.js',
  description: 'Learn how to use HDR environment maps in Three.js for realistic reflections, image-based lighting, and scene backgrounds with interactive demos.',
  ogDescription: 'Learn how to use HDR environment maps in Three.js for realistic reflections, image-based lighting, and scene backgrounds with interactive demos.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/lighting/environment-maps',
  twitterTitle: 'Environment Maps in Three.js',
  twitterDescription: 'Learn how to use HDR environment maps in Three.js for realistic reflections, image-based lighting, and scene backgrounds with interactive demos.',
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
