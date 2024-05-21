<template>
  <div class="theme-switcher-box">
    <div class="theme-switcher-sun"
      @click="toggleTheme"
      :class="`${currentTheme}`"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useThemeStore } from '~/store/theme';

export default {
  setup() {
    const themeStore = useThemeStore();

    function toggleTheme() {
      themeStore.toggleTheme();
    }

    onMounted(() => {
      watch(
        () => themeStore.currentTheme,
        (newTheme, oldTheme) => {
          if (typeof document !== 'undefined') {
            document.body.classList.remove(`${oldTheme}`);
            document.body.classList.add(`${newTheme}`);
          }
        },
        { immediate: true }
      );
    });

    return {
      toggleTheme,
      currentTheme: computed(() => themeStore.currentTheme)
    };
  },
};
</script>

<style scoped lang="scss">

@import './assets/variables';

.theme-switcher-box {
  right: $p-desktop;
  top: $p-desktop;
  z-index: 10000;
  position: fixed;
  padding: $spacing-md $spacing-md;
}

.dark .theme-switcher-box {

  &::after {
    background: rgba($blue, 0.8);

    @media screen and (max-width: 768px){
      background: rgba($white, 0.8);
    }
  }

  &::before {
    background: rgba($blue, 0.8);

    @media screen and (max-width: 768px){
      background: rgba($white, 0.8);
    }
  }
}

img {
  cursor: pointer;
  width: 40px;
  height: 40px;
}

.theme-switcher-sun { /* MOON */
  width:32px;
  height:32px;
  border-radius: 50%;
  box-shadow: 0 0 10px 0 rgba(yellow, 0.2);
  background-color: rgb(140, 228, 250);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  position: relative;
  outline: 2px solid rgba($blue, 0.1);
  outline-offset: 2px;

  &:after { /* MOON */
    content: '';
    position: absolute;
    top: -8px;
    right: -8px;
    width:32px;
    height:32px;
    background: linear-gradient(45deg, rgba($blue, 0.8), rgba($black, 0.2));
    transition: all 0.24s ease-in-out;
    border-radius: 50%;
    box-shadow: inset 0 0 12px rgb(140, 228, 250), 0 0 10px 0 rgba($white, 0.5);
  }

  &.light { /* SUN */
    outline: 2px solid rgba($blue, 0.8);
    outline-offset: -4px;
    box-shadow: 0 0 16px 0 rgba(yellow, 0.8);
    background-color: yellow;

    &:after { /* SUN */
      background: yellow;
      right: 0px;
      top:0;
      box-shadow: inset 0 0 8px rgba($white, 0.2);
    }
  }
}

</style>