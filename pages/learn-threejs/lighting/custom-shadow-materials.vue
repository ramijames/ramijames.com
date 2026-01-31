<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Custom Shadow Materials" tagline="Using customDepthMaterial and customDistanceMaterial for fine-grained shadow control" />

      <main class="w-content page-top">
        <section class="content">

          <h2>When alphaTest isn't enough</h2>

          <p>In the previous article, we saw how <code>alphaTest</code> on a standard material lets the shadow pass discard transparent fragments. That works well for simple cases, but sometimes the built-in depth material doesn't pick up your alpha map correctly, or you need different shadow behavior than what the visual material provides.</p>

          <p>For these cases, Three.js lets you assign a <strong>custom depth material</strong> to any mesh. This material is used <em>only</em> during the shadow map render pass. Your visual material stays the same. You're telling Three.js: "when you render this object's shadow, use this material instead of the default depth material."</p>

          <h2>customDepthMaterial</h2>

          <p>You can assign a <code>customDepthMaterial</code> to your mesh to replace the default depth material that Three.js uses during the shadow pass for <strong>directional lights and spot lights</strong>. You create a <code>MeshDepthMaterial</code>, give it the same alpha map and alpha test, and assign it to the mesh.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="customDepthCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows two planes with a radial gradient alpha map. The left plane uses the default depth material, and its shadow is a solid rectangle. The right plane has a <code>customDepthMaterial</code> configured with the same alpha map and <code>alphaTest</code>, producing a circular shadow that matches the visible shape of the plane.</p>

          <CodeBlock lang="typescript" :code="`// Create a radial gradient alpha texture
const alphaTexture = createRadialGradientTexture();

// The visual material
const material = new THREE.MeshStandardMaterial({
  color: 0x6688cc,
  alphaMap: alphaTexture,
  transparent: true,
  alphaTest: 0.5,
  side: THREE.DoubleSide
});

// Custom depth material for the shadow pass
const customDepth = new THREE.MeshDepthMaterial({
  depthPacking: THREE.RGBADepthPacking,
  alphaMap: alphaTexture,
  alphaTest: 0.5
});

const plane = new THREE.Mesh(planeGeom, material);
plane.castShadow = true;
plane.customDepthMaterial = customDepth;`" />

          <p>The key detail is <code>depthPacking: THREE.RGBADepthPacking</code>. Three.js shadow maps encode depth across the RGBA channels for precision. If you omit this, the shadow will render but the depth values will be wrong, producing artifacts or missing shadows entirely.</p>

          <h2>Point lights need customDistanceMaterial</h2>

          <p>Here's a gotcha that catches people: <code>customDepthMaterial</code> only works for <strong>directional lights and spot lights</strong>. Point lights use a completely different shadow rendering pipeline based on cube maps, and they need <code>customDistanceMaterial</code> instead.</p>

          <p>If you set <code>customDepthMaterial</code> on a mesh but your shadows come from a point light, the custom material will be silently ignored. No warning, no error. Your shadows will just look wrong and you'll spend an hour wondering why. Ask me how I know!</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="distanceMatCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows a point light casting shadows through two planes with a checkerboard alpha map. The left plane only has <code>customDepthMaterial</code> set, so the point light ignores it and casts a solid shadow. The right plane has <code>customDistanceMaterial</code> set, and its shadow correctly shows the cutout pattern.</p>

          <CodeBlock lang="typescript" :code="`// For DirectionalLight and SpotLight shadows:
mesh.customDepthMaterial = new THREE.MeshDepthMaterial({
  depthPacking: THREE.RGBADepthPacking,
  alphaMap: alphaTexture,
  alphaTest: 0.5
});

// For PointLight shadows:
mesh.customDistanceMaterial = new THREE.MeshDistanceMaterial({
  alphaMap: alphaTexture,
  alphaTest: 0.5
});

// If your scene uses BOTH directional/spot AND point lights
// with shadows, you need to set BOTH properties.
// Missing one will cause incorrect shadows from that
// light type with zero warnings.`" />

          <h2>When to use custom shadow materials</h2>

          <p>In many cases, simply setting <code>alphaTest</code> on the visual material is enough. The built-in depth material will inherit the alpha test and alpha map automatically. You need custom shadow materials when:</p>

          <ul>
            <li><strong>The automatic inheritance doesn't work.</strong> Some material configurations or custom shader materials don't propagate their alpha settings to the shadow pass.</li>
            <li><strong>You want different shadow behavior than the visual material.</strong> For example, a material that appears fully opaque visually but casts a patterned shadow (like a gobo light effect).</li>
            <li><strong>You're using point lights.</strong> The <code>customDistanceMaterial</code> is the only way to get alpha-tested shadows from point lights with custom alpha maps.</li>
            <li><strong>You're using ShaderMaterial or RawShaderMaterial.</strong> Custom shader materials don't automatically generate depth/distance variants. You must provide them manually.</li>
          </ul>

          <p>The next article covers the other side of the shadow limitation: color. Shadow maps can't carry color information, but there are practical workarounds for producing colored and baked shadows.</p>

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/lighting/transparency-in-shadows"
    prevText="Transparency in Shadows"
    nextLink=""
    nextText=""
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const customDepthCanvas = ref(null);
const distanceMatCanvas = ref(null);

let renderers = [];
let animationId = null;

const createRadialGradientTexture = (size = 256) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.6, '#aaaaaa');
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
};

const createCheckerboardTexture = (size = 256, squares = 6) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const sq = size / squares;
  for (let y = 0; y < squares; y++) {
    for (let x = 0; x < squares; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? '#ffffff' : '#000000';
      ctx.fillRect(x * sq, y * sq, sq, sq);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
};

onMounted(async () => {
  await nextTick();
  if (!customDepthCanvas.value || !distanceMatCanvas.value) return;

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

  const floorGeom = new THREE.PlaneGeometry(30, 30);
  const smallPlaneGeom = new THREE.PlaneGeometry(3, 3);

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

  // ===== SCENE 1: customDepthMaterial =====
  const scene1 = createScene();

  const radialTex = createRadialGradientTexture();

  // Left: no customDepthMaterial, solid shadow
  const noCustomMat = new THREE.MeshStandardMaterial({
    color: 0x6688cc,
    alphaMap: radialTex,
    transparent: true,
    side: THREE.DoubleSide
  });
  const noCustomPlane = new THREE.Mesh(smallPlaneGeom, noCustomMat);
  noCustomPlane.position.set(-2.5, 1.5, 0);
  noCustomPlane.rotation.x = -Math.PI / 4;
  noCustomPlane.castShadow = true;
  scene1.add(noCustomPlane);

  // Right: customDepthMaterial, circular cutout shadow
  const customMat = new THREE.MeshStandardMaterial({
    color: 0x6688cc,
    alphaMap: radialTex,
    transparent: true,
    alphaTest: 0.5,
    side: THREE.DoubleSide
  });
  const customDepthMat = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking,
    alphaMap: radialTex,
    alphaTest: 0.5
  });
  const customPlane = new THREE.Mesh(smallPlaneGeom, customMat);
  customPlane.position.set(2.5, 1.5, 0);
  customPlane.rotation.x = -Math.PI / 4;
  customPlane.castShadow = true;
  customPlane.customDepthMaterial = customDepthMat;
  scene1.add(customPlane);

  addFloor(scene1);
  addShadowDirLight(scene1);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(customDepthCanvas.value);
  cam1.position.set(0, 4, 8);
  cam1.lookAt(0, -0.5, 0);

  animations.push(() => {
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: customDistanceMaterial (PointLight) =====
  const scene2 = createScene();

  const checkerTex = createCheckerboardTexture();

  // Add back wall for point light shadows
  const wallGeom = new THREE.PlaneGeometry(20, 10);
  const backWall = new THREE.Mesh(wallGeom, floorMat());
  backWall.position.set(0, 3, -4);
  backWall.receiveShadow = true;
  scene2.add(backWall);

  addFloor(scene2);

  // Left: only customDepthMaterial, point light ignores it
  // No alphaTest on the visual material so the shadow pipeline
  // won't inherit it, only the customDepthMaterial carries it,
  // and point lights ignore customDepthMaterial entirely.
  const depthOnlyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    alphaMap: checkerTex,
    transparent: true,
    side: THREE.DoubleSide
  });
  const depthOnlyPlane = new THREE.Mesh(smallPlaneGeom, depthOnlyMat);
  depthOnlyPlane.position.set(-2.5, 1.5, 0);
  depthOnlyPlane.rotation.x = -Math.PI / 6;
  depthOnlyPlane.castShadow = true;
  depthOnlyPlane.customDepthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking,
    alphaMap: checkerTex,
    alphaTest: 0.5
  });
  scene2.add(depthOnlyPlane);

  // Right: customDistanceMaterial, point light respects it
  const distanceMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    alphaMap: checkerTex,
    transparent: true,
    alphaTest: 0.5,
    side: THREE.DoubleSide
  });
  const distancePlane = new THREE.Mesh(smallPlaneGeom, distanceMat);
  distancePlane.position.set(2.5, 1.5, 0);
  distancePlane.rotation.x = -Math.PI / 6;
  distancePlane.castShadow = true;
  distancePlane.customDistanceMaterial = new THREE.MeshDistanceMaterial({
    alphaMap: checkerTex,
    alphaTest: 0.5
  });
  scene2.add(distancePlane);

  // Point light
  const pointLight = new THREE.PointLight(0xff9944, 60.0, 20, 2);
  pointLight.position.set(0, 4, 4);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.set(1024, 1024);
  pointLight.shadow.bias = -0.005;
  pointLight.shadow.camera.near = 0.5;
  pointLight.shadow.camera.far = 20;
  scene2.add(pointLight);

  const ptMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff9944 })
  );
  ptMarker.position.copy(pointLight.position);
  scene2.add(ptMarker);

  scene2.add(new THREE.AmbientLight(0xffffff, 0.45));

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(distanceMatCanvas.value);
  cam2.position.set(0, 3, 9);
  cam2.lookAt(0, 0, 0);

  animations.push(() => {
    ren2.render(scene2, cam2);
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 }
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

  const tick = () => {
    animations.forEach(fn => fn());
    animationId = window.requestAnimationFrame(tick);
  };

  tick();

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (animationId) cancelAnimationFrame(animationId);
    renderers.forEach(r => r.dispose());
  });
});

useHead({
  title: 'Custom Shadow Materials in Three.js'
})

useSeoMeta({
  title: 'Custom Shadow Materials in Three.js',
  ogTitle: 'Custom Shadow Materials in Three.js',
  description: 'Learn how to use customDepthMaterial and customDistanceMaterial in Three.js for fine-grained control over shadow rendering with alpha maps.',
  ogDescription: 'Learn how to use customDepthMaterial and customDistanceMaterial in Three.js for fine-grained control over shadow rendering with alpha maps.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/lighting/custom-shadow-materials',
  twitterTitle: 'Custom Shadow Materials in Three.js',
  twitterDescription: 'Learn how to use customDepthMaterial and customDistanceMaterial in Three.js for fine-grained control over shadow rendering with alpha maps.',
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
