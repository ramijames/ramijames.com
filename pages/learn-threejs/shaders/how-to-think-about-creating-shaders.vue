<template>

  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="How to think about creating shaders" tagline="The mental shift from CPU to GPU programming can be hard to wrap your head around." />

      <main class="w-content page-top">
        <section class="content">

          <h2>A crazy brain flip</h2>

          <p>Programming in GLSL requires a fundamental shift in how you think about code. On the CPU (JavaScript), you think like a manager giving a list of instructions. "Do step A, then step B, then loop through this array." It's linear and for most programmers it is what you've learned.</p>

          <p>In GLSL, you have to <strong>think like a pixel</strong>. You are writing a program that runs millions of times simultaneously, and each "instance" of your program is a single pixel asking:</p>

          <blockquote>
            "I am at coordinate (x, y) at time T. What color should I be?"
          </blockquote>

          <p>That's it. That's the entire job of your fragment shader. Every pixel runs the same code, but each one has different input coordinates. The magic happens when millions of these independent calculations combine to form an image.</p>

          <h2>The 4-Step mental framework for creating shaders</h2>

          <p>When approaching any shader effect, you have to work through these four steps in order. This framework will help you decompose any visual effect into manageable pieces.</p>

          <h3>1: Identify your inputs (space and time)</h3>

          <p>Every effect starts with the two fundamental questions of <strong>"Where am I?" and "What time is it?"</strong> These translate into your <code>vUv</code> (the 0.0 to 1.0 coordinates of your shape) and your <code>uTime</code> uniforms.</p>

          <p>If you want a circle in the middle, you need to know which pixels are near the center <code>(0.5, 0.5)</code>. If you want a wave, you need to know how far you are from the left edge <code>(x = 0.0)</code>.</p>

          <CodeBlock lang="glsl" :code="`// Your two fundamental inputs
varying vec2 vUv;      // Where am I? (0.0 to 1.0)
uniform float uTime;   // What time is it?

void main() {
  // Now every pixel knows its position and the current time
  float x = vUv.x;  // 0.0 on the left, 1.0 on the right
  float y = vUv.y;  // 0.0 at the bottom, 1.0 at the top
}`" />

          <h3>2: Use shaping functions instead of if/else</h3>

          <p>In JavaScript, you might write: <code>if (x > 0.5) { color = red; }</code>. In shaders, <code>if</code> statements are slow for the GPU because they break the parallel execution model. Instead, we use <strong>math as logic</strong>.</p>

          <p>Here are your essential shaping functions:</p>

          <div class="function-grid">
            <div class="function-card">
              <h4>sin() and cos()</h4>
              <p>Your best friends for anything that repeats, pulses, or waves. Output ranges from -1.0 to 1.0.</p>
              <CodeBlock lang="glsl" :code="`// Pulsing value between 0 and 1
float pulse = 0.5 + 0.5 * sin(uTime);

// Horizontal waves
float wave = sin(vUv.x * 10.0 + uTime);`" />
            </div>

            <div class="function-card">
              <h4>step(edge, value)</h4>
              <p>Returns 0.0 if value is below the edge, 1.0 if above. It's a hard cut with no transition.</p>
              <CodeBlock lang="glsl" :code="`// Hard split at the middle
float mask = step(0.5, vUv.x);
// Left half = 0.0 (black)
// Right half = 1.0 (white)`" />
            </div>

            <div class="function-card">
              <h4>smoothstep(edge1, edge2, value)</h4>
              <p>Creates a smooth gradient between two points. This is how you make soft glows or anti-aliased edges.</p>
              <CodeBlock lang="glsl" :code="`// Smooth transition from 0.4 to 0.6
float soft = smoothstep(0.4, 0.6, vUv.x);
// Below 0.4 = 0.0
// Above 0.6 = 1.0
// Between = smooth curve`" />
            </div>

            <div class="function-card">
              <h4>fract(value)</h4>
              <p>Returns only the decimal part. This is the secret to tiling where you turn one square into a grid of many.</p>
              <CodeBlock lang="glsl" :code="`// Create a 10x10 grid
vec2 grid = fract(vUv * 10.0);
// Each cell now has its own 0.0-1.0 range`" />
            </div>
          </div>

          <h3>3: The distance field mental model</h3>

          <p>When building shapes (like a circle or a star), don't think about drawing lines. Think about <strong>distance</strong>.</p>

          <p>The process is simple:</p>

          <ol>
            <li>Calculate the distance from the current pixel to a point</li>
            <li>Use a shaping function on that distance</li>
            <li>The result is your shape mask</li>
          </ol>

          <CodeBlock lang="glsl" :code="`// Step 1: Calculate distance from center
float d = distance(vUv, vec2(0.5, 0.5));

// Step 2: Create a mask using step
float circle = step(d, 0.3);
// Pixels closer than 0.3 units = 1.0 (white)
// Pixels further than 0.3 units = 0.0 (black)

// Or use smoothstep for a soft edge
float softCircle = smoothstep(0.3, 0.28, d);`" />

          <p>This creates a white circle on a black background because every pixel measures its distance from the center and asks: "Am I closer than 0.3 units?" If yes, it's white. If no, it's black.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="distanceCanvas"></canvas>
          </div>
          </ClientOnly>

          <h3>4: Layering (the mixing phase)</h3>

          <p>Once you have your shapes or patterns, you combine them. GLSL has a built-in function called <code>mix(colorA, colorB, percentage)</code>.</p>

          <ul>
            <li><strong>Percentage 0.0</strong>: You see Color A</li>
            <li><strong>Percentage 1.0</strong>: You see Color B</li>
            <li><strong>Percentage 0.5</strong>: You see a perfect blend</li>
          </ul>

          <p>By using your distance mask from Step 3 as the "percentage," you can tell the GPU something like "If you are inside the circle distance, use Red; if you are outside, use Blue."</p>

          <CodeBlock lang="glsl" :code="`vec3 red = vec3(1.0, 0.0, 0.0);
vec3 blue = vec3(0.0, 0.0, 1.0);

// Use the circle mask to blend colors
float d = distance(vUv, vec2(0.5));
float mask = smoothstep(0.3, 0.28, d);

vec3 finalColor = mix(blue, red, mask);
// Outside circle = blue
// Inside circle = red
// Edge = smooth gradient between them`" />

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="mixCanvas"></canvas>
          </div>
          </ClientOnly>

          <h2>Your checklist</h2>

          <p>When you see a cool effect and want to recreate it, ask yourself these questions:</p>

          <div class="checklist">
            <div class="checklist-item">
              <div class="checklist-icon">🔁</div>
              <div class="checklist-content">
                <strong>Pattern:</strong> Is it repeating? Use <code>fract()</code>
              </div>
            </div>
            <div class="checklist-item">
              <div class="checklist-icon">⏱️</div>
              <div class="checklist-content">
                <strong>Motion:</strong> Does it move? Use <code>uTime</code> inside a <code>sin()</code> or <code>cos()</code>
              </div>
            </div>
            <div class="checklist-item">
              <div class="checklist-icon">📍</div>
              <div class="checklist-content">
                <strong>Shape:</strong> Where is it located? Use <code>distance()</code> or <code>vUv</code>
              </div>
            </div>
            <div class="checklist-item">
              <div class="checklist-icon">🎚️</div>
              <div class="checklist-content">
                <strong>Contrast:</strong> Is it blurry or sharp? Use <code>smoothstep()</code> vs <code>step()</code>
              </div>
            </div>
          </div>

          <h2>Normalization is everything</h2>

          <p>The most powerful tool in GLSL is <strong>normalization</strong>. Always try to keep your values between 0.0 and 1.0. It makes the math predictable and allows different functions to "talk" to each other easily.</p>

          <CodeBlock lang="glsl" :code="`// sin() outputs -1.0 to 1.0
// Normalize it to 0.0 to 1.0:
float normalized = 0.5 + 0.5 * sin(uTime);

// Now it works perfectly with mix(), smoothstep(), etc.
vec3 color = mix(colorA, colorB, normalized);`" />

          <p>When values are normalized, you can chain operations together. A distance becomes a mask, a mask becomes a blend factor, a blend factor becomes a color. Everything flows smoothly when you're working in the 0.0 to 1.0 range.</p>

          <h2>Putting it all together</h2>

          <p>Here's a complete example that uses all four steps: identifying inputs, using shaping functions, calculating distance, and mixing colors.</p>

          <ClientOnly>
          <div class="scene-container">
            <canvas ref="combinedCanvas"></canvas>
          </div>
          </ClientOnly>

          <CodeBlock lang="glsl" :code="`uniform float uTime;
varying vec2 vUv;

void main() {
  // Step 1: Inputs, we have vUv and uTime

  // Step 2: Shaping, create an animated offset
  float wave = sin(uTime * 2.0) * 0.1;

  // Step 3: Distance, circle that pulses
  vec2 center = vec2(0.5 + wave, 0.5);
  float d = distance(vUv, center);
  float circle = smoothstep(0.3, 0.28, d);

  // Add a second ring using fract for repetition
  float rings = smoothstep(0.02, 0.0, fract(d * 10.0 - uTime));

  // Step 4: Mix it all together
  vec3 bg = vec3(0.1, 0.1, 0.2);
  vec3 circleColor = vec3(1.0, 0.3, 0.5);
  vec3 ringColor = vec3(0.3, 0.5, 1.0);

  vec3 color = bg;
  color = mix(color, ringColor, rings * 0.5);
  color = mix(color, circleColor, circle);

  gl_FragColor = vec4(color, 1.0);
}`" />

          <p>This shader demonstrates the complete mental model of knowing where we are (<code>vUv</code>), knowing what time it is (<code>uTime</code>), then we use math instead of conditions, and we think in terms of distance, and finally we layer our effects with <code>mix()</code>.</p>

          <p>Once you internalize this framework, you'll start seeing shader effects differently and it will all sort of click. Instead of "how do I draw that," you'll think "what's the distance function for that shape, and how should it vary over time?"</p>

    </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-threejs/shaders/introduction-to-shaders"
    prevText="Introduction to Shaders"
    nextLink="/learn-threejs/shaders/your-first-shader"
    nextText="Your first shader"
  />
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const distanceCanvas = ref(null);
const mixCanvas = ref(null);
const combinedCanvas = ref(null);

let renderers = [];
let animationId = null;

onMounted(async () => {
  await nextTick();
  if (!distanceCanvas.value || !mixCanvas.value || !combinedCanvas.value) return;

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

  // ===== SCENE 1: Distance Field Circle =====
  const scene1 = new THREE.Scene();

  const distanceShader = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        float d = distance(vUv, vec2(0.5));

        // Show the raw distance as grayscale
        float gradient = d;

        // Add a sharp circle
        float circle = smoothstep(0.3, 0.28, d);

        // Animate between showing distance and circle
        float t = 0.5 + 0.5 * sin(uTime * 0.5);
        float result = mix(gradient, circle, t);

        gl_FragColor = vec4(vec3(result), 1.0);
      }
    `
  });

  const plane1 = new THREE.PlaneGeometry(1, 1);
  const mesh1 = new THREE.Mesh(plane1, distanceShader);
  scene1.add(mesh1);

  const { camera: cam1, renderer: ren1, container: con1, sizes: sz1 } = createRendererPair(distanceCanvas.value);

  animations.push(() => {
    distanceShader.uniforms.uTime.value += 0.016;
    ren1.render(scene1, cam1);
  });

  // ===== SCENE 2: Mix Demo =====
  const scene2 = new THREE.Scene();

  const mixShader = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        vec3 red = vec3(1.0, 0.2, 0.3);
        vec3 blue = vec3(0.2, 0.3, 1.0);

        float d = distance(vUv, vec2(0.5));
        float mask = smoothstep(0.3, 0.28, d);

        // Pulse the circle size
        float pulse = 0.3 + 0.1 * sin(uTime * 2.0);
        mask = smoothstep(pulse, pulse - 0.02, d);

        vec3 color = mix(blue, red, mask);

        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  const plane2 = new THREE.PlaneGeometry(1, 1);
  const mesh2 = new THREE.Mesh(plane2, mixShader);
  scene2.add(mesh2);

  const { camera: cam2, renderer: ren2, container: con2, sizes: sz2 } = createRendererPair(mixCanvas.value);

  animations.push(() => {
    mixShader.uniforms.uTime.value += 0.016;
    ren2.render(scene2, cam2);
  });

  // ===== SCENE 3: Combined Example =====
  const scene3 = new THREE.Scene();

  const combinedShader = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        // Step 1: Inputs - we have vUv and uTime

        // Step 2: Shaping - create an animated offset
        float wave = sin(uTime * 2.0) * 0.1;

        // Step 3: Distance - circle that moves
        vec2 center = vec2(0.5 + wave, 0.5);
        float d = distance(vUv, center);
        float circle = smoothstep(0.2, 0.18, d);

        // Add rings using fract for repetition
        float rings = smoothstep(0.02, 0.0, fract(d * 8.0 - uTime));

        // Step 4: Mix it all together
        vec3 bg = vec3(0.1, 0.1, 0.2);
        vec3 circleColor = vec3(1.0, 0.3, 0.5);
        vec3 ringColor = vec3(0.3, 0.5, 1.0);

        vec3 color = bg;
        color = mix(color, ringColor, rings * 0.5);
        color = mix(color, circleColor, circle);

        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  const plane3 = new THREE.PlaneGeometry(1, 1);
  const mesh3 = new THREE.Mesh(plane3, combinedShader);
  scene3.add(mesh3);

  const { camera: cam3, renderer: ren3, container: con3, sizes: sz3 } = createRendererPair(combinedCanvas.value);

  animations.push(() => {
    combinedShader.uniforms.uTime.value += 0.016;
    ren3.render(scene3, cam3);
  });

  // Resize handler
  const allScenes = [
    { container: con1, camera: cam1, renderer: ren1, sizes: sz1 },
    { container: con2, camera: cam2, renderer: ren2, sizes: sz2 },
    { container: con3, camera: cam3, renderer: ren3, sizes: sz3 }
  ];

  const handleResize = () => {
    allScenes.forEach(({ container, camera, renderer, sizes }) => {
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
  title: 'How to Think About Creating Shaders'
})

useSeoMeta({
  title: 'How to Think About Creating Shaders',
  ogTitle: 'How to Think About Creating Shaders',
  description: 'Learn the mental framework for shader programming: thinking like a pixel, using shaping functions, distance fields, and mixing techniques in GLSL.',
  ogDescription: 'Learn the mental framework for shader programming: thinking like a pixel, using shaping functions, distance fields, and mixing techniques in GLSL.',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/learn-threejs/shaders/how-to-think-about-creating-shaders',
  twitterTitle: 'How to Think About Creating Shaders',
  twitterDescription: 'Learn the mental framework for shader programming: thinking like a pixel, using shaping functions, distance fields, and mixing techniques in GLSL.',
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

blockquote {
  font-size: $font-size-lg;
  font-family: $font-family-serif;
  font-style: italic;
  padding: $spacing-md;
  margin: $spacing-md 0;
  border-left: 2px solid $blue;
}

.function-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-sm;
  margin: $spacing-md 0;
}

.function-card {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.5rem;

  h4 {
    margin: 0 0 0.5rem 0;
    font-family: monospace;
  }

  p {
    margin: 0 0 1rem 0;
  }
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.checklist-icon {
  font-size: 1.5rem;
  width: 2.5rem;
  text-align: center;
}

.checklist-content {
  font-size: 1rem;

  code {
    background: rgba(0, 0, 0, 0.08);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }
}

.dark {
  blockquote {
    background: rgba(255, 255, 255, 0.05);
    border-left-color: #4a9eff;
  }

  .function-card {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);

    h4 {
      color: #6ab0ff;
    }

    p {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .checklist {
    background: rgba(255, 255, 255, 0.05);
  }

  .checklist-content code {
    background: rgba(255, 255, 255, 0.1);
  }
}
</style>
