<template>
  <button v-if="innerNav" class="nav-toggle" @click="isOpen = !isOpen">
    <div v-if="isOpen">Hide Navigation</div>
    <div v-else>Show Navigation</div>
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
        <li>Scene, Camera, and Renderer</li>
          <ol type="I">
            <li><nuxt-link to="/learn-threejs/foundational-threejs/the-scene">The Scene</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/foundational-threejs/cameras">Cameras</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/foundational-threejs/the-renderer">The Renderer</nuxt-link></li>
          </ol>
        <li>The Scene Graph and Transformations</li>
          <ol type="I">
            <li><nuxt-link to="/learn-threejs/foundational-threejs/the-scene-graph">The Scene Graph</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/foundational-threejs/understanding-parent-child-relationships">Understanding relationships</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/foundational-threejs/position-rotation-and-scale">Position, Rotation, and Scale</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/foundational-threejs/the-animation-loop">The Animation Loop</nuxt-link></li>
          </ol>
      </ol>

      <h3>
        The Building Blocks
      </h3>

      <ol type="I">
        <li>Geometry</li>
          <ol type="I">
            <li><nuxt-link to="/learn-threejs/building-blocks/buffer-geometry">BufferGeometry</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/building-blocks/standard-primitives">Standard primitives</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/building-blocks/custom-geometries">Custom geometries and vertices</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/building-blocks/instanced-mesh">Instanced Mesh</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/building-blocks/procedural-terrain">Procedural terrain</nuxt-link></li>
          </ol>
        <li>Materials and Textures</li>
          <ol type="I">
            <li><nuxt-link to="/learn-threejs/building-blocks/the-spectrum-of-materials">The spectrum of materials</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/building-blocks/physically-based-rendering">Physically Based Rendering</nuxt-link></li>
            <li><nuxt-link to="/learn-threejs/building-blocks/advanced-mapping-concepts">Advanced Mapping Concepts</nuxt-link></li>
          </ol>
        <li>Lighting</li>
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
  justify-content: center;
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

  @media screen and (max-width: 768px) {
    width: 200px;
  }

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