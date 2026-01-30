<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Transparency in Shadows" tagline="Why Three.js shadows ignore opacity, and how alphaTest fixes it" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Shadows are colorless and opaque by default</h2>

          <p>If you've worked through the previous article on shadow types, you know that Three.js shadows are generated from depth maps. The shadow camera renders the scene from the light's perspective and records <strong>how far away</strong> each surface is. That's it. No color, no opacity, no material properties. Just depth.</p>

          <p>This means that by default, a red translucent sphere casts the exact same shadow as a white opaque sphere. The shadow system doesn't know or care that your object is transparent. It sees geometry, records depth, and produces a binary result: shadowed or not shadowed.</p>

          <p>This is the single biggest "gotcha" people hit when working with shadows in Three.js. You set <code>opacity: 0.3</code> on a material, expect a faint shadow, and get a pitch-black silhouette instead. Let's see it in action.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="opacityGotchaCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows two spheres. The left sphere is fully opaque. The right sphere has <code>opacity: 0.3</code> and <code>transparent: true</code>. Notice that both cast identical, fully opaque shadows. The shadow system completely ignores the material's transparency settings.</p>

          <CodeBlock lang="typescript" :code="`// This is the gotcha: opacity does NOT affect shadows
const transparentMat = new THREE.MeshStandardMaterial({
  color: 0xff4444,
  transparent: true,
  opacity: 0.3
});

const sphere = new THREE.Mesh(sphereGeom, transparentMat);
sphere.castShadow = true;

// The shadow will be fully opaque, as if opacity were 1.0.
// The shadow map only records depth. It has no concept
// of material transparency.`" />

          <h2>Why this happens: the depth-only pipeline</h2>

          <p>When Three.js renders the shadow map, it doesn't use your material's fragment shader. Instead, it uses a special <strong>depth material</strong> that writes only the distance from the light to each fragment. The standard depth material has no knowledge of your material's <code>opacity</code>, <code>alphaMap</code>, or <code>color</code>.</p>

          <p>This is a deliberate design choice. Shadow map rendering needs to be fast because it happens once per light per frame (six times for point lights). Running your full PBR material shader during the shadow pass would be expensive and, for most opaque objects, pointless.</p>

          <p>The consequence is that you need to explicitly tell Three.js how to handle transparency during the shadow pass. The simplest way to do this is with <code>alphaTest</code>.</p>

          <h2>alphaTest for hard cutouts</h2>

          <p>When you set an <code>alphaTest</code> threshold on your material, Three.js will discard fragments below that threshold during <strong>both</strong> the main render and the shadow pass. This works because the built-in depth material does respect <code>alphaTest</code> and <code>alphaMap</code>.</p>

          <p>The limitation is that <code>alphaTest</code> is binary. A fragment is either fully visible or fully discarded. You don't get soft, semi-transparent shadows. But for things like leaves, fences, decals, and masked shapes, it works well.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="alphaTestCanvas"></canvas>
          </div>
          </ClientOnly>

          <p>The demo above shows two planes with the same checkerboard alpha pattern. The left plane has no <code>alphaTest</code>, so it casts a solid rectangular shadow. The right plane has <code>alphaTest: 0.5</code>, and its shadow correctly shows the cutout pattern. The depth material picks up the alpha test and discards the transparent fragments during the shadow pass.</p>

          <CodeBlock lang="typescript" :code="`// Create an alpha map (e.g., a checkerboard pattern)
const alphaTexture = createCheckerboardTexture();

// WITHOUT alphaTest. Casts solid rectangular shadow
const solidShadowMat = new THREE.MeshStandardMaterial({
  color: 0x44aa88,
  alphaMap: alphaTexture,
  transparent: true,
  side: THREE.DoubleSide
});

// WITH alphaTest. Shadow respects the alpha cutout
const cutoutShadowMat = new THREE.MeshStandardMaterial({
  color: 0x44aa88,
  alphaMap: alphaTexture,
  transparent: true,
  alphaTest: 0.5,
  side: THREE.DoubleSide
});

// alphaTest: 0.5 means any fragment with alpha < 0.5
// is discarded entirely. This applies to both the
// visual render AND the shadow map render.`" />

          <p><code>alphaTest</code> is the right tool when you have a texture with clear opaque and transparent regions. For more nuanced control over the shadow pass, or when <code>alphaTest</code> alone isn't enough, you'll need custom depth materials, which we cover in the next article.</p>

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/lighting/types-of-shadows"
    prevText="Types of Shadows"
    nextLink="/learn-threejs/lighting/custom-shadow-materials"
    nextText="Custom Shadow Materials"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const opacityGotchaCanvas = ref(null);
const alphaTestCanvas = ref(null);

let renderers = [];
let animationId = null;

const createCheckerboardTexture = (size = 256, squares = 8) => {
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
  if (!opacityGotchaCanvas.value || !alphaTestCanvas.value) return;

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

  const sphereGeom = new THREE.SphereGeometry(1.0, 64, 64);
  const floorGeom = new THREE.PlaneGeometry(30, 30);
  const smallPlaneGeom = new THREE.PlaneGeometry(3, 3);

  const standardMat = (color = 0xcccccc, roughness = 0.5, metalness = 0.1) => {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
  };

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

  // ===== SCENE 1: Opacity Gotcha =====
  const scene1 = createScene();

  const opaqueSphere = new THREE.Mesh(sphereGeom, standardMat(0xdd6644));
  opaqueSphere.position.set(-2, 0, 0);
  opaqueSphere.castShadow = true;
  scene1.add(opaqueSphere);

  const transparentSphere = new THREE.Mesh(sphereGeom, new THREE.MeshStandardMaterial({
    color: 0xff4444,
    transparent: true,
    opacity: 0.3,
    roughness: 0.3,
    metalness: 0.0
  }));
  transparentSphere.position.set(2, 0, 0);
  transparentSphere.castShadow = true;
  scene1.add(transparentSphere);

  addFloor(scene1);
  addShadowDirLight(scene1);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(opacityGotchaCanvas.value);
  cam1.position.set(0, 4, 8);
  cam1.lookAt(0, -0.5, 0);

  let t1 = 0;
  animations.push(() => {
    t1 += 0.008;
    opaqueSphere.position.y = Math.sin(t1) * 0.5 + 0.3;
    transparentSphere.position.y = Math.sin(t1 + Math.PI) * 0.5 + 0.3;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: alphaTest Fix =====
  const scene2 = createScene();

  const checkerTex = createCheckerboardTexture();

  const noAlphaTestMat = new THREE.MeshStandardMaterial({
    color: 0x44aa88,
    alphaMap: checkerTex,
    transparent: true,
    side: THREE.DoubleSide
  });
  const noAlphaPlane = new THREE.Mesh(smallPlaneGeom, noAlphaTestMat);
  noAlphaPlane.position.set(-2.5, 1, 0);
  noAlphaPlane.rotation.x = -Math.PI / 6;
  noAlphaPlane.castShadow = true;
  scene2.add(noAlphaPlane);

  const alphaTestMat = new THREE.MeshStandardMaterial({
    color: 0x44aa88,
    alphaMap: checkerTex,
    transparent: true,
    alphaTest: 0.5,
    side: THREE.DoubleSide
  });
  const alphaTestPlane = new THREE.Mesh(smallPlaneGeom, alphaTestMat);
  alphaTestPlane.position.set(2.5, 1, 0);
  alphaTestPlane.rotation.x = -Math.PI / 6;
  alphaTestPlane.castShadow = true;
  scene2.add(alphaTestPlane);

  addFloor(scene2);
  addShadowDirLight(scene2);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(alphaTestCanvas.value);
  cam2.position.set(0, 4, 8);
  cam2.lookAt(0, -0.5, 0);

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

definePageMeta({
  layout: 'learnthreejs'
})

useHead({
  title: 'Transparency in Shadows in Three.js'
})

useSeoMeta({
  title: 'Transparency in Shadows in Three.js',
  ogTitle: 'Transparency in Shadows in Three.js',
  description: 'Learn why Three.js shadows ignore material opacity and how to fix it with alphaTest for transparent shadow cutouts.',
  ogDescription: 'Learn why Three.js shadows ignore material opacity and how to fix it with alphaTest for transparent shadow cutouts.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/lighting/transparency-in-shadows',
  twitterTitle: 'Transparency in Shadows in Three.js',
  twitterDescription: 'Learn why Three.js shadows ignore material opacity and how to fix it with alphaTest for transparent shadow cutouts.',
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
