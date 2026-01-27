<template>
  <div class="sdf-wrapper">
    <div class="controls">
      <div class="control-group">
        <label>Hole Ratio: {{ holeRatio.toFixed(2) }}</label>
        <input type="range" v-model.number="holeRatio" min="0" max="1" step="0.01" @input="updateUniforms" />
      </div>
      <div class="control-group">
        <label>Hole Count: {{ holeCount.toFixed(1) }}</label>
        <input type="range" v-model.number="holeCount" min="0.5" max="3" step="0.1" @input="updateUniforms" />
      </div>
    </div>
    <div ref="container" class="threejs-container" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, mesh
let animationId = null
let startTime = Date.now()

const holeRatio = ref(0.32)
const holeCount = ref(2.4)

const updateUniforms = () => {
  if (!mesh) return
  mesh.material.uniforms.uHoleRatio.value = holeRatio.value
  mesh.material.uniforms.uHoleCount.value = holeCount.value
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uHoleRatio;
  uniform float uHoleCount;

  const int MAX_STEPS = 48;
  const float MAX_DIST = 10.0;
  const float SURF_DIST = 0.003;

  // Simplex 3D noise
  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  // Smooth noise for liquid-like shapes
  float fbm(vec3 p) {
    float n = snoise(p * uHoleCount * 0.15);
    // Smooth the noise curve for liquid feel
    return n * n * n;
  }

  // Sphere SDF
  float sdSphere(vec3 p, float r) {
    return length(p) - r;
  }

  // Get noise-based cuts with time offset for animation
  float getShellCuts(vec3 p, float timeOffset) {
    vec3 noisePos = normalize(p) * 1.2 + vec3(
      (uTime + timeOffset) * 0.04,
      (uTime + timeOffset * 1.3) * 0.03,
      (uTime + timeOffset * 0.7) * 0.05
    );
    float noise = fbm(noisePos);
    float threshold = 0.3 - uHoleRatio * 0.6;
    float softness = 0.35;
    return smoothstep(threshold - softness, threshold + softness, noise) * 0.4;
  }

  // Scene SDF - three shells with independent animations
  float getDistance(vec3 p) {
    // Shell 1 (outer) - white
    float outer1 = sdSphere(p, 1.2);
    float inner1 = sdSphere(p, 1.0);
    float shell1 = max(outer1, -inner1) + getShellCuts(p, 0.0);

    // Shell 2 (middle) - blue
    float outer2 = sdSphere(p, 0.9);
    float inner2 = sdSphere(p, 0.7);
    float shell2 = max(outer2, -inner2) + getShellCuts(p, 40.0);

    // Shell 3 (inner) - yellow
    float outer3 = sdSphere(p, 0.6);
    float inner3 = sdSphere(p, 0.4);
    float shell3 = max(outer3, -inner3) + getShellCuts(p, 120.0);

    return min(min(shell1, shell2), shell3);
  }

  // Determine which shell was hit for coloring
  int getShellId(vec3 p) {
    float r = length(p);
    if (r > 0.95) return 0;      // Shell 1 - white
    if (r > 0.55) return 1;      // Shell 2 - blue
    return 2;                     // Shell 3 - yellow
  }

  // Raymarching
  float raymarch(vec3 ro, vec3 rd) {
    float dO = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
      vec3 p = ro + rd * dO;
      float dS = getDistance(p);
      dO += dS;
      if (dO > MAX_DIST || dS < SURF_DIST) break;
    }

    return dO;
  }

  // Calculate normal using gradient - small epsilon for smooth edges
  vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(
      getDistance(p + e.xyy) - getDistance(p - e.xyy),
      getDistance(p + e.yxy) - getDistance(p - e.yxy),
      getDistance(p + e.yyx) - getDistance(p - e.yyx)
    ));
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

    // Camera setup
    vec3 ro = vec3(0.0, 0.0, 3.5);
    vec3 rd = normalize(vec3(uv, -1.0));

    // Background gradient - light gray
    vec3 bgColor = mix(
      vec3(0.9, 0.9, 0.92),
      vec3(0.95, 0.95, 0.97),
      uv.y + 0.5
    );

    vec3 col = bgColor;

    float d = raymarch(ro, rd);

    if (d < MAX_DIST) {
      vec3 p = ro + rd * d;
      vec3 n = getNormal(p);

      // Single key light + fill
      vec3 lightDir = normalize(vec3(2.0, 3.0, 4.0));
      float diff = max(dot(n, lightDir), 0.0) * 0.7 + 0.35;

      // View direction for specular
      vec3 viewDir = normalize(ro - p);

      // Determine shell color
      int shellId = getShellId(p);
      vec3 baseColor;
      if (shellId == 0) {
        baseColor = vec3(0.95, 0.95, 0.97);  // White
      } else if (shellId == 1) {
        baseColor = vec3(0.3, 0.5, 0.9);     // Blue
      } else {
        baseColor = vec3(0.95, 0.85, 0.2);   // Yellow
      }

      col = baseColor * diff;

      // Simple specular highlight
      vec3 specDir = reflect(-lightDir, n);
      float spec = pow(max(dot(viewDir, specDir), 0.0), 32.0);
      col += spec * 0.4;

      // Fresnel rim lighting
      float fresnel = pow(1.0 - max(dot(viewDir, n), 0.0), 2.5);
      col += fresnel * 0.15;
    }

    // Tone mapping and gamma correction
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.8));

    gl_FragColor = vec4(col, 1.0);
  }
`

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  container.value.appendChild(renderer.domElement)

  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(
        container.value.clientWidth * Math.min(window.devicePixelRatio, 1.5),
        container.value.clientHeight * Math.min(window.devicePixelRatio, 1.5)
      )},
      uHoleRatio: { value: holeRatio.value },
      uHoleCount: { value: holeCount.value }
    }
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  window.addEventListener('resize', onResize)

  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  const elapsed = (Date.now() - startTime) / 1000
  mesh.material.uniforms.uTime.value = elapsed

  renderer.render(scene, camera)
}

const onResize = () => {
  if (!container.value) return
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  mesh.material.uniforms.uResolution.value.set(
    container.value.clientWidth * Math.min(window.devicePixelRatio, 1.5),
    container.value.clientHeight * Math.min(window.devicePixelRatio, 1.5)
  )
}

const cleanup = () => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
  if (renderer) {
    renderer.dispose()
    if (container.value && renderer.domElement) {
      container.value.removeChild(renderer.domElement)
    }
  }
}

onMounted(() => init())
onUnmounted(() => cleanup())
</script>

<style lang="scss" scoped>
.sdf-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  padding: 16px;
  border-radius: 8px;
  min-width: 180px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    color: white;
    font-size: 12px;
  }

  input[type="range"] {
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.2);
    appearance: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: white;
    }
  }
}

.threejs-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
