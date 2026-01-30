<template>
  <button v-if="innerNav" class="nav-toggle" @click="isOpen = !isOpen">
    <div v-if="isOpen">Hide Navigation</div>
    <div v-else>Show Navigation</div>
  </button>

  <nav :class="['learnthreejs', innerNav ? 'innerNav' : '', !isOpen ? 'hidden' : '']">
    <section :class="['threejs-nav', innerNav ? 'innerNav' : '', innerNav && !isOpen ? 'collapsed' : '']">
      <div :class="['nav-content', innerNav && !isOpen ? 'hidden' : '']">

        <h3 :class="{ collapsible: innerNav, active: innerNav && activeSection === 'foundational-threejs' }" @click="innerNav && toggleSection('foundational-threejs')">Foundational Three.js</h3>

        <div :class="['section-links', { collapsed: innerNav && activeSection !== 'foundational-threejs' }]">
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
        </div>

        <h3 :class="{ collapsible: innerNav, active: innerNav && activeSection === 'building-blocks' }" @click="innerNav && toggleSection('building-blocks')">The Building Blocks</h3>

        <div :class="['section-links', { collapsed: innerNav && activeSection !== 'building-blocks' }]">
          <nuxt-link to="/learn-threejs/building-blocks/buffer-geometry"><Difficulty value="easy" /><span>BufferGeometry</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/standard-primitives"><Difficulty value="easy" /><span>Standard primitives</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/custom-geometries"><Difficulty value="easy" /><span>Custom geometries and vertices</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/instanced-mesh"><Difficulty value="easy" /><span>Instanced Mesh</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/procedural-terrain"><Difficulty value="easy" /><span>Procedural terrain</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/the-spectrum-of-materials"><Difficulty value="easy" /><span>The spectrum of materials</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/physically-based-rendering"><Difficulty value="easy" /><span>Physically Based Rendering</span></nuxt-link>
          <nuxt-link to="/learn-threejs/building-blocks/advanced-mapping-concepts"><Difficulty value="intermediate" /><span>Advanced Mapping Concepts</span></nuxt-link>
        </div>

        <h3 :class="{ collapsible: innerNav, active: innerNav && activeSection === 'lighting' }" @click="innerNav && toggleSection('lighting')">Lighting</h3>

        <div :class="['section-links', { collapsed: innerNav && activeSection !== 'lighting' }]">
          <nuxt-link to="/learn-threejs/lighting/types-of-lighting"><Difficulty value="intermediate" /><span>Types of Lighting</span></nuxt-link>
          <nuxt-link to="/learn-threejs/lighting/types-of-shadows"><Difficulty value="intermediate" /><span>Types of Shadows</span></nuxt-link>
          <nuxt-link to="/learn-threejs/lighting/transparency-in-shadows"><Difficulty value="intermediate" /><span>Transparency in Shadows</span></nuxt-link>
          <nuxt-link to="/learn-threejs/lighting/custom-shadow-materials"><Difficulty value="intermediate" /><span>Custom Shadow Materials</span></nuxt-link>
        </div>

          <!--
          <nuxt-link to="/learn-threejs/building-blocks/"><Difficulty value="intermediate" /><span>Environment Maps</span></nuxt-link>

        <h3>Working with Assets</h3>

          <nuxt-link to=""><Difficulty value="intermediate" /><span>Asset standards</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><span>Using GLTFLoader</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><span>Traversing models</span></nuxt-link>

      <h3>Interaction & Raycasting</h3>

          <nuxt-link to=""><Difficulty value="intermediate" /><span>Clicking on 3D objects</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><span>Hover states and UI overlays</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><span>Basic 3D physics integrations</span></nuxt-link>

      <h3>Advanced Visuals</h3>
          <nuxt-link to=""><Difficulty value="intermediate" /><span>Introduction to GLSL</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><span>ShaderMaterial vs. RawShaderMaterial</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><span>Prodedural Shaders</span></nuxt-link>

          <nuxt-link to=""><Difficulty value="intermediate" /><span>Using Points for stars, rain, and fire</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><span>EffectComposer: Adding Bloom, Depth of Field, and Film Grain</span></nuxt-link>

          <nuxt-link to=""><Difficulty value="intermediate" /><span>Monitoring performance</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><span>Draw calls, InstancedMesh, and Texture compression</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><span>Preventing memory leaks<</span>/nuxt-link>
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

const route = useRoute()
const uiStore = useUIStore()

const isOpen = useState('learnthreejs-nav-open', () => true)

const sectionFromRoute = (path: string): string => {
  const segments = path.split('/')
  // Route pattern: /learn-threejs/{section}/{article}
  if (segments.length >= 3) {
    return segments[2] // 'foundational-threejs', 'building-blocks', or 'lighting'
  }
  return ''
}

const activeSection = ref(sectionFromRoute(route.path))

const toggleSection = (section: string) => {
  activeSection.value = activeSection.value === section ? '' : section
}

watch(() => route.path, (newPath) => {
  activeSection.value = sectionFromRoute(newPath)
})

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

    border: 1px solid rgba($white, 0.1);

    a {
      color: $white;

      &.router-link-exact-active,
      &:hover {
        background: linear-gradient(to right, rgba($white, 0.1) 65%, rgba($white, 0.2));
        opacity: 1;
        font-weight: bold;
        color: $white;
      }
    }

    h3.collapsible {
      color: rgba($white, 0.5);

      &:hover,
      &.active {
        color: $white;
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
  padding: $spacing-md;
  margin: $spacing-lg 0;
  font-family: $font-family-main;
  border: 1px solid rgba($black, 0.1);
  border-radius: $br-sm;

  &.innerNav {
    border: none;
    padding: $spacing-sm;
  }

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


  h3 {
    font-size: $font-size-sm;
    padding-bottom: $spacing-xs;
    margin: $spacing-sm 0 $spacing-xs;
    line-height: 100%;

    &:first-of-type {
      margin-top: 0;
    }

    &.collapsible {
      cursor: pointer;
      user-select: none;
      color: rgba($black, 0.4);
      transition: color 0.2s ease;

      &:hover,
      &.active {
        color: $black;
      }
    }
  }

  .section-links {
    &.collapsed {
      display: none;
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
      background: linear-gradient(to right, rgba($black, 0.1) 65%, rgba($blue, 0.2));
      opacity: 1;
      font-weight: bold;
    }
  }

}

</style>