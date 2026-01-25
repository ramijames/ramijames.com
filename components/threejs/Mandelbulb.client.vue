<template>
  <div class="fractal-wrapper">
    <div class="controls">
      <div class="control-group">
        <label>Power: {{ power.toFixed(1) }}</label>
        <input type="range" v-model.number="power" min="2" max="12" step="0.1" @input="updateUniforms" />
      </div>
      <div class="control-group">
        <label>Distance: {{ orbitRadius.toFixed(1) }}</label>
        <input type="range" v-model.number="orbitRadius" min="1.5" max="5" step="0.1" @input="updateUniforms" />
      </div>
      <div class="control-group">
        <label>Speed: {{ (rotationSpeed * 10).toFixed(1) }}</label>
        <input type="range" v-model.number="rotationSpeed" min="0" max="0.5" step="0.01" @input="updateUniforms" />
      </div>
      <div class="control-group">
        <label>Saturation: {{ saturation.toFixed(2) }}</label>
        <input type="range" v-model.number="saturation" min="0" max="1" step="0.01" @input="updateUniforms" />
      </div>
      <div class="control-group">
        <label>Color Shift: {{ colorShift.toFixed(2) }}</label>
        <input type="range" v-model.number="colorShift" min="0" max="1" step="0.01" @input="updateUniforms" />
      </div>
      <button class="randomize-btn" @click="randomize">Randomize</button>
    </div>
    <div ref="container" class="threejs-container" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let renderer, scene, camera, mesh
let animationId = null
let startTime = Date.now()

// Reactive control values
const power = ref(8.0)
const orbitRadius = ref(2.5)
const rotationSpeed = ref(0.1)
const saturation = ref(0.75)
const colorShift = ref(0.0)

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
  uniform float uPower;
  uniform float uOrbitRadius;
  uniform float uRotationSpeed;
  uniform float uSaturation;
  uniform float uColorShift;

  const int MAX_STEPS = 100;
  const float MAX_DIST = 10.0;
  const float SURF_DIST = 0.001;
  const int FRACTAL_ITERATIONS = 12;

  // Mandelbulb distance estimator
  vec2 mandelbulb(vec3 pos, float power) {
    vec3 z = pos;
    float dr = 1.0;
    float r = 0.0;
    float iterations = 0.0;

    for (int i = 0; i < FRACTAL_ITERATIONS; i++) {
      r = length(z);
      if (r > 2.0) break;

      float theta = acos(z.z / r);
      float phi = atan(z.y, z.x);

      dr = pow(r, power - 1.0) * power * dr + 1.0;

      float zr = pow(r, power);
      theta = theta * power;
      phi = phi * power;

      z = zr * vec3(
        sin(theta) * cos(phi),
        sin(theta) * sin(phi),
        cos(theta)
      );
      z += pos;

      iterations += 1.0;
    }

    float dist = 0.5 * log(r) * r / dr;
    return vec2(dist, iterations);
  }

  vec3 raymarch(vec3 ro, vec3 rd, float power) {
    float dO = 0.0;
    float iterations = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
      vec3 p = ro + rd * dO;
      vec2 result = mandelbulb(p, power);
      float dS = result.x;
      iterations = result.y;
      dO += dS;
      if (dO > MAX_DIST || dS < SURF_DIST) break;
    }

    return vec3(dO, iterations, dO < MAX_DIST ? 1.0 : 0.0);
  }

  vec3 getNormal(vec3 p, float power) {
    float d = mandelbulb(p, power).x;
    vec2 e = vec2(0.001, 0.0);
    vec3 n = d - vec3(
      mandelbulb(p - e.xyy, power).x,
      mandelbulb(p - e.yxy, power).x,
      mandelbulb(p - e.yyx, power).x
    );
    return normalize(n);
  }

  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

    float t = uTime * uRotationSpeed;

    float orbitAngle = t * 0.3;
    float orbitTilt = 0.3 + sin(t * 0.15) * 0.2;

    vec3 ro = vec3(
      sin(orbitAngle) * cos(orbitTilt) * uOrbitRadius,
      sin(orbitTilt) * uOrbitRadius,
      cos(orbitAngle) * cos(orbitTilt) * uOrbitRadius
    );

    vec3 lookTarget = vec3(0.0, 0.0, 0.0);
    vec3 forward = normalize(lookTarget - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
    vec3 up = cross(forward, right);

    vec3 rd = normalize(forward + uv.x * right + uv.y * up);

    vec3 result = raymarch(ro, rd, uPower);
    float dist = result.x;
    float iterations = result.y;
    float hit = result.z;

    vec3 col = vec3(0.02, 0.02, 0.03);

    if (hit > 0.5) {
      vec3 p = ro + rd * dist;
      vec3 n = getNormal(p, uPower);

      vec3 light1 = normalize(vec3(1.0, 1.0, 0.5));
      vec3 light2 = normalize(vec3(-0.5, 0.3, -1.0));
      vec3 light3 = normalize(ro);

      float diff1 = max(dot(n, light1), 0.0);
      float diff2 = max(dot(n, light2), 0.0) * 0.5;
      float diff3 = max(dot(n, light3), 0.0) * 0.3;
      float diff = diff1 + diff2 + diff3;

      vec3 viewDir = normalize(ro - p);
      vec3 reflectDir = reflect(-light1, n);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

      float hue = iterations / float(FRACTAL_ITERATIONS);
      hue += p.x * 0.3 + p.y * 0.2 + p.z * 0.25;
      hue += sin(length(p) * 10.0) * 0.1;
      hue += uColorShift;
      hue = fract(hue);

      float sat = uSaturation + iterations / float(FRACTAL_ITERATIONS) * 0.2;
      float lum = 0.35 + diff * 0.35;

      col = hsl2rgb(vec3(hue, sat, lum));
      col += spec * 0.4;

      float rim = 1.0 - max(dot(viewDir, n), 0.0);
      rim = pow(rim, 2.5);
      vec3 rimColor = hsl2rgb(vec3(fract(hue + 0.4), 0.9, 0.6));
      col += rim * 0.4 * rimColor;

      float ao = 1.0 - (iterations / float(FRACTAL_ITERATIONS)) * 0.4;
      col *= ao;
    }

    float vignette = 1.0 - length(uv) * 0.4;
    col *= vignette;

    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
  }
`

const updateUniforms = () => {
  if (!mesh) return
  mesh.material.uniforms.uPower.value = power.value
  mesh.material.uniforms.uOrbitRadius.value = orbitRadius.value
  mesh.material.uniforms.uRotationSpeed.value = rotationSpeed.value
  mesh.material.uniforms.uSaturation.value = saturation.value
  mesh.material.uniforms.uColorShift.value = colorShift.value
}

const randomize = () => {
  power.value = 2 + Math.random() * 10
  orbitRadius.value = 1.5 + Math.random() * 3.5
  rotationSpeed.value = Math.random() * 0.5
  saturation.value = Math.random()
  colorShift.value = Math.random()
  updateUniforms()
}

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  container.value.appendChild(renderer.domElement)

  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(
        container.value.clientWidth * Math.min(window.devicePixelRatio, 2),
        container.value.clientHeight * Math.min(window.devicePixelRatio, 2)
      )},
      uPower: { value: power.value },
      uOrbitRadius: { value: orbitRadius.value },
      uRotationSpeed: { value: rotationSpeed.value },
      uSaturation: { value: saturation.value },
      uColorShift: { value: colorShift.value }
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
    container.value.clientWidth * Math.min(window.devicePixelRatio, 2),
    container.value.clientHeight * Math.min(window.devicePixelRatio, 2)
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
.fractal-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(0, 0, 0, 0.8);
  padding: 16px;
  border-radius: 8px;
  min-width: 200px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    color: white;
    font-size: 12px;
    opacity: 0.8;
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
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: white;
      border: none;
      cursor: pointer;
    }
  }
}

.randomize-btn {
  margin-top: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }
}

.threejs-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  cursor: crosshair;
}
</style>
