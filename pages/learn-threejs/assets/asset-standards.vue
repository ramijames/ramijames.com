<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Asset Standards" tagline="The file formats you'll encounter when loading 3D models into Three.js" />

      <main class="w-content page-top">
        <section class="content">

          <h2>So many formats!</h2>

          <p>A 3D model is more than just the geometry inside it. Typically, it also includes stuff like materials, textures, animations, skeleton rigs, and metadata. How all of that data is packed into a file depends on the format. Some formats store only raw mesh data. Others carry an entire scene graph with cameras, lights, and animation clips. Choosing the right format determines what survives the trip from your modeling tool into Three.js, and how much work you'll need to do on the other end to get it rendering.</p>

          <p>Three.js ships loaders for over a dozen formats, but in practice you'll work with a handful. We're only going to focus on the most common cases here.</p>

          <h3>glTF and GLB</h3>

          <p><strong>glTF</strong> (GL Transmission Format) is the format Three.js was built to consume. Developed by the Khronos Group (the same organization behind OpenGL and Vulkan), glTF was designed specifically for delivering 3D content to the web and real-time applications.</p>

          <p>glTF comes in two variants:</p>

          <ul>
            <li><strong>.gltf</strong>: A JSON file that references external binary data (<code>.bin</code>) and texture files. Good for debugging since the JSON is human-readable, but means multiple files to manage.</li>
            <li><strong>.glb</strong>: A single binary file that packs everything together: geometry, materials, textures, and animations. This is what you want for production. One file, one request, no missing dependencies.</li>
          </ul>

          <CodeBlock lang="typescript" :code="`import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load('/models/robot.glb', (gltf) => {
  // The loaded scene graph
  scene.add(gltf.scene);

  // Access animations if present
  const mixer = new THREE.AnimationMixer(gltf.scene);
  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });

  // Access individual meshes
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
});`" />

          <p>Inside you'll find meshes, PBR materials (metallic-roughness workflow), textures, skeleton rigs, morph targets, animations, cameras, lights, and scene hierarchy. It maps almost 1:1 onto Three.js's material system.</p>

          <p>When possible, you should always use this format. Every major 3D tool exports to it: Blender, Maya, 3ds Max, Cinema 4D, Substance Painter, and more.</p>

          <h3>Draco and Meshopt compression</h3>

          <p>glTF files can be compressed to dramatically reduce file size. Two compression schemes are commonly used:</p>

          <ul>
            <li><strong>Draco</strong>: Google's mesh compression library. Reduces geometry data (positions, normals, UVs) by 80–90%. The decoder runs in a Web Worker, so it doesn't block the main thread. Three.js supports it via <code>DRACOLoader</code>.</li>
            <li><strong>Meshopt</strong>: Optimizes the vertex buffer layout for GPU efficiency and compresses it. Smaller gains than Draco, but faster to decode and there is no external decoder needed. It's supported via <code>MeshoptDecoder</code>.</li>
          </ul>

          <CodeBlock lang="typescript" :code="`import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');  // path to Draco decoder files

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load('/models/compressed-model.glb', (gltf) => {
  scene.add(gltf.scene);
});`" />

          <h2>OBJ and MTL</h2>

          <p><strong>OBJ</strong> is one of the oldest 3D file formats still in use. It's a plain-text format that stores vertex positions, normals, texture coordinates, and face indices. Its companion file, <strong>MTL</strong>, defines materials with properties like diffuse color, specular highlights, and texture paths.</p>

          <CodeBlock lang="typescript" :code="`import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const mtlLoader = new MTLLoader();
mtlLoader.load('/models/chair.mtl', (materials) => {
  materials.preload();

  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('/models/chair.obj', (object) => {
    scene.add(object);
  });
});`" />

          <p>Inside OBJ and MTL files you'll find just geometry and basic materials. That means no animations, no skeleton rigs, no PBR properties, no scene hierarchy. Materials are limited to the Phong shading model.</p>

          <p>You should really only use OBJ when you're given OBJ files and can't convert them. OBJ is universally exported by every 3D tool, so you'll encounter it when working with older assets or datasets from scientific and CAD sources. For anything new, convert to glTF instead.</p>

          <p>The biggest downside for OBJ/MTL files are that they are text-based, so files are large. There is no support for modern PBR materials and no animations. You'll also have to juggle multiple files (.obj + .mtl + textures) which can be a headache. Vertex colors aren't standardized.</p>

          <h2>FBX</h2>

          <p><strong>FBX</strong> is Autodesk's proprietary format, widely used in the game and film industries for exchanging assets between tools like Maya, 3ds Max, MotionBuilder, and Unity. It supports a rich feature set including skeletal animation, blend shapes, and complex material setups.</p>

          <CodeBlock lang="typescript" :code="`import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const loader = new FBXLoader();
loader.load('/models/character.fbx', (object) => {
  // FBX often comes in at huge scale
  object.scale.setScalar(0.01);

  scene.add(object);

  // Access animations
  const mixer = new THREE.AnimationMixer(object);
  object.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });
});`" />

          <p>FBX format files will include meshes, materials (Phong/Lambert, not PBR), skeleton rigs, morph targets, animations, cameras, lights, and scene hierarchy.</p>

          <p>Still, you should limit use to when you receive assets in that format. FBX is the lingua franca of character animation. However, for web delivery, convert FBX to glTF using Blender or a tool like <a href="https://gltf-transform.dev/">gltf-transform</a>. FBX files are often 5–10x larger than an equivalent glTF, so conversion is necessary for web delivery.</p>

          <p>FBX has a few limitations, including it being a proprietary format. The Three.js FBX loader handles most cases but can struggle with complex rigs or newer FBX features. Materials don't map cleanly to PBR, so you'll often need to reassign materials after loading. Scale is frequently wrong (FBX doesn't enforce units). If you can, convert.</p>

          <h2>USDZ</h2>

          <p><strong>USDZ</strong> is Apple's packaging of Pixar's Universal Scene Description (USD) format. It's a zip archive containing a USD file and its textures. Apple uses USDZ for AR Quick Look on iOS, which means if you want a "view in AR" button on an iPhone, you need a USDZ file.</p>

          <p>USDZ file formats include meshes, PBR materials, textures, and basic animations. It's a read-only, self-contained package.</p>

          <p>You should limit use only for Apple AR Quick Look integration. Three.js has a <code>USDZExporter</code> that can convert a Three.js scene to USDZ on the fly, which is useful for e-commerce "view in your room" features. You generally won't load USDZ <em>into</em> Three.js; you export <em>from</em> Three.js to USDZ for AR.</p>

          <CodeBlock lang="typescript" :code="`import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter.js';

const exporter = new USDZExporter();
const arraybuffer = await exporter.parse(scene);

// Create a download link or AR Quick Look link
const blob = new Blob([arraybuffer], { type: 'model/vnd.usdz+zip' });
const url = URL.createObjectURL(blob);

// On iOS Safari, this triggers AR Quick Look:
const link = document.createElement('a');
link.rel = 'ar';
link.href = url;
link.click();`" />

          <h2>Collada (DAE)</h2>

          <p><strong>Collada</strong> (<code>.dae</code>) is an XML-based format maintained by the Khronos Group. It was designed as an open interchange format before glTF existed. It supports geometry, materials, animations, and physics.</p>

          <p>Collada served its purpose as a bridge format, but glTF has replaced it in nearly every workflow. You might encounter DAE files from older SketchUp exports or legacy archives. If you do, convert to glTF rather than loading directly.</p>

          <p>Collada files are XML, and XML is verbose, making files large and slow to parse. The spec is broad and loosely interpreted, so different exporters produce incompatible files. The Three.js <code>ColladaLoader</code> works but is less maintained than <code>GLTFLoader</code>. If you can, convert to glTF.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/lighting/environment-maps"
    prevText="Environment Maps"
    nextLink="/learn-threejs/assets/loading-assets"
    nextText="Loading Assets"
  />
  <Footer />
</template>

<script setup>

useHead({
  title: 'Asset Standards for Three.js'
})

useSeoMeta({
  title: 'Asset Standards for Three.js',
  ogTitle: 'Asset Standards for Three.js',
  description: 'A guide to 3D file formats for Three.js, including glTF, OBJ, FBX, USDZ, and Collada.',
  ogDescription: 'A guide to 3D file formats for Three.js, including glTF, OBJ, FBX, USDZ, and Collada.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/assets/asset-standards',
  twitterTitle: 'Asset Standards for Three.js',
  twitterDescription: 'A guide to 3D file formats for Three.js, including glTF, OBJ, FBX, USDZ, and Collada.',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>
