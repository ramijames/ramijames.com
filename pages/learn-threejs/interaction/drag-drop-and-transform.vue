<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Drag, Drop, and Transform" tagline="Moving objects around in 3D space with the mouse" />

      <main class="w-content page-top">
        <section class="content">

          <h2>From clicking to dragging</h2>

          <p>Clicking tells you <em>what</em> was hit. Dragging tells you <em>where to move it</em>. The challenge is that a mouse moves in 2D (across the screen) while your objects live in 3D. You need a surface to project onto. Without one, the object could move anywhere along the ray, which isn't useful.</p>

          <p>The standard approach is to project onto an invisible <strong>drag plane</strong>. When the user presses down on an object, you create a plane at the object's depth (perpendicular to the camera), then on each mousemove you intersect the ray with that plane to get the new world position.</p>

          <h3>The drag lifecycle</h3>

          <p>A drag interaction has three phases:</p>

          <ol>
            <li><strong>pointerdown</strong>: Raycast to find the object under the cursor. If one is hit, store it as the dragged object and create a drag plane at its position.</li>
            <li><strong>pointermove</strong>: While dragging, raycast against the drag plane (not the scene objects) to get the current world position. Move the object to match.</li>
            <li><strong>pointerup</strong>: Release the object. Clear the drag state.</li>
          </ol>

          <h3>Basic drag on a plane</h3>

          <p>The simplest version drags objects along a horizontal ground plane (the XZ plane at y=0). Click and drag the shapes below:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="dragCanvas"></canvas>
            <div class="scene-label">{{ dragLabel }}</div>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const intersection = new THREE.Vector3();

let draggedObject = null;
let dragOffset = new THREE.Vector3();

canvas.addEventListener('pointerdown', (event) => {
  updateMouse(event);
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(draggableObjects);

  if (hits.length > 0) {
    draggedObject = hits[0].object;

    // Calculate offset so the object doesn't jump to the cursor
    raycaster.ray.intersectPlane(dragPlane, intersection);
    dragOffset.copy(intersection).sub(draggedObject.position);

    canvas.style.cursor = 'grabbing';
  }
});

canvas.addEventListener('pointermove', (event) => {
  if (!draggedObject) return;

  updateMouse(event);
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(dragPlane, intersection);

  draggedObject.position.copy(intersection.sub(dragOffset));
});

canvas.addEventListener('pointerup', () => {
  draggedObject = null;
  canvas.style.cursor = 'default';
});`" />

          <p>The key detail here is the <strong>drag offset</strong>. Without it, the object snaps so its center is directly under the cursor the moment you start dragging. The offset preserves the distance between where you clicked and the object's origin, so the drag feels natural.</p>

          <p>Also notice that during the drag we raycast against the <code>dragPlane</code>, not the scene objects. This is faster and more reliable. If you raycast against the object itself while moving it, you can lose the intersection when the mouse moves faster than the object can follow.</p>

          <h3>Dragging at the object's depth</h3>

          <p>The ground plane approach works for top-down or strategy-game-style views. But what if your objects are floating in space and you want to drag them parallel to the camera? You create the drag plane dynamically when the drag starts, positioned at the object and facing the camera:</p>

          <CodeBlock lang="typescript" :code="`canvas.addEventListener('pointerdown', (event) => {
  updateMouse(event);
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(draggableObjects);

  if (hits.length > 0) {
    draggedObject = hits[0].object;

    // Create a plane at the object's position, facing the camera
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    dragPlane.setFromNormalAndCoplanarPoint(
      cameraDirection,
      draggedObject.position
    );

    raycaster.ray.intersectPlane(dragPlane, intersection);
    dragOffset.copy(intersection).sub(draggedObject.position);
  }
});`" />

          <p>This creates a plane that's always perpendicular to the camera's view direction, passing through the object. The object slides along this plane as you drag, maintaining its apparent depth in the scene.</p>

          <h2>Constrained dragging</h2>

          <p>Unconstrained dragging lets objects go anywhere, which is sometimes exactly what you want. But often you need to restrict movement: to a single axis, to a grid, or within a boundary. Try dragging the objects below. The red one is locked to the X axis, the green to Z, and the blue snaps to a grid:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="constrainedCanvas"></canvas>
            <div class="scene-label">{{ constrainedLabel }}</div>
          </div>
          </ClientOnly>

          <h3>Axis locking</h3>

          <p>To lock movement to a single axis, take the full intersection point and only apply the component you care about:</p>

          <CodeBlock lang="typescript" :code="`// Lock to X axis only
draggedObject.position.x = intersection.x - dragOffset.x;
// Y and Z stay at their original values

// Lock to Z axis only
draggedObject.position.z = intersection.z - dragOffset.z;

// Lock to XZ plane (free horizontal movement, no vertical)
draggedObject.position.x = intersection.x - dragOffset.x;
draggedObject.position.z = intersection.z - dragOffset.z;`" />

          <h3>Grid snapping</h3>

          <p>To snap to a grid, round the position to the nearest grid unit after calculating the drag position:</p>

          <CodeBlock lang="typescript" :code="`const gridSize = 1.0;

function snapToGrid(value, size) {
  return Math.round(value / size) * size;
}

// After calculating the new position:
draggedObject.position.x = snapToGrid(intersection.x - dragOffset.x, gridSize);
draggedObject.position.z = snapToGrid(intersection.z - dragOffset.z, gridSize);`" />

          <p>You can combine grid snapping with axis locking. A chess game would lock to the XZ plane with a grid size matching the tile spacing. A side-scrolling level editor might lock to X with vertical grid snapping.</p>

          <h3>Boundary clamping</h3>

          <p>To keep objects within bounds, clamp the position after calculating it:</p>

          <CodeBlock lang="typescript" :code="`const bounds = { minX: -4, maxX: 4, minZ: -4, maxZ: 4 };

draggedObject.position.x = THREE.MathUtils.clamp(
  intersection.x - dragOffset.x,
  bounds.minX, bounds.maxX
);
draggedObject.position.z = THREE.MathUtils.clamp(
  intersection.z - dragOffset.z,
  bounds.minZ, bounds.maxZ
);`" />

          <h2>Drop zones</h2>

          <p>A drop zone is a region where releasing a dragged object triggers some action: placing an item in an inventory slot, positioning a piece on a game board, or snapping a component into a socket. In the scene below, drag the shapes into the glowing target zones:</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="dropCanvas"></canvas>
            <div class="scene-label">{{ dropLabel }}</div>
          </div>
          </ClientOnly>

          <CodeBlock lang="typescript" :code="`const dropZones = []; // Array of { mesh, position, radius }

canvas.addEventListener('pointerup', () => {
  if (!draggedObject) return;

  // Check if the object is inside any drop zone
  for (const zone of dropZones) {
    const distance = draggedObject.position.distanceTo(zone.position);
    if (distance < zone.radius) {
      // Snap to the zone's center
      draggedObject.position.copy(zone.position);
      draggedObject.position.y = draggedObject.position.y; // keep height
      onDrop(draggedObject, zone);
      break;
    }
  }

  draggedObject = null;
  canvas.style.cursor = 'default';
});

function onDrop(object, zone) {
  // Handle the drop: update state, play animation, etc.
  console.log(object.name, 'dropped in zone', zone.mesh.name);
}`" />

          <p>The distance check is the simplest approach. For rectangular zones, you'd check whether the position falls within a bounding box instead. For complex shapes, you could use the zone mesh's bounding geometry.</p>

          <h2>TransformControls</h2>

          <p>Three.js ships with <code>TransformControls</code>, a built-in gizmo that provides translate, rotate, and scale handles. It's the same kind of widget you'd see in Blender or Unity's editor. You don't need to implement dragging yourself. Instead, you attach the controls to an object and it handles the interaction.</p>

          <CodeBlock lang="typescript" :code="`import { TransformControls } from 'three/addons/controls/TransformControls.js';

const controls = new TransformControls(camera, renderer.domElement);
controls.attach(selectedObject);
scene.add(controls);

// Switch between modes
controls.setMode('translate'); // move
controls.setMode('rotate');    // rotate
controls.setMode('scale');     // scale

// Listen for changes
controls.addEventListener('change', () => {
  renderer.render(scene, camera);
});

// Disable OrbitControls while dragging the gizmo
controls.addEventListener('dragging-changed', (event) => {
  orbitControls.enabled = !event.value;
});`" />

          <p>The <code>dragging-changed</code> event is important if you're using <code>OrbitControls</code>. Without it, dragging the transform gizmo would also rotate the camera, which isn't the behavior you want.</p>

          <p><code>TransformControls</code> is ideal for editor-style tools, level builders, or debug interfaces where you need precise manipulation of objects. For game-like drag interactions (inventory systems, puzzle placement), the manual approach from earlier in this article gives you more control over the feel and constraints.</p>

          <h2>Putting it together</h2>

          <p>The pattern for drag interactions in Three.js is consistent regardless of complexity:</p>

          <ol>
            <li>On <code>pointerdown</code>: raycast to pick the object, create a drag plane, calculate the offset</li>
            <li>On <code>pointermove</code>: raycast against the drag plane, apply constraints, update position</li>
            <li>On <code>pointerup</code>: check for drop zones, finalize placement, clear state</li>
          </ol>

          <p>Everything else is variation on this structure. Axis locking, grid snapping, boundary clamping, drop zone detection. These are all modifications to step 2 or 3. The core mechanic stays the same.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/interaction/interaction-managers-and-libraries"
    prevText="Interaction Managers and Libraries"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const dragCanvas = ref(null);
const constrainedCanvas = ref(null);
const dropCanvas = ref(null);

const dragLabel = ref('Click and drag the shapes');
const constrainedLabel = ref('Red: X-axis only, Green: Z-axis only, Blue: grid snap');
const dropLabel = ref('Drag shapes into the glowing zones');

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!dragCanvas.value || !constrainedCanvas.value || !dropCanvas.value) return;

  const animations = [];

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
    dir.position.set(3, 6, 5);
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0x404040, 0.8));
  };

  const updateMouse = (event, renderer, mouse) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  // ===== SCENE 1: Free Drag on Ground Plane =====
  const scene1 = createScene(0x1a1a2e);
  addLights(scene1);

  // Ground grid
  const gridHelper = new THREE.GridHelper(10, 10, 0x333355, 0x222244);
  scene1.add(gridHelper);

  const draggable1 = [];
  const dragShapes = [
    { geom: new THREE.BoxGeometry(0.8, 0.8, 0.8), color: 0x4488ff, x: -2, z: 0 },
    { geom: new THREE.SphereGeometry(0.5, 32, 32), color: 0xff4466, x: 0, z: -1 },
    { geom: new THREE.ConeGeometry(0.5, 1, 32), color: 0x44cc88, x: 2, z: 1 },
    { geom: new THREE.TorusGeometry(0.4, 0.18, 16, 32), color: 0xffaa22, x: -1, z: 2 },
  ];

  dragShapes.forEach(({ geom, color, x, z }) => {
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, 0.5, z);
    scene1.add(mesh);
    draggable1.push(mesh);
  });

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(dragCanvas.value);
  cam1.position.set(0, 6, 6);
  cam1.lookAt(0, 0, 0);

  const raycaster1 = new THREE.Raycaster();
  const mouse1 = new THREE.Vector2();
  const dragPlane1 = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.5);
  const intersection1 = new THREE.Vector3();
  const dragOffset1 = new THREE.Vector3();
  let dragged1 = null;

  dragCanvas.value.addEventListener('pointerdown', (event) => {
    updateMouse(event, ren1, mouse1);
    raycaster1.setFromCamera(mouse1, cam1);
    const hits = raycaster1.intersectObjects(draggable1);

    if (hits.length > 0) {
      dragged1 = hits[0].object;
      raycaster1.ray.intersectPlane(dragPlane1, intersection1);
      dragOffset1.copy(intersection1).sub(dragged1.position);
      dragCanvas.value.style.cursor = 'grabbing';
      dragged1.material.emissive.setHex(0x222222);
      dragLabel.value = `Dragging...`;
    }
  });

  dragCanvas.value.addEventListener('pointermove', (event) => {
    if (!dragged1) {
      // Hover detection
      updateMouse(event, ren1, mouse1);
      raycaster1.setFromCamera(mouse1, cam1);
      const hits = raycaster1.intersectObjects(draggable1);
      dragCanvas.value.style.cursor = hits.length > 0 ? 'grab' : 'default';
      return;
    }

    updateMouse(event, ren1, mouse1);
    raycaster1.setFromCamera(mouse1, cam1);
    raycaster1.ray.intersectPlane(dragPlane1, intersection1);

    dragged1.position.x = intersection1.x - dragOffset1.x;
    dragged1.position.z = intersection1.z - dragOffset1.z;
    dragLabel.value = `Position: (${dragged1.position.x.toFixed(1)}, ${dragged1.position.z.toFixed(1)})`;
  });

  dragCanvas.value.addEventListener('pointerup', () => {
    if (dragged1) {
      dragged1.material.emissive.setHex(0x000000);
      dragged1 = null;
      dragCanvas.value.style.cursor = 'default';
      dragLabel.value = 'Click and drag the shapes';
    }
  });

  dragCanvas.value.addEventListener('pointerleave', () => {
    if (dragged1) {
      dragged1.material.emissive.setHex(0x000000);
      dragged1 = null;
      dragCanvas.value.style.cursor = 'default';
      dragLabel.value = 'Click and drag the shapes';
    }
  });

  animations.push(() => {
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: Constrained Dragging =====
  const scene2 = createScene(0x16213e);
  addLights(scene2);

  const gridHelper2 = new THREE.GridHelper(10, 10, 0x334455, 0x223344);
  scene2.add(gridHelper2);

  // X-axis rail (visual guide)
  const xRailGeom = new THREE.BoxGeometry(8, 0.02, 0.1);
  const xRailMat = new THREE.MeshBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.4 });
  const xRail = new THREE.Mesh(xRailGeom, xRailMat);
  xRail.position.set(0, 0.01, -1.5);
  scene2.add(xRail);

  // Z-axis rail
  const zRailGeom = new THREE.BoxGeometry(0.1, 0.02, 8);
  const zRailMat = new THREE.MeshBasicMaterial({ color: 0x44cc44, transparent: true, opacity: 0.4 });
  const zRail = new THREE.Mesh(zRailGeom, zRailMat);
  zRail.position.set(-1.5, 0.01, 0);
  scene2.add(zRail);

  // Grid dots for snap area
  for (let x = -3; x <= 3; x++) {
    for (let z = -3; z <= 3; z++) {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.3 })
      );
      dot.position.set(x + 2, 0.01, z);
      scene2.add(dot);
    }
  }

  const constrained = [];

  // Red: X-locked
  const redMat = new THREE.MeshStandardMaterial({ color: 0xff4444 });
  const redMesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), redMat);
  redMesh.position.set(0, 0.5, -1.5);
  redMesh.userData.constraint = 'x';
  redMesh.userData.originZ = -1.5;
  scene2.add(redMesh);
  constrained.push(redMesh);

  // Green: Z-locked
  const greenMat = new THREE.MeshStandardMaterial({ color: 0x44cc44 });
  const greenMesh = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.9, 32), greenMat);
  greenMesh.position.set(-1.5, 0.5, 0);
  greenMesh.userData.constraint = 'z';
  greenMesh.userData.originX = -1.5;
  scene2.add(greenMesh);
  constrained.push(greenMesh);

  // Blue: grid snap
  const blueMat = new THREE.MeshStandardMaterial({ color: 0x4488ff });
  const blueMesh = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32), blueMat);
  blueMesh.position.set(2, 0.5, 0);
  blueMesh.userData.constraint = 'grid';
  scene2.add(blueMesh);
  constrained.push(blueMesh);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(constrainedCanvas.value);
  cam2.position.set(0, 7, 6);
  cam2.lookAt(0, 0, 0);

  const raycaster2 = new THREE.Raycaster();
  const mouse2 = new THREE.Vector2();
  const dragPlane2 = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.5);
  const intersection2 = new THREE.Vector3();
  const dragOffset2 = new THREE.Vector3();
  let dragged2 = null;

  constrainedCanvas.value.addEventListener('pointerdown', (event) => {
    updateMouse(event, ren2, mouse2);
    raycaster2.setFromCamera(mouse2, cam2);
    const hits = raycaster2.intersectObjects(constrained);

    if (hits.length > 0) {
      dragged2 = hits[0].object;
      raycaster2.ray.intersectPlane(dragPlane2, intersection2);
      dragOffset2.copy(intersection2).sub(dragged2.position);
      constrainedCanvas.value.style.cursor = 'grabbing';
      dragged2.material.emissive.setHex(0x222222);
    }
  });

  constrainedCanvas.value.addEventListener('pointermove', (event) => {
    if (!dragged2) {
      updateMouse(event, ren2, mouse2);
      raycaster2.setFromCamera(mouse2, cam2);
      const hits = raycaster2.intersectObjects(constrained);
      constrainedCanvas.value.style.cursor = hits.length > 0 ? 'grab' : 'default';
      return;
    }

    updateMouse(event, ren2, mouse2);
    raycaster2.setFromCamera(mouse2, cam2);
    raycaster2.ray.intersectPlane(dragPlane2, intersection2);

    const newX = intersection2.x - dragOffset2.x;
    const newZ = intersection2.z - dragOffset2.z;

    const c = dragged2.userData.constraint;
    if (c === 'x') {
      dragged2.position.x = THREE.MathUtils.clamp(newX, -4, 4);
    } else if (c === 'z') {
      dragged2.position.z = THREE.MathUtils.clamp(newZ, -4, 4);
    } else if (c === 'grid') {
      dragged2.position.x = Math.round(newX);
      dragged2.position.z = Math.round(newZ);
    }

    constrainedLabel.value = `Position: (${dragged2.position.x.toFixed(1)}, ${dragged2.position.z.toFixed(1)})`;
  });

  constrainedCanvas.value.addEventListener('pointerup', () => {
    if (dragged2) {
      dragged2.material.emissive.setHex(0x000000);
      dragged2 = null;
      constrainedCanvas.value.style.cursor = 'default';
      constrainedLabel.value = 'Red: X-axis only, Green: Z-axis only, Blue: grid snap';
    }
  });

  constrainedCanvas.value.addEventListener('pointerleave', () => {
    if (dragged2) {
      dragged2.material.emissive.setHex(0x000000);
      dragged2 = null;
      constrainedCanvas.value.style.cursor = 'default';
      constrainedLabel.value = 'Red: X-axis only, Green: Z-axis only, Blue: grid snap';
    }
  });

  animations.push(() => {
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: Drop Zones =====
  const scene3 = createScene(0x1e3a5f);
  addLights(scene3);

  const gridHelper3 = new THREE.GridHelper(10, 10, 0x334466, 0x223355);
  scene3.add(gridHelper3);

  // Create drop zones
  const dropZones = [];
  const zonePositions = [
    { x: -2.5, z: -2.5, color: 0xff4466 },
    { x: 0, z: -2.5, color: 0x44cc88 },
    { x: 2.5, z: -2.5, color: 0xffaa22 },
  ];

  zonePositions.forEach(({ x, z, color }) => {
    // Zone ring
    const ringGeom = new THREE.TorusGeometry(0.7, 0.05, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, 0.05, z);
    scene3.add(ring);

    // Zone glow (flat disc)
    const discGeom = new THREE.CircleGeometry(0.7, 32);
    const discMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
    const disc = new THREE.Mesh(discGeom, discMat);
    disc.rotation.x = -Math.PI / 2;
    disc.position.set(x, 0.02, z);
    scene3.add(disc);

    dropZones.push({
      position: new THREE.Vector3(x, 0.5, z),
      radius: 0.8,
      ring,
      disc,
      color,
      occupied: false
    });
  });

  // Draggable objects
  const draggable3 = [];
  const dropShapes = [
    { geom: new THREE.BoxGeometry(0.6, 0.6, 0.6), color: 0xff4466, x: -2.5, z: 2 },
    { geom: new THREE.ConeGeometry(0.4, 0.8, 32), color: 0x44cc88, x: 0, z: 2 },
    { geom: new THREE.OctahedronGeometry(0.4), color: 0xffaa22, x: 2.5, z: 2 },
  ];

  dropShapes.forEach(({ geom, color, x, z }) => {
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, 0.5, z);
    mesh.userData.homePosition = new THREE.Vector3(x, 0.5, z);
    scene3.add(mesh);
    draggable3.push(mesh);
  });

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(dropCanvas.value);
  cam3.position.set(0, 6, 6);
  cam3.lookAt(0, 0, 0);

  const raycaster3 = new THREE.Raycaster();
  const mouse3 = new THREE.Vector2();
  const dragPlane3 = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.5);
  const intersection3 = new THREE.Vector3();
  const dragOffset3 = new THREE.Vector3();
  let dragged3 = null;
  let matchedZones = 0;

  dropCanvas.value.addEventListener('pointerdown', (event) => {
    updateMouse(event, ren3, mouse3);
    raycaster3.setFromCamera(mouse3, cam3);
    const hits = raycaster3.intersectObjects(draggable3);

    if (hits.length > 0) {
      dragged3 = hits[0].object;
      raycaster3.ray.intersectPlane(dragPlane3, intersection3);
      dragOffset3.copy(intersection3).sub(dragged3.position);
      dropCanvas.value.style.cursor = 'grabbing';
      dragged3.material.emissive.setHex(0x222222);
      dropLabel.value = 'Dragging...';
    }
  });

  dropCanvas.value.addEventListener('pointermove', (event) => {
    if (!dragged3) {
      updateMouse(event, ren3, mouse3);
      raycaster3.setFromCamera(mouse3, cam3);
      const hits = raycaster3.intersectObjects(draggable3);
      dropCanvas.value.style.cursor = hits.length > 0 ? 'grab' : 'default';

      // Highlight zones on hover
      dropZones.forEach((zone) => {
        zone.disc.material.opacity = 0.15;
      });
      return;
    }

    updateMouse(event, ren3, mouse3);
    raycaster3.setFromCamera(mouse3, cam3);
    raycaster3.ray.intersectPlane(dragPlane3, intersection3);

    dragged3.position.x = intersection3.x - dragOffset3.x;
    dragged3.position.z = intersection3.z - dragOffset3.z;

    // Highlight nearby drop zone
    dropZones.forEach((zone) => {
      const dist = new THREE.Vector2(
        dragged3.position.x - zone.position.x,
        dragged3.position.z - zone.position.z
      ).length();
      zone.disc.material.opacity = dist < zone.radius ? 0.4 : 0.15;
    });
  });

  dropCanvas.value.addEventListener('pointerup', () => {
    if (!dragged3) return;

    let dropped = false;
    for (const zone of dropZones) {
      const dist = new THREE.Vector2(
        dragged3.position.x - zone.position.x,
        dragged3.position.z - zone.position.z
      ).length();

      if (dist < zone.radius) {
        // Check if colors match
        const objColor = dragged3.material.color.getHex();
        if (objColor === zone.color) {
          dragged3.position.copy(zone.position);
          zone.occupied = true;
          dropped = true;
          matchedZones++;
          if (matchedZones >= 3) {
            dropLabel.value = 'All matched! Nice work.';
          } else {
            dropLabel.value = `Matched! ${matchedZones}/3 placed`;
          }
        } else {
          // Wrong zone, bounce back
          dragged3.position.copy(dragged3.userData.homePosition);
          dropLabel.value = 'Wrong zone! Match the colors.';
        }
        break;
      }
    }

    if (!dropped) {
      // Didn't land in any zone
      const wasInZone = dragged3.position.distanceTo(dragged3.userData.homePosition) > 0.1;
      if (wasInZone || true) {
        // Let it stay where it is (free placement)
      }
      if (matchedZones === 0) {
        dropLabel.value = 'Drag shapes into the matching colored zones';
      }
    }

    dragged3.material.emissive.setHex(0x000000);
    dropZones.forEach((zone) => {
      zone.disc.material.opacity = 0.15;
    });
    dragged3 = null;
    dropCanvas.value.style.cursor = 'default';
  });

  dropCanvas.value.addEventListener('pointerleave', () => {
    if (dragged3) {
      dragged3.material.emissive.setHex(0x000000);
      dragged3 = null;
      dropCanvas.value.style.cursor = 'default';
      dropZones.forEach((zone) => {
        zone.disc.material.opacity = 0.15;
      });
    }
  });

  animations.push(() => {
    // Pulse the zone rings
    const t = performance.now() * 0.002;
    dropZones.forEach((zone, i) => {
      if (!zone.occupied) {
        zone.ring.material.opacity = 0.4 + Math.sin(t + i) * 0.2;
      } else {
        zone.ring.material.opacity = 0.9;
      }
    });
    ren3.render(scene3, cam3);
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 },
    { container: con3, camera: cam3, renderer: ren3, sizes: sz3 },
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
  const clock = new THREE.Clock();
  const tick = () => {
    const delta = clock.getDelta();
    animations.forEach(fn => fn(delta));
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
  title: 'Drag, Drop, and Transform in Three.js'
})

useSeoMeta({
  title: 'Drag, Drop, and Transform in Three.js',
  ogTitle: 'Drag, Drop, and Transform in Three.js',
  description: 'Learn how to implement drag and drop, axis-locked movement, grid snapping, drop zones, and TransformControls in Three.js.',
  ogDescription: 'Learn how to implement drag and drop, axis-locked movement, grid snapping, drop zones, and TransformControls in Three.js.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/interaction/drag-drop-and-transform',
  twitterTitle: 'Drag, Drop, and Transform in Three.js',
  twitterDescription: 'Learn how to implement drag and drop, axis-locked movement, grid snapping, drop zones, and TransformControls in Three.js.',
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

.scene-label {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-family: monospace;
  pointer-events: none;
}
</style>
