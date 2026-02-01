<template>
  <button v-if="innerNav" class="nav-toggle" @click="isOpen = !isOpen">
    <div v-if="isOpen">Hide Navigation</div>
    <div v-else>Show Navigation</div>
  </button>

  <nav :class="['learnthreejs', innerNav ? 'innerNav' : '', !isOpen ? 'hidden' : '']">
    <section :class="['threejs-nav', innerNav ? 'innerNav' : '', innerNav && !isOpen ? 'collapsed' : '']">
      <div :class="['nav-content', innerNav && !isOpen ? 'hidden' : '']">

        <input
          v-model="searchQuery"
          type="text"
          class="nav-search"
          placeholder="Search"
        />

        <template v-for="section in filteredSections" :key="section.title">
          <h3>{{ section.title }}</h3>
          <div class="section-links">
            <nuxt-link v-for="link in section.links" :key="link.to" :to="link.to">
              <Difficulty :value="link.difficulty" /><span>{{ link.label }}</span>
            </nuxt-link>
          </div>
        </template>
      
          <!--

      <h3>Interaction & Raycasting</h3>

          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="easy" /><span>Clicking on 3D objects</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="easy" /><span>Hover states and UI overlays</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="easy" /><span>Basic 3D physics integrations</span></nuxt-link>

      <h3>Advanced Visuals</h3>
          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="advanced" /><span>Introduction to GLSL</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="advanced" /><span>ShaderMaterial vs. RawShaderMaterial</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="advanced" /><span>Prodedural Shaders</span></nuxt-link>

          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="advanced" /><span>Using Points for stars, rain, and fire</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="advanced" /><span>EffectComposer: Adding Bloom, Depth of Field, and Film Grain</span></nuxt-link>

          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="advanced" /><span>Monitoring performance</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="advanced" /><span>Draw calls, InstancedMesh, and Texture compression</span></nuxt-link>
          <nuxt-link to=""><Difficulty value="intermediate" /><Difficulty value="advanced" /><span>Preventing memory leaks<</span>/nuxt-link>
          -->
      </div>
    </section>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'

const props = defineProps({
  innerNav: Boolean
})

const isOpen = useState('learnthreejs-nav-open', () => true)
const searchQuery = ref('')

const sections = [
  {
    title: 'Foundational Three.js',
    links: [
      { to: '/learn-threejs/foundational-threejs/why-threejs', label: 'Why Three.js?', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/setting-up-your-dev-environment', label: 'A modern dev environment', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/hello-cube', label: '"Hello Cube"', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/the-scene', label: 'The Scene', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/cameras', label: 'Cameras', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/the-renderer', label: 'The Renderer', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/the-scene-graph', label: 'The Scene Graph', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/understanding-parent-child-relationships', label: 'Understanding relationships', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/position-rotation-and-scale', label: 'Position, Rotation, and Scale', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/the-animation-loop', label: 'The Animation Loop', difficulty: 'easy' },
    ]
  },
  {
    title: 'The Building Blocks',
    links: [
      { to: '/learn-threejs/building-blocks/buffer-geometry', label: 'BufferGeometry', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/standard-primitives', label: 'Standard primitives', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/custom-geometries', label: 'Custom geometries and vertices', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/instanced-mesh', label: 'Instanced Mesh', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/procedural-terrain', label: 'Procedural terrain', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/the-spectrum-of-materials', label: 'The spectrum of materials', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/physically-based-rendering', label: 'Physically Based Rendering', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/advanced-mapping-concepts', label: 'Advanced Mapping Concepts', difficulty: 'intermediate' },
    ]
  },
  {
    title: 'Lighting',
    links: [
      { to: '/learn-threejs/lighting/types-of-lighting', label: 'Types of Lighting', difficulty: 'intermediate' },
      { to: '/learn-threejs/lighting/types-of-shadows', label: 'Types of Shadows', difficulty: 'intermediate' },
      { to: '/learn-threejs/lighting/transparency-in-shadows', label: 'Transparency in Shadows', difficulty: 'intermediate' },
      { to: '/learn-threejs/lighting/custom-shadow-materials', label: 'Custom Shadow Materials', difficulty: 'intermediate' },
      { to: '/learn-threejs/lighting/environment-maps', label: 'Environment Maps', difficulty: 'intermediate' },
    ]
  },
  {
    title: 'Working with Assets',
    links: [
      { to: '/learn-threejs/assets/asset-standards', label: 'Asset standards', difficulty: 'easy' },
      { to: '/learn-threejs/assets/loading-assets', label: 'Loading assets', difficulty: 'intermediate' },
      { to: '/learn-threejs/assets/working-with-loaded-models', label: 'Working with loaded models', difficulty: 'intermediate' },
      { to: '/learn-threejs/assets/common-loading-errors', label: 'Common loading errors', difficulty: 'intermediate' },
      { to: '/learn-threejs/assets/traversing-loaded-models', label: 'Traversing loaded models', difficulty: 'intermediate' },
    ]
  },
  {
    title: 'Interaction',
    links: [
      { to: '/learn-threejs/interaction/raycasting-and-mouse-events', label: 'Raycasting and Mouse Events', difficulty: 'intermediate' },
      { to: '/learn-threejs/interaction/interaction-managers-and-libraries', label: 'Interaction Managers and Libraries', difficulty: 'intermediate' },
      { to: '/learn-threejs/interaction/drag-drop-and-transform', label: 'Drag, Drop, and Transform', difficulty: 'intermediate' },
    ]
  }
]

const filteredSections = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return sections

  return sections
    .map(section => ({
      ...section,
      links: section.links.filter(link => link.label.toLowerCase().includes(query))
    }))
    .filter(section => section.links.length > 0)
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

.nav-search {
  width: 100%;
  padding: $spacing-xs $spacing-sm;
  margin-bottom: $spacing-sm;
  border: 1px solid rgba($black, 0.2);
  border-radius: $br-sm;
  font-family: $font-family-main;
  font-size: $font-size-sm;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: rgba($black, 0.4);
  }

  .dark & {
    background: rgba($white, 0.1);
    border-color: rgba($white, 0.2);
    color: $white;

    &:focus {
      border-color: rgba($white, 0.4);
    }
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

  .nav-content {
   
    input {
      width: 100%;
      padding: $spacing-xs $spacing-sm;

      &:focus {
        border-color: rgba($black, 0.4);
      }
    }
    
    &.hidden {
      display: none;
    }
  }


  h3 {
    font-size: $font-size-sm;
    padding-bottom: $spacing-xs;
    margin: $spacing-sm 0 $spacing-xs;
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
      background: linear-gradient(to right, rgba($black, 0.1) 65%, rgba($blue, 0.2));
      opacity: 1;
      font-weight: bold;
    }
  }

}

</style>