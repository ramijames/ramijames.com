<template>
  
  <PageHeader title="WebGL shaders with Three.js in Nuxt" tagline="Using WebGL shaders in a Nuxt project opens a wide field of possibilities for new effects and subtle visual enhancements" />

  <div ref="container" class="three-container w-consistent" id="example"></div>

  <main class="w-content page-top">
    <section class="content">

      <h2>WebGL Shaders</h2>

      <p>WebGL shaders are programs that run directly on the GPU to render graphics. In a Nuxt project, we can use Three.js to render WebGL shaders and apply them in all sorts of interesting ways. My preferred approach, from a design perspective, is to use them for subtle visual enhancements and dynamic effects, especially for backgrounds that can gracefully degrade.</p>

      <h2>Three.js Integration in Nuxt</h2>

      <p>Installing three.js in nuxt is straightforward. You can install it via npm or yarn:</p>

      <CodeBlock
        :code="installCode"
        lang="bash"
      />

      <p>Once installed, you can import and use it in your components:</p>

      <CodeBlock
        :code="importCode"
        lang="javascript"
      />

      <h2>Creating a Shader Background</h2>

      <p>In this example, I've created a simple WebGL shader that generates a dynamic, noise-based background effect. The shader uses a fragment shader to create isovalues based on noise functions, resulting in a flowing, organic pattern. It's an altered, updated version of the original which you can  <a href="https://www.shadertoy.com/view/ldfczS">see here on Shadertoy</a>.</p>

      <p>The shader is applied to a fullscreen plane in a Three.js scene, which is then rendered within a Nuxt component. The effect is subtle and can be used as a background for various sections of a webpage.</p>

      <h2>Code Breakdown</h2>

      <p>The core of the shader effect lies in the fragment shader code, which defines how each pixel is colored based on noise functions and time. The vertex shader simply passes through the UV coordinates.</p>

      <p>Shaders can be intimidating because they feel like there's a lot of esoteric mathematics involved, but they're actually quite approachable once you understand the basics. The key is to start with simple examples and gradually build up complexity.</p>

      <p>In our case, the code is broken down into a few discrete sections that are approachable and manageable.</p>

      <p>We have in the beginning some simple setup code that imports what we need, and sets up some simple consts.</p>

      <p>Following that, we define the vertex and fragment shaders. The vertex shader simply passes through the UV coordinates, while the fragment shader implements the noise-based isovalues effect.</p>

      <p>Then we're ready to use the shaders in a Three.js scene.</p>

      <p>For the Three.js scene setup, we create a scene, camera, and renderer. We then create a plane geometry and apply the shader material to it.</p>

      <p>Lastly, we're just doing our normal Nuxt stuff, where we run what everything we've built with onMounted, and doing some cleanup in onBeforeUnmount.</p>

      <CodeBlock
        :code="fullCode"
        lang="javascript"
      />

      <h2>Conclusion</h2>

      <p>By leveraging the power of the GPU with WebGL shaders, we can create dynamic backgrounds and effects that enhance the user experience without compromising performance. This approach opens up a wide range of possibilities for designers and developers looking to push the boundaries of web design.</p>
    </section>
  </main>
  <PostsExtras />
  <Footer />
</template>

<script setup>
import * as THREE from 'three'
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'

// Code examples for the article
const installCode = `npm install three
# or
yarn add three`

const importCode = `import * as THREE from 'three';`

const fullCode = `import * as THREE from 'three'
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'

const container = ref(null)

let scene, camera, renderer, animationId, backgroundMesh
let mouse = { x: 0.5, y: 0.5 }
let targetMouse = { x: 0.5, y: 0.5 }
let onMouseMove = null

// Noise-based isovalues shader
const vertexShader = \`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
\`

const fragmentShader = \`
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // --- noise from procedural pseudo-Perlin ---------
  float noise3( vec3 x ) {
      vec3 p = floor(x),f = fract(x);
      f = f*f*(3.-2.*f);
      #define hash3(p)  fract(sin(1e3*dot(p,vec3(1,57,-13.7)))*4375.5453)

      return mix( mix(mix( hash3(p+vec3(0,0,0)), hash3(p+vec3(1,0,0)),f.x),
                      mix( hash3(p+vec3(0,1,0)), hash3(p+vec3(1,1,0)),f.x),f.y),
                  mix(mix( hash3(p+vec3(0,0,1)), hash3(p+vec3(1,0,1)),f.x),
                      mix( hash3(p+vec3(0,1,1)), hash3(p+vec3(1,1,1)),f.x),f.y), f.z);
  }

  #define noise(x) (noise3(x)+noise3(x+11.5)) / 2.

  void main() {
      vec2 U = vUv * uResolution;
      vec2 R = uResolution.xy;
      float n = noise(vec3(U*8./R.y, .05*uTime)),
            v = sin(6.28*10.*n);

      v = smoothstep(1.,0., .5*abs(v)/fwidth(v));

      vec3 color1 = vec3(0.945, 0.788, 0.067);  // golden yellow
      vec3 color2 = vec3(1.0, 1.0, 1.0);        // white
      vec3 color3 = vec3(0.431, 0.486, 0.741);  // blue

      vec3 baseColor = .5+.5*sin(12.*n+vec3(0,2.1,-2.1));
      vec3 finalColor = mix(mix(color1, color2, baseColor.r), color3, baseColor.b);

      gl_FragColor = vec4(finalColor * v, v);
  }
\`

const initThreeScene = () => {
  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  // Create shader material
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    },
    vertexShader,
    fragmentShader,
    transparent: true
  })

  // Create fullscreen plane
  const geometry = new THREE.PlaneGeometry(2, 2)
  backgroundMesh = new THREE.Mesh(geometry, shaderMaterial)
  scene.add(backgroundMesh)

  // Animation loop
  const animate = () => {
    shaderMaterial.uniforms.uTime.value += 0.016
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  animate()
}

onMounted(async () => {
  await nextTick()
  initThreeScene()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose()
  backgroundMesh?.geometry.dispose()
  backgroundMesh?.material.dispose()
})`

const container = ref(null)

let scene, camera, renderer, animationId, backgroundMesh
let mouse = { x: 0.5, y: 0.5 }
let targetMouse = { x: 0.5, y: 0.5 }
let onMouseMove = null

// Noise-based isovalues shader
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;
  
  // --- noise from procedural pseudo-Perlin (better but not so nice derivatives) ---------
  // ( adapted from IQ )
  float noise3( vec3 x ) {
      vec3 p = floor(x),f = fract(x);
      f = f*f*(3.-2.*f);  // or smoothstep     // to make derivative continuous at borders
      #define hash3(p)  fract(sin(1e3*dot(p,vec3(1,57,-13.7)))*4375.5453)        // rand
      
      return mix( mix(mix( hash3(p+vec3(0,0,0)), hash3(p+vec3(1,0,0)),f.x),       // triilinear interp
                      mix( hash3(p+vec3(0,1,0)), hash3(p+vec3(1,1,0)),f.x),f.y),
                  mix(mix( hash3(p+vec3(0,0,1)), hash3(p+vec3(1,0,1)),f.x),       
                      mix( hash3(p+vec3(0,1,1)), hash3(p+vec3(1,1,1)),f.x),f.y), f.z);
  }
  
  #define noise(x) (noise3(x)+noise3(x+11.5)) / 2. // pseudoperlin improvement from foxes idea 
  
  void main() // ------------ draw isovalues
  { 
      vec2 U = vUv * uResolution;
      vec2 R = uResolution.xy;
      float n = noise(vec3(U*8./R.y, .05*uTime)),
            v = sin(6.28*10.*n),
            t = uTime;
      
      v = smoothstep(1.,0., .5*abs(v)/fwidth(v));
      
      // Custom color palette: #F1C911, #FFFFFF, #6E7CBD
      vec3 color1 = vec3(0.945, 0.788, 0.067);  // #F1C911 - golden yellow
      vec3 color2 = vec3(1.0, 1.0, 1.0);        // #FFFFFF - white
      vec3 color3 = vec3(0.431, 0.486, 0.741);  // #6E7CBD - blue
      
      // Create color variation based on noise
      vec3 baseColor = .5+.5*sin(12.*n+vec3(0,2.1,-2.1));
      
      // Map to custom palette
      vec3 finalColor = mix(
          mix(color1, color2, baseColor.r),
          color3,
          baseColor.b
      );
      
      // Only show the lines, everything else is transparent
      gl_FragColor = vec4(finalColor * v, v);
  }
`

const initThreeScene = () => {
  if (!container.value) {
    console.error('Container ref is null')
    return
  }

  // Get dimensions with fallback
  const width = container.value.clientWidth || window.innerWidth
  const height = container.value.clientHeight || window.innerHeight

  console.log('Container dimensions:', width, height)

  // Prevent invalid dimensions
  if (width === 0 || height === 0) {
    console.error('Container has no dimensions')
    return
  }

  // Scene
  scene = new THREE.Scene()

  // Camera (orthographic for fullscreen effect)
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0) // Transparent background
  container.value.appendChild(renderer.domElement)
  
  console.log('Renderer created and canvas added')

  // Create fullscreen shader material
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    side: THREE.DoubleSide
  })

  // Create a plane that fills the screen
  const geometry = new THREE.PlaneGeometry(2, 2)
  backgroundMesh = new THREE.Mesh(geometry, shaderMaterial)
  scene.add(backgroundMesh)

  console.log('Shader background created and added to scene')

  // Mouse move handler
  onMouseMove = (event) => {
    const rect = container.value.getBoundingClientRect()
    targetMouse.x = (event.clientX - rect.left) / rect.width
    targetMouse.y = 1.0 - (event.clientY - rect.top) / rect.height // Flip Y
  }

  container.value.addEventListener('mousemove', onMouseMove)

  // Animation loop
  const animate = () => {
    if (!renderer || !scene || !camera) return
    
    // Smoothly interpolate mouse position for fluid movement
    mouse.x += (targetMouse.x - mouse.x) * 0.1
    mouse.y += (targetMouse.y - mouse.y) * 0.1
    
    // Update time uniform for animation
    shaderMaterial.uniforms.uTime.value += 0.016 // ~60fps
    shaderMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y)
    
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }

  animate()

  // Resize handling
  window.addEventListener('resize', onResize)
}

onMounted(async () => {
  // Wait for next tick to ensure DOM is ready
  await nextTick()
  initThreeScene()
})

function onResize() {
  if (!container.value || !camera || !renderer) return

  const width = container.value.clientWidth || window.innerWidth
  const height = container.value.clientHeight || window.innerHeight

  if (width === 0 || height === 0) return

  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
  // Update shader resolution uniform
  if (backgroundMesh && backgroundMesh.material) {
    backgroundMesh.material.uniforms.uResolution.value.set(width, height)
  }
}

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', onResize)
  if (container.value && onMouseMove) {
    container.value.removeEventListener('mousemove', onMouseMove)
  }
  
  // Proper cleanup
  if (renderer) {
    renderer.dispose()
    if (container.value && renderer.domElement && container.value.contains(renderer.domElement)) {
      container.value.removeChild(renderer.domElement)
    }
  }
  if (scene) {
    scene.clear()
  }
  if (backgroundMesh) {
    backgroundMesh.geometry.dispose()
    backgroundMesh.material.dispose()
  }
})
</script>

<style scoped>

#example {
  width: calc(100% - 2rem);
  overflow: hidden;
  position: relative;
  background: black;
  border-radius: 1rem;
  border: 1px solid rgba(black, 0.2);
  margin: 0 auto 2rem;
  padding: 0;
}
</style>