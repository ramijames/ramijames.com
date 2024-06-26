<template>
  <div class="theme-switcher-box" @click="toggleTheme">
    <div class="theme-switcher-sun"
      :class="`${currentTheme}`"
    >
    </div>
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
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  transform: scale(0.8);
  mix-blend-mode: luminosity;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1);
    mix-blend-mode: initial;
  }

  @media screen and (max-width: 768px){
    right: 0;
    top: 0;
  }

  span {
    background: $white-dark;
    border-radius: $br-lg;
    padding: 4px $spacing-md 4px $spacing-xs;
    margin-right: -26px;
    font-size: 10px;
    font-weight: 500;
    color: rgba($black,0.4);
  }
}

.dark .theme-switcher-box {

  span {
    background: $black-light;
    color: rgba($white,0.4);
  }

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
  width: 32px;
  height: 32px;
}

.theme-switcher-sun { /* MOON */
  width:32px;
  height:32px;
  border-radius: 50%;
  background-color: rgb(140, 228, 250);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  position: relative;
  outline: 2px solid rgba($black, 0.4);
  outline-offset: 2px;
  margin: 4px 0;

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
    box-shadow: inset 0 0 12px rgba($blue, 0.4), 0 0 10px 0 rgba($white, 0.5);
  }

  &.light { /* SUN */
    outline: 2px solid rgba($orange, 0.4);
    border: 2px solid rgba($orange, 1);

    &:after { /* SUN */
      background: $orange-light;
      right: 0px;
      top:0;
      box-shadow: inset 0 0 8px rgba($orange-dark, 0.2);
    }
  }
}

</style>