<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Using GLTFLoader" tagline="Loading 3D models into your scene and working with what comes out" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Loading your first model</h2>

          <p>Loading a 3D model into Three.js follows a consistent pattern: create a loader, point it at a file, and handle the result in a callback. The <code>GLTFLoader</code> is the loader you'll use most often, since glTF/GLB is the standard format for web 3D.</p>

          <CodeBlock lang="typescript" :code="`import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load(
  '/models/my-model.glb',

  // onLoad: called when the model is fully loaded
  (gltf) => {
    scene.add(gltf.scene);
  },

  // onProgress: called during loading (optional)
  (progress) => {
    const percent = (progress.loaded / progress.total) * 100;
    console.log(percent.toFixed(0) + '% loaded');
  },

  // onError: called if something goes wrong (optional)
  (error) => {
    console.error('Failed to load model:', error);
  }
);`" />

          <p>The <code>load</code> method takes a URL and up to three callbacks: success, progress, and error. The success callback receives a <code>gltf</code> object containing everything the file held: the scene graph, animations, cameras, and metadata.</p>

          <h2>An async alternative</h2>

          <p>If you prefer <code>async/await</code> over callbacks, <code>GLTFLoader</code> provides a <code>loadAsync</code> method. This is cleaner when you need to load multiple assets in sequence or when your loading logic lives inside an async function.</p>

          <CodeBlock lang="typescript" :code="`const loader = new GLTFLoader();

async function loadModel() {
  try {
    const gltf = await loader.loadAsync('/models/my-model.glb');
    scene.add(gltf.scene);
  } catch (error) {
    console.error('Failed to load model:', error);
  }
}

// Loading multiple models in parallel
async function loadAllModels() {
  const [robot, tree, building] = await Promise.all([
    loader.loadAsync('/models/robot.glb'),
    loader.loadAsync('/models/tree.glb'),
    loader.loadAsync('/models/building.glb')
  ]);

  scene.add(robot.scene);
  scene.add(tree.scene);
  scene.add(building.scene);
}`" />

          <p>The <code>loadAsync</code> approach loses the progress callback, so use the callback version if you need a loading bar. For everything else, <code>loadAsync</code> is simpler to read and reason about.</p>

          <h2>Loading with Draco compression</h2>

          <p>If your glTF file was compressed with Draco, the standard <code>GLTFLoader</code> won't decode it on its own. You need to attach a <code>DRACOLoader</code> that provides the decoder. The decoder files ship with Three.js and need to be served as static assets.</p>

          <CodeBlock lang="typescript" :code="`import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Set up the Draco decoder
const dracoLoader = new DRACOLoader();

// Point to the directory containing the decoder files:
// draco_decoder.js, draco_decoder.wasm, draco_wasm_wrapper.js
dracoLoader.setDecoderPath('/draco/');

// Optional: use the JS decoder instead of WASM
// dracoLoader.setDecoderConfig({ type: 'js' });

// Attach to GLTFLoader
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

// Now load compressed models normally
loader.load('/models/compressed.glb', (gltf) => {
  scene.add(gltf.scene);
});

// When you're done loading all models, free the decoder
// dracoLoader.dispose();`" />

          <p>The Draco decoder files are found in the Three.js package at <code>node_modules/three/examples/jsm/libs/draco/</code>. Copy that directory to your public/static folder so the loader can fetch them at runtime. In a Vite or Nuxt project, place them in the <code>public/draco/</code> directory.</p>

          <h2>Loading progress</h2>

          <p>When loading large models or multiple assets, you'll want a loading screen. The <code>THREE.LoadingManager</code> tracks the progress of all loaders attached to it and fires callbacks as items load.</p>

          <CodeBlock lang="typescript" :code="`const manager = new THREE.LoadingManager();

manager.onStart = (url, loaded, total) => {
  console.log('Started loading:', url);
  console.log(loaded + ' of ' + total + ' items loaded');
};

manager.onProgress = (url, loaded, total) => {
  const percent = (loaded / total) * 100;
  // Update your loading bar here
  document.querySelector('.progress-bar').style.width =
    percent + '%';
};

manager.onLoad = () => {
  // Everything is loaded, so hide loading screen
  document.querySelector('.loading-screen').style.display =
    'none';
};

manager.onError = (url) => {
  console.error('Failed to load:', url);
};

// Pass the manager to your loaders
const gltfLoader = new GLTFLoader(manager);
const textureLoader = new THREE.TextureLoader(manager);

// All loads through these loaders are tracked by the manager
gltfLoader.load('/models/scene.glb', (gltf) => {
  scene.add(gltf.scene);
});

textureLoader.load('/textures/ground.jpg', (texture) => {
  // use texture
});`" />

          <p>The loading manager counts items, not bytes. If you load one 50MB model and five 1KB textures, the progress bar will jump from 0% to ~17% when the first item loads, regardless of file size. For byte-level progress on individual files, use the progress callback on the loader's <code>load</code> method directly.</p>

          <h2>Loading textures separately</h2>

          <p>Not everything comes bundled in a glTF file. Sometimes you need to load textures independently, for a custom terrain, a skybox, or to apply a texture to procedural geometry. The <code>TextureLoader</code> handles standard image formats (PNG, JPG, WebP).</p>

          <CodeBlock lang="typescript" :code="`const textureLoader = new THREE.TextureLoader();

// Basic texture load
const colorMap = textureLoader.load('/textures/brick_color.jpg');
const normalMap = textureLoader.load('/textures/brick_normal.jpg');
const roughnessMap = textureLoader.load('/textures/brick_roughness.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
  roughnessMap: roughnessMap
});

// Set texture properties
colorMap.colorSpace = THREE.SRGBColorSpace;  // color textures need this
colorMap.wrapS = THREE.RepeatWrapping;
colorMap.wrapT = THREE.RepeatWrapping;
colorMap.repeat.set(4, 4);  // tile 4x in each direction

// Normal and roughness maps stay in linear space (the default)
// Don't set SRGBColorSpace on non-color data maps`" />

          <p>A frequent mistake people make is forgetting to set <code>colorSpace = THREE.SRGBColorSpace</code> on color textures (diffuse/albedo maps). Without it, colors appear washed out because Three.js assumes linear color space by default. Data textures like normal maps and roughness maps should stay in linear space.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/assets/asset-standards"
    prevText="Asset Standards"
    nextLink="/learn-threejs/assets/working-with-loaded-models"
    nextText="Working with loaded models"
  />
  <Footer />
</template>

<script setup>

useHead({
  title: 'Using GLTFLoader in Three.js'
})

useSeoMeta({
  title: 'Using GLTFLoader in Three.js',
  ogTitle: 'Using GLTFLoader in Three.js',
  description: 'A practical guide to loading 3D models in Three.js with GLTFLoader covering loading patterns, traversal, materials, animations, Draco compression, and common problems.',
  ogDescription: 'A practical guide to loading 3D models in Three.js with GLTFLoader covering loading patterns, traversal, materials, animations, Draco compression, and common problems.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/assets/loading-assets',
  twitterTitle: 'Using GLTFLoader in Three.js',
  twitterDescription: 'A practical guide to loading 3D models in Three.js with GLTFLoader covering loading patterns, traversal, materials, animations, Draco compression, and common problems.',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>
