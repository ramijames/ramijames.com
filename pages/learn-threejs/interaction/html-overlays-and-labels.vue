<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="HTML Overlays and Labels" tagline="Sometimes the best interaction isn't in 3D" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Why HTML in a 3D scene?</h2>

          <p>Three.js renders to a <code>&lt;canvas&gt;</code>. Everything inside it, from text or icons to tooltips, is pixels. You can't select canvas text, you can't style it with CSS, and screen readers can't see it. For many UI needs (labels, health bars, tooltips, debug info), plain HTML is better. The challenge is making that HTML follow a point in 3D space as the camera moves.</p>

          <p>There are two approaches. You can use Three.js's built-in <code>CSS2DRenderer</code> and <code>CSS3DRenderer</code>, which manage DOM elements for you. Or you can do the math yourself with <code>Vector3.project()</code> and position elements manually. Each are useful in different situations, so let's try taking a look at all of them one by one.</p>

          <h2>CSS2DRenderer</h2>

          <p><code>CSS2DRenderer</code> creates a transparent DOM layer on top of your WebGL canvas. You wrap any HTML element in a <code>CSS2DObject</code>, add it to a 3D object in your scene, and the renderer keeps the HTML positioned correctly as the camera moves. The HTML always faces the screen, meaning that it doesn't rotate with the object. This is what you want for labels, tooltips, and HUD-style elements.</p>

          <p>The labels below follow the rotating shapes. Try to notice how they always face you regardless of the shape's orientation:</p>

          <ClientOnly>
          <div class="scene-container" ref="css2dContainer">
            <canvas ref="css2dCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// Create the CSS2D renderer, sized to match your WebGL renderer
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// Create an HTML label
const div = document.createElement('div');
div.textContent = 'Cube';
div.style.color = 'white';
div.style.fontSize = '14px';
div.style.padding = '4px 8px';
div.style.background = 'rgba(0, 0, 0, 0.6)';
div.style.borderRadius = '4px';

// Wrap it in a CSS2DObject and attach to a mesh
const label = new CSS2DObject(div);
label.position.set(0, 1, 0); // offset above the mesh
cube.add(label);

// In your animation loop, render both
function animate() {
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(animate);
}`" />

          <p>A few things to notice:</p>

          <ul>
            <li>The label renderer's DOM element must be positioned <strong>absolute</strong> and layered on top of the canvas. It's a transparent overlay.</li>
            <li>Set <code>pointerEvents = 'none'</code> on the overlay so clicks pass through to the canvas (or to specific elements if you want clickable labels).</li>
            <li>The label is added as a <strong>child of the mesh</strong>, so its position is relative to the mesh. <code>(0, 1, 0)</code> means one unit above the mesh's origin.</li>
            <li>You must call <code>labelRenderer.render()</code> every frame alongside your WebGL render call.</li>
          </ul>

          <h3>Styling labels with CSS</h3>

          <p>Because these are real DOM elements, you can style them however you want. CSS classes, transitions, hover effects, even Vue or React components. Anything that works in HTML works here!</p>

          <CodeBlock lang="typescript" :code="`const div = document.createElement('div');
div.className = 'scene-label-3d';
div.innerHTML = '<strong>Iron Ore</strong><br><span>Tier 2 Resource</span>';

// In your CSS:
// .scene-label-3d {
//   font-family: sans-serif;
//   color: white;
//   background: rgba(0, 0, 0, 0.7);
//   padding: 6px 10px;
//   border-radius: 6px;
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   backdrop-filter: blur(4px);
//   transition: opacity 0.2s;
// }`" />

          <h2>CSS3DRenderer</h2>

          <p>While CSS2DRenderer keeps labels facing the screen, <code>CSS3DRenderer</code> transforms HTML elements to match 3D orientation. The elements rotate, scale with perspective, and can be occluded (with some effort). Think of it as embedding a webpage into your 3D scene. It's just like a monitor screen or a billboard that exists as a physical object in the world.</p>

          <p>The panels below are HTML elements positioned in 3D space using CSS3DRenderer. Unlike CSS2DRenderer labels, they scale with perspective and exist as surfaces in the scene:</p>

          <ClientOnly>
          <div class="scene-container" ref="css3dContainer">
            <canvas ref="css3dCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

const css3dRenderer = new CSS3DRenderer();
css3dRenderer.setSize(window.innerWidth, window.innerHeight);
css3dRenderer.domElement.style.position = 'absolute';
css3dRenderer.domElement.style.top = '0';
document.body.appendChild(css3dRenderer.domElement);

// Create an HTML element that will exist in 3D space
const panel = document.createElement('div');
panel.style.width = '200px';
panel.style.height = '120px';
panel.style.background = 'rgba(0, 40, 80, 0.9)';
panel.style.color = 'white';
panel.style.padding = '16px';
panel.style.borderRadius = '8px';
panel.style.fontSize = '14px';
panel.innerHTML = '<h3>Status Panel</h3><p>Health: 100%</p>';

// Wrap in CSS3DObject, which gives it a 3D transform
const panelObject = new CSS3DObject(panel);
panelObject.position.set(0, 1.5, 0);
panelObject.scale.set(0.01, 0.01, 0.01); // scale down to scene units
scene.add(panelObject);`" />

          <p>The <code>scale</code> is important. CSS3DObject maps pixel dimensions to world units. A 200px-wide div would be 200 units wide in your scene without scaling. Setting the scale to <code>0.01</code> makes it 2 units wide, which is a reasonable size relative to typical meshes.</p>

          <h2>Manual positioning</h2>

          <p>Sometimes you don't want the overhead of CSS2DRenderer, or you need more control over when and how labels appear. The manual approach uses <code>Vector3.project()</code> to convert a 3D world position into 2D screen coordinates, then positions a regular DOM element at those coordinates.</p>

          <p>In the demo below, each object has a label that's positioned using manual projection. The labels show the object's live world-space coordinates:</p>

          <ClientOnly>
          <div class="scene-container" ref="projContainer">
            <canvas ref="projCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`function worldToScreen(position, camera, canvas) {
  // Clone so we don't mutate the original
  const pos = position.clone();

  // Project from 3D world space to NDC (-1 to +1)
  pos.project(camera);

  // Convert NDC to pixel coordinates
  const rect = canvas.getBoundingClientRect();
  const x = (pos.x * 0.5 + 0.5) * rect.width;
  const y = (-pos.y * 0.5 + 0.5) * rect.height;

  // pos.z tells you if the point is behind the camera
  const isBehindCamera = pos.z > 1;

  return { x, y, isBehindCamera };
}

// In your animation loop:
function animate() {
  renderer.render(scene, camera);

  const screen = worldToScreen(mesh.position, camera, renderer.domElement);
  if (screen.isBehindCamera) {
    label.style.display = 'none';
  } else {
    label.style.display = 'block';
    label.style.left = screen.x + 'px';
    label.style.top = screen.y + 'px';
  }

  requestAnimationFrame(animate);
}`" />

          <p>The projection math works in two steps. First, <code>Vector3.project(camera)</code> transforms the world position into <strong>normalized device coordinates</strong> (NDC), where the visible area is -1 to +1 on both axes. Then you convert NDC to pixel coordinates relative to the canvas.</p>

          <p>The <code>z</code> component after projection tells you whether the point is in front of or behind the camera. If it's greater than 1, the point is behind the camera and you should hide the label. Without this check, labels would appear mirrored on the opposite side of the screen when objects go behind the camera.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/interaction/drag-drop-and-transform"
    prevText="Drag, Drop, and Transform"
    nextLink="/learn-threejs/interaction/"
    nextText=""
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const css2dCanvas = ref(null);
const css2dContainer = ref(null);
const projCanvas = ref(null);
const projContainer = ref(null);
const css3dCanvas = ref(null);
const css3dContainer = ref(null);

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!css2dCanvas.value || !projCanvas.value || !css3dCanvas.value) return;

  const animations = [];
  const cleanupFns = [];

  const createScene = (bgColor = 0x1a1a2e) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    return scene;
  };

  const createRendererPair = (canvas) => {
    const container = canvas.parentElement;
    const sizes = { width: container.clientWidth, height: container.clientHeight };

    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderers.push(renderer);

    return { camera, renderer, container, sizes };
  };

  const addLights = (scene) => {
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(3, 4, 5);
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0x404040, 0.8));
  };

  // ===== SCENE 1: CSS2DRenderer Labels =====
  const scene1 = createScene(0x1a1a2e);
  addLights(scene1);

  const labelShapes = [
    { geom: new THREE.BoxGeometry(0.8, 0.8, 0.8), color: 0x4488ff, x: -2.5, name: 'Cube' },
    { geom: new THREE.SphereGeometry(0.5, 32, 32), color: 0xff4466, x: -0.8, name: 'Sphere' },
    { geom: new THREE.ConeGeometry(0.5, 1, 32), color: 0x44cc88, x: 0.8, name: 'Cone' },
    { geom: new THREE.TorusGeometry(0.4, 0.18, 16, 32), color: 0xffaa22, x: 2.5, name: 'Torus' },
  ];

  const meshes1 = [];

  labelShapes.forEach(({ geom, color, x, name }) => {
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, 0, 0);
    scene1.add(mesh);
    meshes1.push(mesh);

    const div = document.createElement('div');
    div.textContent = name;
    div.className = 'label-2d';
    const label = new CSS2DObject(div);
    label.position.set(0, 0.9, 0);
    mesh.add(label);
  });

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(css2dCanvas.value);
  cam1.position.set(0, 2, 5);
  cam1.lookAt(0, 0, 0);

  const labelRenderer1 = new CSS2DRenderer();
  labelRenderer1.setSize(sz1.width, sz1.height);
  labelRenderer1.domElement.style.position = 'absolute';
  labelRenderer1.domElement.style.top = '0';
  labelRenderer1.domElement.style.left = '0';
  labelRenderer1.domElement.style.pointerEvents = 'none';
  css2dContainer.value.appendChild(labelRenderer1.domElement);

  animations.push(() => {
    meshes1.forEach((m, i) => {
      m.rotation.y += 0.01 + i * 0.003;
      m.rotation.x += 0.005;
    });
    ren1.render(scene1, cam1);
    labelRenderer1.render(scene1, cam1);
  });

  cleanupFns.push(() => {
    labelRenderer1.domElement.remove();
  });

  // ===== SCENE 2: Manual Screen-Space Projection =====
  const scene2 = createScene(0x16213e);
  addLights(scene2);

  const projShapes = [
    { geom: new THREE.IcosahedronGeometry(0.5, 0), color: 0xff6644, x: -2, y: 0.5 },
    { geom: new THREE.OctahedronGeometry(0.5, 0), color: 0x44bbff, x: 0, y: -0.3 },
    { geom: new THREE.TorusKnotGeometry(0.35, 0.12, 64, 16), color: 0x88ff44, x: 2, y: 0.2 },
  ];

  const meshes2 = [];
  const projLabels = [];

  projShapes.forEach(({ geom, color, x, y }) => {
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, y, 0);
    scene2.add(mesh);
    meshes2.push(mesh);

    const div = document.createElement('div');
    div.className = 'label-projected';
    projContainer.value.appendChild(div);
    projLabels.push(div);
  });

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(projCanvas.value);
  cam2.position.set(0, 1.5, 5);
  cam2.lookAt(0, 0, 0);

  function worldToScreen(position, camera) {
    const pos = position.clone();
    pos.project(camera);
    const canvasRect = ren2.domElement.getBoundingClientRect();
    const x = (pos.x * 0.5 + 0.5) * canvasRect.width;
    const y = (-pos.y * 0.5 + 0.5) * canvasRect.height;
    const isBehindCamera = pos.z > 1;
    return { x, y, isBehindCamera };
  }

  animations.push(() => {
    meshes2.forEach((m, i) => {
      m.rotation.y += 0.012 + i * 0.004;
      m.position.y += Math.sin(performance.now() * 0.001 + i * 2) * 0.003;
    });
    ren2.render(scene2, cam2);

    meshes2.forEach((mesh, i) => {
      const labelPos = mesh.position.clone();
      labelPos.y += 0.8;
      const screen = worldToScreen(labelPos, cam2);
      const label = projLabels[i];
      if (screen.isBehindCamera) {
        label.style.display = 'none';
      } else {
        label.style.display = 'block';
        label.style.left = screen.x + 'px';
        label.style.top = screen.y + 'px';
      }
      label.textContent = `(${mesh.position.x.toFixed(1)}, ${mesh.position.y.toFixed(1)}, ${mesh.position.z.toFixed(1)})`;
    });
  });

  cleanupFns.push(() => {
    projLabels.forEach(l => l.remove());
  });

  // ===== SCENE 3: CSS3DRenderer =====
  const con3 = css3dContainer.value;
  const sz3 = { width: con3.clientWidth, height: con3.clientHeight };

  // Remove overflow:hidden, it clips CSS 3D perspective-transformed elements
  con3.style.overflow = 'visible';

  const scene3 = new THREE.Scene();
  // No scene.background, canvas must be transparent so CSS3D layer shows through
  addLights(scene3);

  const cssScene = new THREE.Scene();

  const cam3 = new THREE.PerspectiveCamera(50, sz3.width / sz3.height, 0.1, 100);
  cam3.position.set(0, 0.5, 5);
  cam3.lookAt(0, 0, 0);

  // CSS3DRenderer goes behind, insert before the canvas
  const css3dRenderer = new CSS3DRenderer();
  css3dRenderer.setSize(sz3.width, sz3.height);
  css3dRenderer.domElement.style.position = 'absolute';
  css3dRenderer.domElement.style.top = '0';
  css3dRenderer.domElement.style.left = '0';
  css3dRenderer.domElement.style.background = '#1e3a5f';
  con3.insertBefore(css3dRenderer.domElement, css3dCanvas.value);

  // WebGL canvas on top, transparent so CSS3D shows through
  const ren3 = new THREE.WebGLRenderer({ canvas: css3dCanvas.value, antialias: true, alpha: true });
  ren3.setSize(sz3.width, sz3.height);
  ren3.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  ren3.setClearColor(0x000000, 0);
  renderers.push(ren3);

  css3dCanvas.value.style.position = 'absolute';
  css3dCanvas.value.style.top = '0';
  css3dCanvas.value.style.left = '0';
  css3dCanvas.value.style.zIndex = '1';
  css3dCanvas.value.style.pointerEvents = 'none';

  // Three static panels at fixed positions
  const panelData = [
    { x: -2, color: '#4466cc', title: 'System A', value: '98.2%' },
    { x: 0, color: '#44aa66', title: 'System B', value: '74.1%' },
    { x: 2, color: '#cc6644', title: 'System C', value: '31.7%' },
  ];

  const meshes3 = [];
  const cssObjects3 = [];

  panelData.forEach(({ x, color, title, value }, i) => {
    // Small sphere anchor in WebGL scene
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 16, 16),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(color) })
    );
    mesh.position.set(x, -0.6, 0);
    mesh.userData.baseX = x;
    scene3.add(mesh);
    meshes3.push(mesh);

    // CSS3D panel
    const panel = document.createElement('div');
    panel.className = 'panel-3d';
    panel.style.borderColor = color;
    panel.innerHTML = `<div class="panel-title">${title}</div><div class="panel-value">${value}</div>`;

    const cssObj = new CSS3DObject(panel);
    cssObj.position.set(x, 0.5, 0);
    cssObj.scale.set(0.01, 0.01, 0.01);
    cssScene.add(cssObj);
    cssObjects3.push(cssObj);
  });

  animations.push(() => {
    const t = performance.now() * 0.001;
    meshes3.forEach((m, i) => {
      const z = Math.sin(t + i * 1.5) * 1.5;
      m.position.z = z;
      cssObjects3[i].position.z = z;
    });
    ren3.render(scene3, cam3);
    css3dRenderer.render(cssScene, cam3);
  });

  cleanupFns.push(() => {
    css3dRenderer.domElement.remove();
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1, extra: labelRenderer1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 },
    { container: con3, camera: cam3, renderer: ren3, sizes: sz3, extra: css3dRenderer },
  ];

  const handleResize = () => {
    allScenes.forEach(({ container, camera, renderer, sizes, extra }) => {
      sizes.width = container.clientWidth;
      sizes.height = container.clientHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      if (extra) extra.setSize(sizes.width, sizes.height);
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
    cleanupFns.forEach(fn => fn());
  });
});

useHead({
  title: 'HTML Overlays and Labels in Three.js'
})

useSeoMeta({
  title: 'HTML Overlays and Labels in Three.js',
  ogTitle: 'HTML Overlays and Labels in Three.js',
  description: 'Learn how to attach HTML elements to 3D objects in Three.js using CSS2DRenderer, CSS3DRenderer, and manual screen-space projection.',
  ogDescription: 'Learn how to attach HTML elements to 3D objects in Three.js using CSS2DRenderer, CSS3DRenderer, and manual screen-space projection.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/interaction/html-overlays-and-labels',
  twitterTitle: 'HTML Overlays and Labels in Three.js',
  twitterDescription: 'Learn how to attach HTML elements to 3D objects in Three.js using CSS2DRenderer, CSS3DRenderer, and manual screen-space projection.',
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

<style>
/* Unscoped so CSS2DRenderer/CSS3DRenderer elements can use them */
.label-2d {
  color: #fff;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13px;
  padding: 3px 8px;
  background: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  white-space: nowrap;
  user-select: none;
}

.label-projected {
  position: absolute;
  color: #fff;
  font-family: monospace;
  font-size: 12px;
  padding: 3px 8px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  white-space: nowrap;
  pointer-events: none;
  transform: translate(-50%, -100%);
  user-select: none;
}

.panel-3d {
  width: 180px;
  padding: 14px;
  background: rgba(10, 20, 40, 0.92);
  border: 2px solid;
  color: #fff;
  font-family: system-ui, -apple-system, sans-serif;
  user-select: none;
}

.panel-3d .panel-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
}

.panel-3d .panel-status {
  font-size: 12px;
  opacity: 0.7;
  margin-bottom: 4px;
}

.panel-3d .panel-value {
  font-size: 22px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
</style>
