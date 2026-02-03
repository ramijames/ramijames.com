<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Introduction to Shaders in Three.js" tagline="Understanding the graphics pipeline and how to write your first shader." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Let's talk about Shaders!</h2>

          <p>(I'm so excited. Shaders are my favorite!)</p>

          <p>Let's start by explaining what they are. Shaders are small programs that run directly on your GPU. Unlike JavaScript, which runs on your CPU one instruction at a time, shaders execute in parallel across many, many GPU cores simultaneously. This massive parallelism is what makes real-time 3D graphics possible.</p>

          <p>In Three.js, every material you use, whether it's <code>MeshBasicMaterial</code>, <code>MeshStandardMaterial</code>, etc., it is actually compiled into shaders behind the scenes.</p>
          
          <p>When you write custom shaders, you're taking direct control of how your geometry is positioned and how every pixel is colored!</p>

          <p>There are two types of shaders you need to understand. First there is the <strong>Vertex Shader</strong> and then there is the <strong>Fragment Shader</strong>. They work together as a pipeline, with the vertex shader running first and its output feeding into the fragment shader.</p>

          <h3>The Vertex Shader</h3>

          <p>The vertex shader is responsible for positioning individual vertices in 3D space. Every vertex in your geometry passes through this shader exactly once. Its primary job is to transform vertex positions from <strong>model space</strong> (local coordinates) through <strong>world space</strong> and <strong>view space</strong> into <strong>clip space</strong> (the final 2D coordinates on your screen).</p>

          <p>The Vertex Shader is where you handle:</p>

          <ul>
            <li><strong>Displacement</strong>: Moving vertices based on noise, time, or other data to create waves, terrain, or animated effects.</li>
            <li><strong>Projection</strong>: The mathematical transformation that converts 3D coordinates into 2D screen positions.</li>
            <li><strong>Passing data to the fragment shader</strong>: Any information you want to use for coloring (like UVs, normals, or custom values) must be passed through the vertex shader.</li>
          </ul>

          <p>The minimum output of a vertex shader is <code>gl_Position</code>, a 4-component vector representing the final clip-space position of the vertex.</p>

          <CodeBlock lang="glsl" :code="`void main() {
  // Transform the vertex position to clip space
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`" />

          <h3>The Fragment Shader</h3>

          <p>The fragment shader runs after the vertex shader and is responsible for the color of every single pixel (technically called a "fragment") that falls between your vertices. While the vertex shader runs once per vertex, the fragment shader runs once per pixel, which translates into potentially millions of times per frame.</p>

          <p>The Fragment Shader is where you control:</p>

          <ul>
            <li><strong>Color</strong>: The RGB values of each pixel.</li>
            <li><strong>Brightness</strong>: How light or dark the surface appears.</li>
            <li><strong>Texture sampling</strong>: Reading color data from images and applying it to the surface.</li>
            <li><strong>Lighting calculations</strong>: Computing how light interacts with the surface.</li>
            <li><strong>Alpha/transparency</strong>: How see-through each pixel is.</li>
          </ul>

          <p>The output of a fragment shader is <code>gl_FragColor</code> (or in modern GLSL, an <code>out</code> variable), a 4-component vector representing RGBA color.</p>

          <CodeBlock lang="glsl" :code="`void main() {
  // Output a solid red color
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`" />

          <h3>Vertex vs Fragment</h3>

          <p>The best metaphor that I've come across is that you can think of the relationship between these two shaders like building a house.</p>

          <p>The <strong>Vertex Shader</strong> is the architect who draws the blueprints and creates the structure. Where the walls meet, where the roof peaks, and where the foundation sits. Without the architect's work, there's no shape to work with.</p>

          <p>The <strong>Fragment Shader</strong> is the interior designer who decides what color to paint the walls and where the lights go. The designer fills in every surface with color, texture, and atmosphere.</p>

          <p>You can't paint walls that don't exist (fragment shader needs vertex shader output), and blueprints alone don't make a livable space (vertices without fragments would be invisible). They're partners in a strict sequence. Architect (Vertex Shader) goes first, and then the designer (Fragment Shader) goes second.</p>

          <h2>Uniforms and Attributes are the bridge</h2>

          <p>Shaders run on the GPU, but your application logic lives in JavaScript on the CPU. Data needs to flow from one to the other. This happens through two mechanisms called <strong>Uniforms</strong> and <strong>Attributes</strong>.</p>

          <h3>Uniforms are constant values</h3>

          <p>Uniforms are values that stay the same for every vertex and every fragment during a single draw call. They're "uniform" across the entire mesh.</p>

          <p>Common uniforms include:</p>

          <ul>
            <li><strong>Time</strong>: For animations (<code>float</code>)</li>
            <li><strong>Resolution</strong>: Screen dimensions (<code>vec2</code>)</li>
            <li><strong>Colors</strong>: Theme colors or tints (<code>vec3</code>)</li>
            <li><strong>Matrices</strong>: Camera and model transformations (<code>mat4</code>)</li>
            <li><strong>Textures</strong>: Images to sample from (<code>sampler2D</code>)</li>
          </ul>

          <p>Three.js automatically provides several built-in uniforms like <code>projectionMatrix</code>, <code>modelViewMatrix</code>, and <code>cameraPosition</code>. You can also define your own.</p>

          <CodeBlock lang="javascript" :code="`// In JavaScript
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
    uColor: { value: new THREE.Color(0x00ff00) }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

// In your animation loop
material.uniforms.uTime.value = elapsedTime;`" />

          <CodeBlock lang="glsl" :code="`// In GLSL (accessible in both vertex and fragment shaders)
uniform float uTime;
uniform vec3 uColor;`" />

          <h3>Attributes are per-vertex data</h3>

          <p>Attributes are values that differ for each vertex. They're stored in the geometry's buffer and can include stuff like:</p>

          <ul>
            <li><strong>position</strong>: The vertex's XYZ coordinates (<code>vec3</code>)</li>
            <li><strong>normal</strong>: The direction the surface faces (<code>vec3</code>)</li>
            <li><strong>uv</strong>: Texture coordinates (<code>vec2</code>)</li>
            <li><strong>color</strong>: Per-vertex colors (<code>vec3</code>)</li>
            <li><strong>custom attributes</strong>: Any per-vertex data you need</li>
          </ul>

          <p><strong>Attributes are only available in the vertex shader</strong>. If you need attribute data in the fragment shader, you must pass it through using a <strong>varying</strong> (or in modern GLSL, an <code>out</code>/<code>in</code> pair).</p>

          <CodeBlock lang="glsl" :code="`// Vertex shader
attribute vec3 position;  // Built-in: vertex position
attribute vec2 uv;        // Built-in: texture coordinates
attribute vec3 normal;    // Built-in: surface normal

varying vec2 vUv;         // Pass UV to fragment shader

void main() {
  vUv = uv;  // Copy attribute to varying
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`" />

          <CodeBlock lang="glsl" :code="`// Fragment shader
varying vec2 vUv;  // Receive UV from vertex shader

void main() {
  // Use the interpolated UV coordinates
  gl_FragColor = vec4(vUv, 0.0, 1.0);
}`" />

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/interaction/html-overlays-and-labels"
    prevText="HTML overlays and labels"
    nextLink="/learn-threejs/shaders/how-to-think-about-creating-shaders"
    nextText="How to think about creating shaders"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const shaderCanvas = ref(null);

let renderer = null;
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!shaderCanvas.value) return;

  const container = shaderCanvas.value.parentElement;
  const sizes = { width: container.clientWidth, height: container.clientHeight };

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
  camera.position.set(0, 1.5, 3);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ canvas: shaderCanvas.value, antialias: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Vertex shader
  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vUv = uv;

      vec3 pos = position;
      pos.z += sin(pos.x * 4.0 + uTime) * 0.2;
      pos.z += sin(pos.y * 4.0 + uTime * 0.8) * 0.2;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment shader
  const fragmentShader = `
    varying vec2 vUv;

    void main() {
      vec3 color = vec3(vUv, 0.5 + 0.5 * sin(vUv.x * 10.0));
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Shader material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 }
    },
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide
  });

  // Geometry
  const geometry = new THREE.PlaneGeometry(4, 4, 32, 32);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI * 0.3;
  scene.add(mesh);

  // Clock
  const clock = new THREE.Clock();

  // Resize handler
  const handleResize = () => {
    sizes.width = container.clientWidth;
    sizes.height = container.clientHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  };

  window.addEventListener('resize', handleResize);

  // Animation loop
  const tick = () => {
    material.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(tick);
  };

  tick();

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
  });
});

useHead({
  title: 'Introduction to Shaders in Three.js'
})

useSeoMeta({
  title: 'Introduction to Shaders in Three.js',
  ogTitle: 'Introduction to Shaders in Three.js',
  description: 'Learn the fundamentals of shader programming in Three.js: vertex shaders, fragment shaders, uniforms, attributes, and how data flows from JavaScript to the GPU.',
  ogDescription: 'Learn the fundamentals of shader programming in Three.js: vertex shaders, fragment shaders, uniforms, attributes, and how data flows from JavaScript to the GPU.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/shaders/introduction-to-shaders',
  twitterTitle: 'Introduction to Shaders in Three.js',
  twitterDescription: 'Learn the fundamentals of shader programming in Three.js: vertex shaders, fragment shaders, uniforms, attributes, and how data flows from JavaScript to the GPU.',
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
