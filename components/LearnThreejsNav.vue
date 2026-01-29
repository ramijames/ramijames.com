<template>
  <button v-if="innerNav" class="nav-toggle" @click="isOpen = !isOpen">
    <div v-if="isOpen">Hide Navigation</div>
    <div v-else>Show Navigation</div>
  </button>

  <nav :class="['learnthreejs', innerNav ? 'innerNav' : '', !isOpen ? 'hidden' : '']">
    <section :class="['threejs-nav', innerNav ? 'innerNav' : '', innerNav && !isOpen ? 'collapsed' : '']">
      <div :class="['nav-content', innerNav && !isOpen ? 'hidden' : '']">
      
        <h3>Foundational Three.js</h3>

          <!-- <h4>The 3D Web Revolution</h4> -->
          <nuxt-link to="/learn-threejs/foundational-threejs/why-threejs"><Difficulty value="easy" /><span>Why Three.js?</span></nuxt-link>
          <nuxt-link to="/learn-threejs/foundational-threejs/setting-up-your-dev-environment"><Difficulty value="easy" /><span>A modern dev environment</span></nuxt-link>
          <nuxt-link to="/learn-threejs/foundational-threejs/hello-cube"><Difficulty value="easy" /><span>"Hello Cube"</span></nuxt-link>
          <nuxt-link to="/learn-threejs/foundational-threejs/the-scene"><Difficulty value="easy" /><span>The Scene</span></nuxt-link>
          <nuxt-link to="/learn-threejs/foundational-threejs/cameras"><Difficulty value="easy" /><span>Cameras</span></nuxt-link>
          <nuxt-link to="/learn-threejs/foundational-threejs/the-renderer"><Difficulty value="easy" /><span>The Renderer</span></nuxt-link>
          <nuxt-link to="/learn-threejs/foundational-threejs/the-scene-graph"><Difficulty value="easy" /><span>The Scene Graph</span></nuxt-link>
          <nuxt-link to="/learn-threejs/foundational-threejs/understanding-parent-child-relationships"><Difficulty value="easy" /><span>Understanding relationships</span></nuxt-link>
          <nuxt-link to="/learn-threejs/foundational-threejs/position-rotation-and-scale"><Difficulty value="easy" /><span>Position, Rotation, and Scale</span></nuxt-link>
          <nuxt-link to="/learn-threejs/foundational-threejs/the-animation-loop"><Difficulty value="easy" /><span>The Animation Loop</span></nuxt-link>

        <h3>The Building Blocks</h3>

          <nuxt-link to="/learn-threejs/building-blocks/buffer-geometry"><Difficulty value="easy" /><span>BufferGeometry</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/standard-primitives"><Difficulty value="easy" /><span>Standard primitives</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/custom-geometries"><Difficulty value="easy" /><span>Custom geometries and vertices</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/instanced-mesh"><Difficulty value="easy" /><span>Instanced Mesh</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/procedural-terrain"><Difficulty value="easy" /><span>Procedural terrain</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/the-spectrum-of-materials"><Difficulty value="easy" /><span>The spectrum of materials</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/physically-based-rendering"><Difficulty value="easy" /><span>Physically Based Rendering</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/advanced-mapping-concepts"><Difficulty value="intermediate" /><span>Advanced Mapping Concepts</span></nuxt-link>
          <!-- 
          <nuxt-link to="">Types of Lighting</nuxt-link>
          <nuxt-link to="">Shadows</nuxt-link>
          <nuxt-link to="">Environment Maps</nuxt-link>

        <h3>Working with Assets</h3>

          <nuxt-link to="">Asset standards</nuxt-link>
          <nuxt-link to="">Using GLTFLoader</nuxt-link>
          <nuxt-link to="">Traversing models</nuxt-link>

      <h3>Interaction & Raycasting</h3>

          <nuxt-link to="">Clicking on 3D objects</nuxt-link>
          <nuxt-link to="">Hover states and UI overlays</nuxt-link>
          <nuxt-link to="">Basic 3D physics integrations</nuxt-link>

      <h3>Advanced Visuals</h3>
          <nuxt-link to="">Introduction to GLSL</nuxt-link>
          <nuxt-link to="">ShaderMaterial vs. RawShaderMaterial</nuxt-link>
          <nuxt-link to="">Prodedural Shaders</nuxt-link>

          <nuxt-link to="">Using Points for stars, rain, and fire</nuxt-link>
          <nuxt-link to="">EffectComposer: Adding Bloom, Depth of Field, and Film Grain</nuxt-link>

          <nuxt-link to="">Monitoring performance</nuxt-link>
          <nuxt-link to="">Draw calls, InstancedMesh, and Texture compression</nuxt-link>
          <nuxt-link to="">Preventing memory leaks</nuxt-link> 
          -->
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

  .threejs-nav {
    &.innerNav {

      a {
        color: $white;
        
        &.router-link-exact-active,
        &:hover {
          background: rgba($white, 0.1);
          opacity: 1;
          font-weight: bold;
          color: $white;
        }
      }

    }
  }
}

.learnthreejs {

  &.innerNav {
    width: 400px;
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
  border: 1px solid rgba($white, 0.2);
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
      font-size: calc($font-size-md * 1.2);
      padding-bottom: $spacing-xs;
      margin: $spacing-md 0 $spacing-xs;
      line-height: 100%;

      &:first-of-type {
        margin-top: 0;
      }
    }

    a {
      font-size: $font-size-sm;
      display: block;
      text-decoration: none;
      padding: $spacing-xxs $spacing-sm;
      border-radius: $br-sm;
      color: $black;
      opacity: 0.6;
      display: flex;
      flex-direction: row;
      gap: $spacing-sm;
      align-content: center;
      margin-bottom: 1px;

      span {
        align-self: center;
      }
      
      &.router-link-exact-active,
      &:hover {
        background: rgba($black, 0.1);
        opacity: 1;
        font-weight: bold;
      }
    }

  }
}

</style>