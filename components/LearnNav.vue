<template>

  <button v-if="innerNav && !isOpen" class="nav-toggle-show button small white" @click="isOpen = true">Show nav</button>

  <nav :class="['learnthreejs', innerNav ? 'innerNav' : '', !isOpen ? 'hidden' : '']">

    <section class="nav-widget">
      <button v-if="innerNav && isOpen" class="nav-toggle button small" @click="isOpen = !isOpen">
        Hide
      </button>

      <input
        v-model="searchQuery"
        type="text"
        class="nav-search"
        placeholder="Search"
      />
    </section>

    <section :class="['threejs-nav', innerNav ? 'innerNav' : '', innerNav && !isOpen ? 'collapsed' : '']">
      <div :class="['nav-content', innerNav && !isOpen ? 'hidden' : '']">

        <template v-for="section in filteredSections" :key="section.title">
          <h3>{{ section.title }}</h3>
          <div class="section-links">
            <nuxt-link v-for="link in section.links" :key="link.to" :to="link.to">
              <Difficulty :value="link.difficulty" /><span>{{ link.label }}</span>
            </nuxt-link>
          </div>
        </template>

      </div>
    </section>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'

const props = defineProps({
  innerNav: Boolean,
  sections: {
    type: Array as () => Array<{ title: string; links: Array<{ to: string; label: string; difficulty: string }> }>,
    required: true
  },
  stateKey: {
    type: String,
    default: 'learn-nav-open'
  }
})

const isOpen = useState(props.stateKey, () => true)
const searchQuery = ref('')

const filteredSections = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return props.sections

  return props.sections
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
    background: rgba($white, 0.8);
    backdrop-filter: blur(28px);
    z-index:2;
    position: fixed;
    left: 0;
    top: 62px;
    bottom: 0;
    border-right: 1px solid rgba($black, 0.2);

    @media screen and (max-width: 768px) {
      top: 58px;
    }
  }

  &.hidden {
    width: 0;
    overflow: hidden;
  }
}

.nav-widget {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-xs;
  z-index: 2;
  backdrop-filter: blur(28px);
  gap: $spacing-xs;

}

.nav-toggle-show {
  position: fixed;
  top: calc($spacing-xs + 62px);
  left: $spacing-xs;
  height: 34px;
  z-index: 2;

}


.nav-toggle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: $spacing-xxs;
  cursor: pointer;
  height: 34px;

  .menu-icon,
  .close-icon {
    width: 20px;
    height: 20px;
  }
}

.nav-search {
  width: 100%;
  padding: $spacing-xs $spacing-sm;
  border: 1px solid rgba($black, 0.2);
  border-radius: $br-sm;
  font-family: $font-family-main;
  font-size: $font-size-sm;
  outline: none;
  box-sizing: border-box;
  height: 34px;

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
  font-family: $font-family-main;
  border: 1px solid rgba($black, 0.1);
  border-radius: $br-sm;
  overflow-y: auto;
  height: calc(100% - 52px);

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
    font-family: $font-family-secondary;
    display: block;
    text-decoration: none;
    padding: 5px $spacing-xs;
    border-radius: $br-sm;
    color: $black;
    opacity: 0.6;
    display: flex;
    flex-direction: row;
    gap: $spacing-xs;
    align-content: center;
    margin-bottom: 1px;
    transition: all 0.26s ease-in-out;

    span {
      align-self: center;
    }

    &.router-link-exact-active,
    &:hover {
      background: linear-gradient(to right, rgba($black, 0.1) 65%, rgba($blue, 0.2));
      opacity: 1;
    }
  }

}

</style>
