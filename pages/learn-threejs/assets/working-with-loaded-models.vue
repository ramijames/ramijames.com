<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Working with loaded models" tagline="After you've loaded your model, here's what you can do" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Working with loaded models</h2>

          <p>Ok, you've got your model loaded. Now what?</p>
          
          <h3>Inside the glTF object</h3>

          <p>The object returned by the loader isn't a mesh. It's a container holding everything the file contained. If you take a peek inside..</p>

          <CodeBlock lang="typescript" :code="`loader.load('/models/character.glb', (gltf) => {
  gltf.scene;       // THREE.Group, the root of the model's scene graph
  gltf.scenes;      // Array, all scenes in the file (usually just one)
  gltf.animations;  // Array of THREE.AnimationClip, all animation data
  gltf.cameras;     // Array of THREE.Camera, cameras defined in the file
  gltf.asset;       // Object, metadata (generator, version, copyright)
});`" />

          <p>In nearly every case, <code>gltf.scene</code> is what you add to your Three.js scene. It's a <code>THREE.Group</code> that contains all the meshes, lights, and hierarchy that the 3D artist set up in their modeling tool. The other properties are there when you need them, but <code>gltf.scene</code> is the entry point.</p>

          <h3>Adjusting materials</h3>

          <p>glTF models arrive with materials already assigned, typically <code>MeshStandardMaterial</code> configured with the PBR properties from the source file. Sometimes you need to tweak them, either because the export wasn't perfect or because your scene's lighting setup needs different settings.</p>

          <CodeBlock lang="typescript" :code="`model.traverse((child) => {
  if (child.isMesh) {
    const mat = child.material;

    // Adjust roughness and metalness
    mat.roughness = 0.4;
    mat.metalness = 0.8;

    // Override the environment map intensity
    mat.envMapIntensity = 1.5;

    // Make a material double-sided (shows both faces)
    mat.side = THREE.DoubleSide;

    // Replace the material entirely
    // child.material = new THREE.MeshStandardMaterial({
    //   color: 0xff0000,
    //   roughness: 0.3
    // });
  }
});`" />

          <p>A common situation you'll probably encounter is that you'll load a model and it looks too dark or too bright. This usually isn't a material problem. It's a lighting or tone mapping mismatch. Before tweaking materials, make sure your renderer has tone mapping enabled and your scene has appropriate lighting or an environment map set.</p>

          <h3>Handling scale and position</h3>

          <p>Models from different sources arrive at different scales. A character modeled in Blender with meters as the unit will be a different size than one modeled in Maya with centimeters. There's no universal fix. You adjust on a per-model basis.</p>

          <CodeBlock lang="typescript" :code="`loader.load('/models/character.glb', (gltf) => {
  const model = gltf.scene;

  // Scale uniformly
  model.scale.setScalar(0.5);

  // Position the model
  model.position.set(0, 0, 0);

  // Center the model on its bounding box
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);  // shift so center is at origin

  // Optionally, place it on the ground plane
  const boxAfter = new THREE.Box3().setFromObject(model);
  model.position.y -= boxAfter.min.y;  // bottom sits at y=0

  scene.add(model);
});`" />

          <p>The bounding box technique is the most reliable way to center and ground a model regardless of how it was authored. Compute the bounding box, shift the model so its center (or bottom) aligns with where you want it.</p>

          <h3>Playing animations</h3>

          <p>glTF files can carry animation clips like walk cycles, idle poses, facial expressions, mechanical movements. Three.js plays these through the <code>AnimationMixer</code> system. The mixer controls playback for a specific object, and each clip becomes an <code>AnimationAction</code> you can play, pause, crossfade, and blend.</p>

          <CodeBlock lang="typescript" :code="`let mixer;

loader.load('/models/character.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  // Create a mixer for this model
  mixer = new THREE.AnimationMixer(model);

  // Play all animations
  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });

  // Or play a specific animation by name
  const idleClip = THREE.AnimationClip.findByName(
    gltf.animations, 'Idle'
  );
  if (idleClip) {
    mixer.clipAction(idleClip).play();
  }
});

// In your animation loop, update the mixer every frame
const clock = new THREE.Clock();

function tick() {
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();`" />

          <p>The critical detail here is that you must call <code>mixer.update(delta)</code> every frame in your animation loop. Without it, the animation won't advance. The <code>delta</code> is the time in seconds since the last frame, which <code>THREE.Clock</code> provides.</p>


          <h3>Dealing with materials after loading</h3>

          <p>glTF models arrive with materials already assigned, typically <code>MeshStandardMaterial</code> configured with the PBR properties from the source file. Sometimes you need to tweak them, either because the export wasn't perfect or because your scene's lighting setup needs different settings.</p>

          <CodeBlock lang="typescript" :code="`model.traverse((child) => {
  if (child.isMesh) {
    const mat = child.material;

    // Adjust roughness and metalness
    mat.roughness = 0.4;
    mat.metalness = 0.8;

    // Override the environment map intensity
    mat.envMapIntensity = 1.5;

    // Make a material double-sided (shows both faces)
    mat.side = THREE.DoubleSide;

    // Replace the material entirely
    // child.material = new THREE.MeshStandardMaterial({
    //   color: 0xff0000,
    //   roughness: 0.3
    // });
  }
});`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/assets/loading-assets"
    prevText="Loading assets"
    nextLink="/learn-threejs/assets/common-loading-errors"
    nextText="Common loading errors"
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
  description: 'A practical guide to loading 3D models in Three.js with GLTFLoader — covering loading patterns, traversal, materials, animations, Draco compression, and common problems.',
  ogDescription: 'A practical guide to loading 3D models in Three.js with GLTFLoader — covering loading patterns, traversal, materials, animations, Draco compression, and common problems.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/assets/loading-assets',
  twitterTitle: 'Using GLTFLoader in Three.js',
  twitterDescription: 'A practical guide to loading 3D models in Three.js with GLTFLoader — covering loading patterns, traversal, materials, animations, Draco compression, and common problems.',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>
