<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Your first shader in Three.js" tagline="Let's walk through writing your first shader together" />

      <main class="w-content page-top">
        <section class="content">

          <h2>Writing your first shader</h2>

          <p>Using the framework we described in the previous section, let's build a shader together. We'll start by describing what we want to achieve. You can't get somewhere if you don't know where you're going, right?</p>

          <p>Let's paint a rainbow arc that cycles through colors!</p>

          <p>For this, we need to think about:</p>

          <ul>
            <li>Rainbows are arcs (partial circles), so we'll calculate distance from a center point</li>
            <li>We need to mask the circle to only show the top half (the arc)</li>
            <li>The colors cycle through the spectrum based on angle or distance</li>
            <li>We want it to animate, so colors should shift over time</li>
          </ul>

          <h2>The vertex shader</h2>

          <p>The vertex shader's job is to position our plane and pass the UV coordinates to the fragment shader. For a flat 2D effect like this, we don't need any fancy vertex displacement.</p>

          <CodeBlock lang="glsl" :code="`// Vertex Shader
varying vec2 vUv;

void main() {
  vUv = uv;  // Pass UV coordinates to fragment shader
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`" />

          <p>That's it! The vertex shader just passes <code>uv</code> (the built-in texture coordinates) to our fragment shader via the <code>vUv</code> varying. All the interesting work happens next.</p>

          <h2>The fragment shader</h2>

          <p>This is where the magic happens. Let's build it piece by piece.</p>

          <h3>Calculate distance from center</h3>

          <p>First, we need to know how far each pixel is from the center of our plane. We'll place the center at the bottom-middle so our rainbow arcs upward.</p>

          <CodeBlock lang="glsl" :code="`varying vec2 vUv;

void main() {
  // Center at bottom-middle of the plane
  vec2 center = vec2(0.5, 0.0);

  // Distance from this pixel to the center
  float dist = distance(vUv, center);

  // Visualize: closer = black, further = white
  gl_FragColor = vec4(vec3(dist), 1.0);
}`" />

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="distanceCanvas"></canvas>
          </div>
          </ClientOnly>

          <h3>Create the rainbow bands</h3>

          <p>A rainbow has distinct color bands at different distances from the center. We'll define an inner and outer radius to create the arc thickness.</p>

          <CodeBlock lang="glsl" :code="`varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5, 0.0);
  float dist = distance(vUv, center);

  // Define the rainbow's inner and outer edges
  float innerRadius = 0.3;
  float outerRadius = 0.6;

  // Create a mask: 1.0 inside the band, 0.0 outside
  float ring = smoothstep(innerRadius, innerRadius + 0.02, dist)
             - smoothstep(outerRadius, outerRadius + 0.02, dist);

  gl_FragColor = vec4(vec3(ring), 1.0);
}`" />

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="ringCanvas"></canvas>
          </div>
          </ClientOnly>

          <h3>Mask to show only the top half</h3>

          <p>Rainbows are arcs, not full circles. We'll mask out the bottom half by checking if we're above the center point.</p>

          <CodeBlock lang="glsl" :code="`varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5, 0.0);
  float dist = distance(vUv, center);

  float innerRadius = 0.3;
  float outerRadius = 0.6;

  float ring = smoothstep(innerRadius, innerRadius + 0.02, dist)
             - smoothstep(outerRadius, outerRadius + 0.02, dist);

  // Only show pixels ABOVE the center (y > 0.0)
  float arcMask = smoothstep(0.0, 0.02, vUv.y);

  float rainbow = ring * arcMask;

  gl_FragColor = vec4(vec3(rainbow), 1.0);
}`" />

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="arcCanvas"></canvas>
          </div>
          </ClientOnly>

          <h3>Add the rainbow colors</h3>

          <p>Now for the fun part! We'll map the distance to a hue value and convert HSV to RGB. The colors will vary based on where we are within the rainbow band.</p>

          <CodeBlock lang="glsl" :code="`varying vec2 vUv;
uniform float uTime;

// HSV to RGB conversion function
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 center = vec2(0.5, 0.0);
  float dist = distance(vUv, center);

  float innerRadius = 0.3;
  float outerRadius = 0.6;

  float ring = smoothstep(innerRadius, innerRadius + 0.02, dist)
             - smoothstep(outerRadius, outerRadius + 0.02, dist);

  float arcMask = smoothstep(0.0, 0.02, vUv.y);
  float rainbow = ring * arcMask;

  // Map distance within the band to hue (0.0 to 1.0)
  float hue = (dist - innerRadius) / (outerRadius - innerRadius);

  // Animate the hue over time
  hue = fract(hue + uTime * 0.1);

  // Convert HSV to RGB (full saturation, full value)
  vec3 color = hsv2rgb(vec3(hue, 1.0, 1.0));

  // Apply the rainbow mask
  vec3 finalColor = color * rainbow;

  gl_FragColor = vec4(finalColor, 1.0);
}`" />

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="rainbowCanvas"></canvas>
          </div>
          </ClientOnly>

          <h3>Put it all together in Three.js</h3>

          <p>Now let's see the complete code to set this up in Three.js.</p>

          <CodeBlock lang="javascript" :code="`import * as THREE from 'three';

// Vertex Shader
const vertexShader = \`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
\`;

// Fragment Shader
const fragmentShader = \`
  varying vec2 vUv;
  uniform float uTime;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec2 center = vec2(0.5, 0.0);
    float dist = distance(vUv, center);

    float innerRadius = 0.3;
    float outerRadius = 0.6;

    float ring = smoothstep(innerRadius, innerRadius + 0.02, dist)
               - smoothstep(outerRadius, outerRadius + 0.02, dist);

    float arcMask = smoothstep(0.0, 0.02, vUv.y);
    float rainbow = ring * arcMask;

    float hue = (dist - innerRadius) / (outerRadius - innerRadius);
    hue = fract(hue + uTime * 0.1);

    vec3 color = hsv2rgb(vec3(hue, 1.0, 1.0));
    vec3 finalColor = color * rainbow;

    gl_FragColor = vec4(finalColor, 1.0);
  }
\`;

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the shader material
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 }
  },
  vertexShader,
  fragmentShader
});

// A simple plane to render our shader on
const geometry = new THREE.PlaneGeometry(1, 1);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Animation loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value = clock.getElapsedTime();
  renderer.render(scene, camera);
}

animate();`" />

          <h2>What we learned</h2>

          <p>In this tutorial, we applied the 4-step mental framework:</p>

          <ol>
            <li><strong>Identify inputs:</strong> We used <code>vUv</code> for position and <code>uTime</code> for animation.</li>
            <li><strong>Shaping functions:</strong> We used <code>smoothstep()</code> to create soft edges for our ring and arc mask.</li>
            <li><strong>Distance fields:</strong> We calculated <code>distance()</code> from the center to create our circular rainbow shape.</li>
            <li><strong>Mixing/layering:</strong> We multiplied our color by the rainbow mask to composite the final image.</li>
          </ol>

          <p>The vertex shader was minimal. All the creative work happened in the fragment shader, where each pixel asked, "How far am I from the center? Am I within the rainbow band? Am I above the horizon? What color should I be?"</p>

          <p>That's the shader mindset. Every pixel runs the same code, but each one gets a different answer based on its position.</p>

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/shaders/how-to-think-about-creating-shaders"
    prevText="How to think about creating shaders"
    nextLink=""
    nextText=""
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const distanceCanvas = ref(null);
const ringCanvas = ref(null);
const arcCanvas = ref(null);
const rainbowCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!distanceCanvas.value || !ringCanvas.value || !arcCanvas.value || !rainbowCanvas.value) return;

  const animations = [];

  const createRendererPair = (canvas) => {
    const container = canvas.parentElement;
    const sizes = { width: container.clientWidth, height: container.clientHeight };

    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderers.push(renderer);

    return { camera, renderer, container, sizes };
  };

  const baseVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // ===== SCENE 1: Distance visualization =====
  const scene1 = new THREE.Scene();
  scene1.background = new THREE.Color(0x1a1a2e);

  const distanceShader = new THREE.ShaderMaterial({
    vertexShader: baseVertexShader,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
        vec2 center = vec2(0.5, 0.0);
        float dist = distance(vUv, center);
        gl_FragColor = vec4(vec3(dist), 1.0);
      }
    `
  });

  const plane1 = new THREE.PlaneGeometry(1, 1);
  const mesh1 = new THREE.Mesh(plane1, distanceShader);
  scene1.add(mesh1);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(distanceCanvas.value);

  animations.push(() => {
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: Ring visualization =====
  const scene2 = new THREE.Scene();
  scene2.background = new THREE.Color(0x1a1a2e);

  const ringShader = new THREE.ShaderMaterial({
    vertexShader: baseVertexShader,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
        vec2 center = vec2(0.5, 0.0);
        float dist = distance(vUv, center);

        float innerRadius = 0.3;
        float outerRadius = 0.6;

        float ring = smoothstep(innerRadius, innerRadius + 0.02, dist)
                   - smoothstep(outerRadius, outerRadius + 0.02, dist);

        gl_FragColor = vec4(vec3(ring), 1.0);
      }
    `
  });

  const plane2 = new THREE.PlaneGeometry(1, 1);
  const mesh2 = new THREE.Mesh(plane2, ringShader);
  scene2.add(mesh2);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(ringCanvas.value);

  animations.push(() => {
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: Arc visualization =====
  const scene3 = new THREE.Scene();
  scene3.background = new THREE.Color(0x1a1a2e);

  const arcShader = new THREE.ShaderMaterial({
    vertexShader: baseVertexShader,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
        vec2 center = vec2(0.5, 0.0);
        float dist = distance(vUv, center);

        float innerRadius = 0.3;
        float outerRadius = 0.6;

        float ring = smoothstep(innerRadius, innerRadius + 0.02, dist)
                   - smoothstep(outerRadius, outerRadius + 0.02, dist);

        float arcMask = smoothstep(0.0, 0.02, vUv.y);
        float rainbow = ring * arcMask;

        gl_FragColor = vec4(vec3(rainbow), 1.0);
      }
    `
  });

  const plane3 = new THREE.PlaneGeometry(1, 1);
  const mesh3 = new THREE.Mesh(plane3, arcShader);
  scene3.add(mesh3);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(arcCanvas.value);

  animations.push(() => {
    ren3.render(scene3, cam3);
  });

  // ===== SCENE 4: Full rainbow =====
  const scene4 = new THREE.Scene();
  scene4.background = new THREE.Color(0x1a1a2e);

  const rainbowShader = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 }
    },
    vertexShader: baseVertexShader,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        vec2 center = vec2(0.5, 0.0);
        float dist = distance(vUv, center);

        float innerRadius = 0.3;
        float outerRadius = 0.6;

        float ring = smoothstep(innerRadius, innerRadius + 0.02, dist)
                   - smoothstep(outerRadius, outerRadius + 0.02, dist);

        float arcMask = smoothstep(0.0, 0.02, vUv.y);
        float rainbow = ring * arcMask;

        float hue = (dist - innerRadius) / (outerRadius - innerRadius);
        hue = fract(hue + uTime * 0.1);

        vec3 color = hsv2rgb(vec3(hue, 1.0, 1.0));
        vec3 finalColor = color * rainbow;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  });

  const plane4 = new THREE.PlaneGeometry(1, 1);
  const mesh4 = new THREE.Mesh(plane4, rainbowShader);
  scene4.add(mesh4);

  const { camera: cam4, renderer: ren4, container: con4, sizes: sz4 } = createRendererPair(rainbowCanvas.value);

  animations.push(() => {
    rainbowShader.uniforms.uTime.value += 0.016;
    ren4.render(scene4, cam4);
  });

  // Resize handler
  const allScenes = [
    { container: con1, renderer: ren1, sizes: sz1 },
    { container: con2, renderer: ren2, sizes: sz2 },
    { container: con3, renderer: ren3, sizes: sz3 },
    { container: con4, renderer: ren4, sizes: sz4 }
  ];

  const handleResize = () => {
    allScenes.forEach(({ container, renderer, sizes }) => {
      sizes.width = container.clientWidth;
      sizes.height = container.clientHeight;
      renderer.setSize(sizes.width, sizes.height);
    });
  };

  window.addEventListener('resize', handleResize);

  // Animation loop
  const tick = () => {
    animations.forEach(fn => fn());
    animationId = requestAnimationFrame(tick);
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
  title: 'Your First Shader in Three.js'
})

useSeoMeta({
  title: 'Your First Shader in Three.js',
  ogTitle: 'Your First Shader in Three.js',
  description: 'Build your first shader step by step: create an animated rainbow arc using distance fields, masking, and HSV color in Three.js and GLSL.',
  ogDescription: 'Build your first shader step by step: create an animated rainbow arc using distance fields, masking, and HSV color in Three.js and GLSL.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/shaders/your-first-shader',
  twitterTitle: 'Your First Shader in Three.js',
  twitterDescription: 'Build your first shader step by step: create an animated rainbow arc using distance fields, masking, and HSV color in Three.js and GLSL.',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>

<style scoped lang="scss">
.scene-container {
  width: 100%;
  height: 800px;
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
