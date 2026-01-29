<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="The Renderer" tagline="The painter that brings your scene to life" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Understanding the WebGLRenderer</h2>

          <p>The renderer is what actually draws your 3D scene onto a 2D canvas. It takes your scene and camera, does all the complex math, and outputs pixels. Honestly, it's like frickin' magic. Three.js provides several renderers, but <strong>WebGLRenderer</strong> is by far the most common - it uses your GPU for hardware-accelerated graphics.</p>

          <h3>Basic Setup</h3>

          <p>At minimum, you need to create a renderer, set its size, and call <code>render()</code> in a loop:</p>

          <CodeBlock lang="typescript" :code="`// Create the renderer
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas });

// Set the size to match the container
renderer.setSize(width, height);

// Match device pixel density (for sharp rendering on retina displays)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Render loop
function tick() {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();`" />

          <h3>Antialiasing</h3>

          <p>Antialiasing smooths out jagged edges on your geometry. Compare these two cubes. The left has no antialiasing but the right has it enabled.</p>

          <div class="scene-row">
            <div class="scene-container half">
              <span class="label">No Antialias</span>
              <canvas ref="noAntialiasCanvas"></canvas>
            </div>
            <div class="scene-container half">
              <span class="label">Antialias: true</span>
              <canvas ref="antialiasCanvas"></canvas>
            </div>
          </div>

          <CodeBlock lang="typescript" :code="`// Enable antialiasing (slight performance cost)
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});`" />

          <p>While smooth edges are usually the goal in 3D rendering, enabling antialiasing in Three.js isn't always a "set it and forget it" win. There are several technical and creative reasons why you might intentionally leave it turned off.</p>

          <p>You might skip antialiasing to save performance on mobile devices or complex VR scenes where every millisecond of GPU time counts. It is also standard to disable it when using the EffectComposer, as post-processing stacks usually require specialized passes like FXAA or SMAA rather than the renderer's default setting. Finally, you might leave it off for stylistic reasons to achieve a sharp, "crunchy" retro or pixel-art aesthetic. Some of us out there still like that look and feel :)</p>

          <h3>Transparent Background</h3>

          <p>By default, the renderer fills the canvas with a color. Setting <code>alpha: true</code> allows the canvas background to show through, which is useful for overlaying 3D on top of HTML content.</p>

          <div class="scene-container transparent-demo">
            <section>Your awesome html goes here</section>
            <canvas ref="alphaCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`// Enable transparent background
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true
});

// Optional: set clear color with alpha
renderer.setClearColor(0x000000, 0); // fully transparent`" />

          <h3>Pixel Ratio</h3>

          <p>Modern devices have high pixel density displays (retina). Without setting the pixel ratio, your scene will look blurry:</p>

          <CodeBlock lang="typescript" :code="`// Set pixel ratio for sharp rendering
// Cap at 2 to avoid performance issues on very high DPI screens
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));`" />

          <h3>Tone Mapping</h3>

          <p>Tone mapping controls how HDR (high dynamic range) colors are converted to what your screen can display. This is especially important when working with realistic lighting.</p>

          <div class="scene-container">
            <canvas ref="toneMappingCanvas"></canvas>
          </div>

          <CodeBlock lang="typescript" :code="`// Different tone mapping options
renderer.toneMapping = THREE.NoToneMapping;      // Default, no conversion
renderer.toneMapping = THREE.LinearToneMapping;  // Simple linear
renderer.toneMapping = THREE.ReinhardToneMapping; // Film-like
renderer.toneMapping = THREE.CineonToneMapping;  // Cinematic
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Industry standard

// Exposure control (works with tone mapping)
renderer.toneMappingExposure = 1.0;`" />

          <p>You might disable tone mapping when your scene relies on specific hex colors or unlit materials that must appear exactly as defined without being shifted by exposure calculations. It is also common to leave it off if you are using a custom post-processing pipeline for color grading, where you prefer to manipulate the raw HDR data yourself.</p>
          
          <p>In projects that don't use high dynamic range (HDR) lighting, tone mapping can sometimes make the visuals appear dull or muddy rather than improving the contrast. Last but not least, disabling it is useful for UI elements and 2D overlays to ensure your interface doesn't change color as the camera moves through differently lit areas of the scene. That can be distracting and take the user out of the experience you are trying so hard to build.</p>

          <h3>Enabling Shadows</h3>

          <p>Shadow rendering is disabled by default for performance. You need to explicitly enable it:</p>

          <CodeBlock lang="typescript" :code="`// Enable shadow maps
renderer.shadowMap.enabled = true;

// Shadow quality options
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows (default: PCFShadowMap)

// Then configure your lights and objects
directionalLight.castShadow = true;
mesh.castShadow = true;
floor.receiveShadow = true;`" />

          <p>We'll talk more about Shadows in a later article.</p>

          <h3>Output Color Space</h3>

          <p>For accurate color reproduction, especially with textures, set the output color space:</p>

          <CodeBlock lang="typescript" :code="`// Use sRGB for correct color display
renderer.outputColorSpace = THREE.SRGBColorSpace;`" />

          <p>You use outputColorSpace to ensure the renderer correctly translates internal linear colors for standard displays, typically by setting it to SRGBColorSpace. It is essential for maintaining a "linear workflow," which prevents your scene from appearing washed out or overly dark when using standard lights and textures. You should enable it for nearly every modern project to ensure visual consistency with industry-standard assets like GLTF models. It is generally only bypassed if you are handling the final color encoding manually within a custom post-processing shader.</p>

          <p>Basically, this ensures colors match what you see in image editors and the web. Turn it on.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/foundational-threejs/cameras"
    prevText="Cameras"
    nextLink="/learn-threejs/foundational-threejs/the-scene-graph"
    nextText="The Scene Graph"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const noAntialiasCanvas = ref(null);
const antialiasCanvas = ref(null);
const alphaCanvas = ref(null);
const toneMappingCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(() => {
  if (!noAntialiasCanvas.value || !antialiasCanvas.value || !alphaCanvas.value || !toneMappingCanvas.value) return;

  const scenes = [];

  // ===== Helper function to create a basic scene =====
  const createScene = (backgroundColor) => {
    const scene = new THREE.Scene();
    if (backgroundColor !== null) {
      scene.background = new THREE.Color(backgroundColor);
    }
    return scene;
  };

  // ===== Helper function to create a cube =====
  const createCube = () => {
    return new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial()
    );
  };

  // ===== SCENE 1: No Antialias =====
  const sceneNoAA = createScene(0x1a1a2e);
  const cubeNoAA = createCube();
  sceneNoAA.add(cubeNoAA);

  const containerNoAA = noAntialiasCanvas.value.parentElement;
  const sizesNoAA = { width: containerNoAA.clientWidth, height: containerNoAA.clientHeight };

  const cameraNoAA = new THREE.PerspectiveCamera(75, sizesNoAA.width / sizesNoAA.height, 0.1, 100);
  cameraNoAA.position.z = 2;
  sceneNoAA.add(cameraNoAA);

  const rendererNoAA = new THREE.WebGLRenderer({ canvas: noAntialiasCanvas.value, antialias: false });
  rendererNoAA.setSize(sizesNoAA.width, sizesNoAA.height);
  rendererNoAA.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(rendererNoAA);

  scenes.push({ scene: sceneNoAA, camera: cameraNoAA, renderer: rendererNoAA, cube: cubeNoAA, sizes: sizesNoAA, container: containerNoAA });

  // ===== SCENE 2: With Antialias =====
  const sceneAA = createScene(0x1a1a2e);
  const cubeAA = createCube();
  sceneAA.add(cubeAA);

  const containerAA = antialiasCanvas.value.parentElement;
  const sizesAA = { width: containerAA.clientWidth, height: containerAA.clientHeight };

  const cameraAA = new THREE.PerspectiveCamera(75, sizesAA.width / sizesAA.height, 0.1, 100);
  cameraAA.position.z = 2;
  sceneAA.add(cameraAA);

  const rendererAA = new THREE.WebGLRenderer({ canvas: antialiasCanvas.value, antialias: true });
  rendererAA.setSize(sizesAA.width, sizesAA.height);
  rendererAA.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderers.push(rendererAA);

  scenes.push({ scene: sceneAA, camera: cameraAA, renderer: rendererAA, cube: cubeAA, sizes: sizesAA, container: containerAA });

  // ===== SCENE 3: Alpha (transparent background) =====
  const sceneAlpha = createScene(null); // No background
  const cubeAlpha = createCube();
  sceneAlpha.add(cubeAlpha);

  const containerAlpha = alphaCanvas.value.parentElement;
  const sizesAlpha = { width: containerAlpha.clientWidth, height: containerAlpha.clientHeight };

  const cameraAlpha = new THREE.PerspectiveCamera(75, sizesAlpha.width / sizesAlpha.height, 0.1, 100);
  cameraAlpha.position.z = 2;
  sceneAlpha.add(cameraAlpha);

  const rendererAlpha = new THREE.WebGLRenderer({ canvas: alphaCanvas.value, alpha: true, antialias: true });
  rendererAlpha.setSize(sizesAlpha.width, sizesAlpha.height);
  rendererAlpha.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  rendererAlpha.setClearColor(0x000000, 0);
  renderers.push(rendererAlpha);

  scenes.push({ scene: sceneAlpha, camera: cameraAlpha, renderer: rendererAlpha, cube: cubeAlpha, sizes: sizesAlpha, container: containerAlpha });

  // ===== SCENE 4: Tone Mapping Demo =====
  const sceneTM = new THREE.Scene();
  sceneTM.background = new THREE.Color(0x111111);

  // Use MeshStandardMaterial to show tone mapping effects
  const sphereGeom = new THREE.SphereGeometry(0.8, 32, 32);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.1
  });
  const sphere = new THREE.Mesh(sphereGeom, sphereMat);
  sceneTM.add(sphere);

  // Add bright lights to show HDR effect
  const pointLight1 = new THREE.PointLight(0xff6600, 50, 10);
  pointLight1.position.set(2, 1, 2);
  sceneTM.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x0066ff, 50, 10);
  pointLight2.position.set(-2, -1, 2);
  sceneTM.add(pointLight2);

  const ambientTM = new THREE.AmbientLight(0xffffff, 0.2);
  sceneTM.add(ambientTM);

  const containerTM = toneMappingCanvas.value.parentElement;
  const sizesTM = { width: containerTM.clientWidth, height: containerTM.clientHeight };

  const cameraTM = new THREE.PerspectiveCamera(75, sizesTM.width / sizesTM.height, 0.1, 100);
  cameraTM.position.z = 2.5;
  sceneTM.add(cameraTM);

  const rendererTM = new THREE.WebGLRenderer({ canvas: toneMappingCanvas.value, antialias: true });
  rendererTM.setSize(sizesTM.width, sizesTM.height);
  rendererTM.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  rendererTM.toneMapping = THREE.ACESFilmicToneMapping;
  rendererTM.toneMappingExposure = 1.0;
  renderers.push(rendererTM);

  scenes.push({ scene: sceneTM, camera: cameraTM, renderer: rendererTM, cube: sphere, sizes: sizesTM, container: containerTM });

  // Resize handler
  const handleResize = () => {
    scenes.forEach(({ camera, renderer, sizes, container }) => {
      sizes.width = container.clientWidth;
      sizes.height = container.clientHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });
  };

  window.addEventListener('resize', handleResize);

  // Animation Loop
  const tick = () => {
    scenes.forEach(({ scene, camera, renderer, cube }) => {
      cube.rotation.y += 0.01;
      cube.rotation.x += 0.005;
      renderer.render(scene, camera);
    });

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
  title: 'The Renderer in Three.js'
})

useSeoMeta({
  title: 'The Renderer in Three.js',
  ogTitle: 'The Renderer in Three.js',
  description: 'Learn how the WebGLRenderer works and its key options like antialiasing, transparency, and tone mapping.',
  ogDescription: 'Learn how the WebGLRenderer works and its key options like antialiasing, transparency, and tone mapping.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/foundational-threejs/the-renderer',
  twitterTitle: 'The Renderer in Three.js',
  twitterDescription: 'Learn how the WebGLRenderer works and its key options like antialiasing, transparency, and tone mapping.',
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

  &.half {
    height: 300px;
  }

  &.transparent-demo {
    background: linear-gradient(45deg, #e74c3c, #9b59b6, #3498db, #1abc9c);
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
    
    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 120px;
      text-align: center;
      line-height: .85;
      font-weight: bold;
      height: 400px;
      color: white;
    }

    canvas {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }
  }

  .label {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1;
  }
}

.scene-row {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;

  .scene-container {
    flex: 1;
    margin: 0;
  }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
