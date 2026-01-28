<template>
  <button v-if="innerNav && !uiStore.footerCtaVisible" class="nav-toggle" @click="isOpen = !isOpen">
    <div v-if="isOpen">Hide Navigation</div>
    <div v-else>Show Navigation</div>
    <svg v-if="!isOpen" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
      <path d="M17 19H41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M17 29H33" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M17 39H41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <svg v-else viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-icon">
      <path d="M21 21L37.9706 37.9706" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M37.9707 21L21.0001 37.9706" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </button>

  <nav :class="['learnthreejs', innerNav ? 'innerNav' : '', !isOpen ? 'hidden' : '']">
    <section :class="['threejs-nav', innerNav ? 'innerNav' : '', innerNav && !isOpen ? 'collapsed' : '']">
      <div :class="['nav-content', innerNav && !isOpen ? 'hidden' : '']">
      <h3>
        Foundational Three.js
      </h3>

      <ol type="I">
        <li>The 3D Web Revolution</li>
          <ol type="I">
            <li><nuxt-link to="/learn-threejs/foundational-threejs/why-threejs">Why Three.js?</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/foundational-threejs/setting-up-your-dev-environment">A modern dev environment</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/foundational-threejs/hello-cube">"Hello Cube"</nuxt-link></li>
          </ol>
        <li>Scene, Camera, Renderer</li>
          <ol type="I">
            <li><nuxt-link to="/learn-threejs/foundational-threejs/the-scene">The Scene</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/foundational-threejs/cameras">Cameras</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/foundational-threejs/the-renderer">The Renderer</nuxt-link></li>
          </ol>
        <li>The Scene Graph & Transformations</li>
          <ol type="I">
            <li>Understanding relationships</li>
            <li>Position, Rotation, and Scale</li>
            <li>The Animation Loop</li>
          </ol>
      </ol>

      <h3>
        The Building Blocks
      </h3>

      <ol type="I">
        <li>Geometry – The Shape of Things</li>
          <ol type="I">
            <li>BufferGeometry</li>
            <li>Standard primitives</li>
            <li>Custom geometries and vertices</li>
          </ol>
        <li>Materials & Textures</li>
          <ol type="I">
            <li>The spectrum of materials</li>
            <li>Physically Based Rendering</li>
            <li>Mapping</li>
          </ol>
        <li>Lighting the Scene</li>
          <ol type="I">
            <li>Types of Lighting</li>
            <li>Shadows</li>
            <li>Environment Maps</li>
          </ol>
      </ol>

      <h3>Working with Assets</h3>
        <ol type="I">
          <li>Loading 3D Models</li>
            <ol type="I">
              <li>Asset standards</li>
              <li>Using GLTFLoader</li>
              <li>Traversing models</li>
            </ol>
        </ol>

      <h3>Interaction & Raycasting</h3>
        <ol type="I">
          <li>Clicking on 3D objects</li>
          <li>Hover states and UI overlays</li>
          <li>Basic 3D physics integrations</li>
        </ol>

      <h3>Advanced Visuals</h3>
        <ol type="I">
          <li>Shaders – The Secret Sauce</li>
            <ol type="I">
              <li>Introduction to GLSL</li>
              <li>ShaderMaterial vs. RawShaderMaterial</li>
              <li>Prodedural Shaders</li>
            </ol>
          <li>Particles & Post-Processing</li>
            <ol type="I">
              <li>Using Points for stars, rain, and fire</li>
              <li>EffectComposer: Adding Bloom, Depth of Field, and Film Grain</li>
            </ol>
          <li>Performance & Optimization</li>
            <ol type="I">
              <li>Monitoring performance</li>
              <li>Draw calls, InstancedMesh, and Texture compression</li>
              <li>Preventing memory leaks</li>
            </ol>
        </ol>
      </div>
    </section>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useUIStore } from '~/store/ui'

const props = defineProps({
  innerNav: Boolean
})

const uiStore = useUIStore()

const isOpen = useState('learnthreejs-nav-open', () => true)

onMounted(() => {
  if (props.innerNav && window.innerWidth < 768) {
    isOpen.value = false
  }
})
</script>

<style lang="scss" scoped>

.dark {
  .learnthreejs {

    &.innerNav {
      background: rgba($black, 0.8);
      border-right: 1px solid rgba($white, 0.2);
    }

  }
}

.learnthreejs {

  &.innerNav {
    width: 300px;
    overflow: auto;
    height: 100vh;
    background: rgba($white, 0.8);
    backdrop-filter: blur(28px);
    z-index:2;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    border-right: 1px solid rgba($black, 0.2);
  }

  &.hidden {
    width: 0;
    overflow: hidden;
  }
}

.nav-toggle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-xxs;
  background: $black;
  border-radius: $br-sm;
  padding: $spacing-xs $spacing-sm;
  font-family: $font-family-main;
  font-size: $font-size-sm;
  cursor: pointer;
  margin-bottom: $spacing-xs;
  color: white;
  position: fixed;
  left: $spacing-sm;
  bottom: $spacing-xs;
  width: 250px;
  z-index: 3;

  .menu-icon,
  .close-icon {
    width: 20px;
    height: 20px;
  }
}

.threejs-nav {
  padding: $spacing-sm;
  margin: $spacing-lg 0;
  font-family: $font-family-main;

  h3 {

    &:first-of-type {
      margin-top: 0;
    }
  }

  .nav-toggle {
    display: none;
  }

  .nav-content.hidden {
    display: none;
  }

  &.innerNav {

    h3 {
      font-size: $font-size-md;
      padding-bottom: $spacing-xs;
      text-transform: uppercase;
      font-weight: bold;

      &:first-of-type {
        margin-top: 0;
      }
    }

    ol {
      font-size: $font-size-sm;
      opacity: 1;
      margin: $spacing-xs 0 $spacing-xs $spacing-sm;

      li {
        font-size: $font-size-sm;
        opacity: 1;

        a {
          text-decoration: none;
          width: 100%;
          border-radius: $br-xs;
        }

        ol {
          font-size: $font-size-sm;
          opacity: 1;
          margin: $spacing-sm 0 $spacing-sm $spacing-sm;

          li {
            font-size: $font-size-sm;
            opacity: 1;

            a {
              text-decoration: none;
              width: 100%;
              border-radius: $br-xs;
            }
          }
        }
      }
    }

    a.router-link-exact-active {
      font-weight: bold;
    }

  }
}

</style>