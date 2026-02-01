<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Interaction Managers and Libraries" tagline="Scaling beyond raw raycasters" />

      <main class="w-content page-top">
        <section class="content">

          <h2>When raw raycasting stops scaling</h2>

          <p>The raycaster pattern from the <nuxt-link to="/learn-threejs/interaction/raycasting-and-mouse-events">previous article</nuxt-link> works well for simple scenes. But the moment you have multiple interactive objects, hover states, click handlers, drag behavior, and UI overlays on the same page, the code starts to sprawl. You end up with mouse coordinate conversion duplicated across handlers, hover state tracked in loose variables, and no clear boundary between "the user clicked a 3D object" and "the user clicked a DOM element floating above the canvas."</p>

          <p>This article covers how to manage that complexity: structuring your own interaction manager in raw JS/TS, preventing clicks from leaking through DOM overlays, and the libraries that handle all of this for you in Vue and React.</p>

          <h2>The click-through problem</h2>

          <p>One of the first issues you'll run into is <strong>event propagation between DOM and canvas</strong>. Imagine you have a health bar, an inventory panel, or a settings menu rendered as HTML elements positioned over your Three.js canvas. The user clicks a button in the menu. The browser fires the click event on the button, but if that event also reaches your canvas click handler, you'll simultaneously interact with a 3D object behind the menu.</p>

          <p>This happens because DOM events bubble up through the document. Your canvas listener doesn't know or care that the click originated on a <code>&lt;button&gt;</code> sitting on top of it.</p>

          <h3>Stopping propagation from DOM overlays</h3>

          <p>The simplest fix is to stop pointer events on your overlay elements from reaching the canvas. You have two options depending on your setup:</p>

          <CodeBlock lang="typescript" :code="`// Option 1: CSS, block pointer events on the overlay container
// This prevents the overlay from generating mouse events entirely
.overlay-panel {
  pointer-events: none;  /* pass through to canvas */
}

.overlay-panel button,
.overlay-panel input {
  pointer-events: auto;  /* but interactive elements still work */
}`" />

          <p>This CSS approach is clean and declarative. The overlay container itself is transparent to mouse events, so clicks pass through to the canvas. But specific interactive elements like buttons and inputs opt back in. The downside is that you can't hover over the panel background itself, which may or may not matter for your UI.</p>

          <CodeBlock lang="typescript" :code="`// Option 2: JavaScript, stop propagation on the overlay
const overlay = document.querySelector('.overlay-panel');

overlay.addEventListener('pointerdown', (e) => {
  e.stopPropagation();
});

overlay.addEventListener('click', (e) => {
  e.stopPropagation();
});`" />

          <p>The JavaScript approach gives you more control. You can conditionally decide whether to block propagation based on what was clicked, and the overlay still receives all pointer events normally.</p>

          <h3>Checking event origin in the canvas handler</h3>

          <p>An alternative is to guard your canvas handler itself. Before raycasting, check whether the event actually originated on the canvas:</p>

          <CodeBlock lang="typescript" :code="`canvas.addEventListener('click', (event) => {
  // Only process clicks that originated directly on the canvas
  if (event.target !== canvas) return;

  // Proceed with raycasting...
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactiveObjects);
  // ...
});`" />

          <p>This is the least invasive approach. You don't need to modify your overlay code at all. The canvas handler simply ignores events that didn't start on the canvas element. In practice, combining this guard with the CSS <code>pointer-events</code> approach gives you the most reliable result.</p>

          <h2>Building an interaction manager in raw JS/TS</h2>

          <p>Once your scene has more than a handful of interactive objects, scattering event listeners and hover state across your codebase becomes hard to maintain. A simple interaction manager centralizes the raycasting logic and exposes a clean API for registering objects and callbacks.</p>

          <CodeBlock lang="typescript" :code="`class InteractionManager {
  constructor(camera, renderer) {
    this.camera = camera;
    this.renderer = renderer;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.interactiveObjects = new Map();
    this.hoveredObject = null;

    const canvas = renderer.domElement;
    canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    canvas.addEventListener('click', (e) => this.onClick(e));
  }

  // Register an object with its event handlers
  add(object, handlers = {}) {
    this.interactiveObjects.set(object, handlers);
  }

  remove(object) {
    this.interactiveObjects.delete(object);
  }

  updateMouse(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  raycast() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const objects = Array.from(this.interactiveObjects.keys());
    return this.raycaster.intersectObjects(objects, true);
  }

  onMouseMove(event) {
    if (event.target !== this.renderer.domElement) return;
    this.updateMouse(event);
    const intersects = this.raycast();

    // Handle hover exit
    if (this.hoveredObject) {
      const handlers = this.interactiveObjects.get(this.hoveredObject);
      if (handlers?.onPointerLeave) handlers.onPointerLeave(this.hoveredObject);
      this.hoveredObject = null;
    }

    // Handle hover enter
    if (intersects.length > 0) {
      const hit = intersects[0].object;
      this.hoveredObject = hit;
      const handlers = this.interactiveObjects.get(hit);
      if (handlers?.onPointerEnter) handlers.onPointerEnter(hit, intersects[0]);
    }

    this.renderer.domElement.style.cursor =
      this.hoveredObject ? 'pointer' : 'default';
  }

  onClick(event) {
    if (event.target !== this.renderer.domElement) return;
    this.updateMouse(event);
    const intersects = this.raycast();

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const handlers = this.interactiveObjects.get(hit);
      if (handlers?.onClick) handlers.onClick(hit, intersects[0]);
    }
  }

  dispose() {
    this.interactiveObjects.clear();
  }
}`" />

          <p>Usage is straightforward. You create the manager once, then register objects with their handlers:</p>

          <CodeBlock lang="typescript" :code="`const interactions = new InteractionManager(camera, renderer);

interactions.add(cube, {
  onClick: (object, intersection) => {
    object.material.color.setHex(Math.random() * 0xffffff);
  },
  onPointerEnter: (object) => {
    object.material.emissive.setHex(0x333333);
  },
  onPointerLeave: (object) => {
    object.material.emissive.setHex(0x000000);
  }
});

// Later, when you remove the object from the scene:
interactions.remove(cube);`" />

          <p>This pattern keeps interaction logic co-located with the objects it belongs to, and the manager handles all the coordinate conversion, raycasting, and hover tracking internally. You can extend it with <code>onPointerDown</code>, <code>onPointerUp</code>, and <code>onDrag</code> as your needs grow.</p>

          <h3>Handling nested meshes</h3>

          <p>One subtlety worth addressing: when the raycaster hits a child mesh inside a group, <code>intersects[0].object</code> returns the child, not the parent you registered. If you registered a group, you need to walk up the parent chain to find the registered object:</p>

          <CodeBlock lang="typescript" :code="`findRegisteredParent(object) {
  let current = object;
  while (current) {
    if (this.interactiveObjects.has(current)) return current;
    current = current.parent;
  }
  return null;
}`" />

          <p>Then use <code>this.findRegisteredParent(intersects[0].object)</code> in your hover and click handlers instead of using the hit object directly. This is essential when working with loaded glTF models where you register the root group but the raycaster hits a deeply nested mesh.</p>

          <h2>Interaction in Vue with TresJS</h2>

          <p><strong>TresJS</strong> is the Vue ecosystem's answer to declarative Three.js. If you're building your project with Vue (and since you're reading this on a Nuxt site, there's a reasonable chance you are), TresJS lets you compose Three.js scenes using Vue components and gives you built-in pointer events on any mesh.</p>

          <CodeBlock lang="vue" :code="`<template>
  <TresCanvas>
    <TresPerspectiveCamera :position=&quot;[0, 2, 5]&quot; />

    <TresMesh
      @click=&quot;onCubeClick&quot;
      @pointer-enter=&quot;onCubeHover&quot;
      @pointer-leave=&quot;onCubeLeave&quot;
    >
      <TresBoxGeometry :args=&quot;[1, 1, 1]&quot; />
      <TresMeshStandardMaterial :color=&quot;cubeColor&quot; />
    </TresMesh>

    <TresDirectionalLight :position=&quot;[3, 4, 5]&quot; :intensity=&quot;1.2&quot; />
    <TresAmbientLight :intensity=&quot;0.5&quot; />
  </TresCanvas>
</template>

<script setup>
import { ref } from 'vue'

const cubeColor = ref('#4488ff')

function onCubeClick(event) {
  // event.object, the mesh that was clicked
  // event.point, Vector3 world position of the hit
  cubeColor.value = '#' + Math.floor(Math.random() * 0xffffff)
    .toString(16).padStart(6, '0')
}

function onCubeHover(event) {
  event.object.material.emissive.setHex(0x333333)
  document.body.style.cursor = 'pointer'
}

function onCubeLeave(event) {
  event.object.material.emissive.setHex(0x000000)
  document.body.style.cursor = 'default'
}
</script>`" />

          <p>TresJS handles all the raycasting internally. You just bind event handlers to meshes the same way you'd bind a <code>@click</code> to a button. The event object gives you the same intersection data (object, point, distance, face) that you'd get from a raw raycaster.</p>

          <p>The library also integrates with the Vue reactivity system, so changing a ref like <code>cubeColor</code> automatically updates the material. There's no manual <code>material.color.set()</code> needed.</p>

          <p>TresJS also has a plugin ecosystem (called <strong>Cientos</strong>) that provides higher-level interaction components like <code>OrbitControls</code>, <code>TransformControls</code>, and drag helpers.</p>

          <h2>Interaction in React with React Three Fiber</h2>

          <p><strong>React Three Fiber</strong> (R3F) is the most mature declarative Three.js framework. It maps Three.js objects to React components and provides a pointer event system that works the same way as DOM events.</p>

          <CodeBlock lang="jsx" :code="`import { Canvas } from '@react-three/fiber'
import { useState } from 'react'

function InteractiveCube() {
  const [color, setColor] = useState('#4488ff')
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation()
        setColor('#' + Math.floor(Math.random() * 0xffffff)
          .toString(16).padStart(6, '0'))
      }}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerLeave={(e) => {
        setHovered(false)
        document.body.style.cursor = 'default'
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={hovered ? '#333333' : '#000000'}
      />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <InteractiveCube />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <ambientLight intensity={0.5} />
    </Canvas>
  )
}`" />

          <p>R3F's event system is built on top of raycasting, but it gives you DOM-like semantics. Notice <code>e.stopPropagation()</code> in the click handler, which prevents the event from reaching objects behind the cube. This is the 3D equivalent of stopping event bubbling in the DOM, and it solves the click-through problem natively within the 3D scene.</p>

          <p>R3F also has <strong>@react-three/drei</strong>, a companion library with dozens of pre-built interaction helpers: <code>DragControls</code>, <code>PivotControls</code>, <code>TransformControls</code>, <code>Html</code> (for DOM elements that track 3D positions), and many more.</p>

          <h2>Comparing the approaches</h2>

          <p>Which approach you use depends on your project's stack and complexity:</p>

          <ul>
            <li><strong>Raw JS/TS with an interaction manager</strong> gives you full control and zero dependencies. It's the right choice when you're not using a framework, when you need very specific behavior, or when you're integrating Three.js into an existing non-framework page. The tradeoff is you own all the code: hover tracking, event propagation, cleanup, nested mesh resolution.</li>
            <li><strong>TresJS (Vue)</strong> is ideal if you're already in the Vue/Nuxt ecosystem. Interaction is declarative and reactive. You don't write raycasting code at all. The tradeoff is that you're coupling your 3D scene to Vue's component model, which may not suit every project.</li>
            <li><strong>React Three Fiber</strong> is the most battle-tested option with the largest ecosystem. If you're in React, it's the default choice. The event system is the most complete, with propagation, bubbling, and stopPropagation working like DOM events. The tradeoff is the React dependency and the mental model shift of treating 3D objects as React components.</li>
          </ul>

          <p>All three approaches solve the same underlying problem: mapping 2D screen events to 3D scene objects. The raw approach makes the mechanics explicit. The framework approaches hide them behind familiar APIs. Neither is inherently better; it depends on what you're building.</p>

          <h2>A note on three-mesh-ui</h2>

          <p><strong>three-mesh-ui</strong> is worth mentioning separately because it solves a different problem: building actual UI elements (text, buttons, panels) inside the 3D scene as meshes, not as HTML overlays. This is useful for VR/AR where DOM elements don't exist, or when you want UI elements that exist in 3D space (like a label floating above a character's head that can be occluded by other objects).</p>

          <p>three-mesh-ui doesn't handle raycasting itself. You still need to raycast against its mesh blocks and call its <code>update()</code> method each frame. But it gives you a layout system (flexbox-like) for arranging text and panels in 3D, which is something you'd otherwise have to build from scratch with sprite textures or canvas textures mapped onto planes.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/interaction/raycasting-and-mouse-events"
    prevText="Raycasting and Mouse Events"
    nextLink="/learn-threejs/interaction/drag-drop-and-transform"
    nextText="Drag, Drop, and Transform"
  />
  <Footer />
</template>

<script setup>

useHead({
  title: 'Interaction Managers and Libraries in Three.js'
})

useSeoMeta({
  title: 'Interaction Managers and Libraries in Three.js',
  ogTitle: 'Interaction Managers and Libraries in Three.js',
  description: 'How to scale Three.js interaction beyond raw raycasters: building interaction managers, preventing click-through, and using TresJS, React Three Fiber, and three-mesh-ui.',
  ogDescription: 'How to scale Three.js interaction beyond raw raycasters: building interaction managers, preventing click-through, and using TresJS, React Three Fiber, and three-mesh-ui.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/interaction/interaction-managers-and-libraries',
  twitterTitle: 'Interaction Managers and Libraries in Three.js',
  twitterDescription: 'How to scale Three.js interaction beyond raw raycasters: building interaction managers, preventing click-through, and using TresJS, React Three Fiber, and three-mesh-ui.',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>
