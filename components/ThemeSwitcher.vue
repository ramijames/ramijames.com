<template>
  <div class="theme-switcher-box" @click="toggleTheme">
    <div class="theme-switcher"
      :class="`${currentTheme}`"
    >
      <img :src="`${currentTheme}.svg`" alt="theme icon" />
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

  span {
    background: $white-dark;
    border-radius: $br-lg;
    padding: 4px $spacing-md 4px $spacing-xs;
    margin-right: -26px;
    font-size: 10px;
    font-weight: 500;
    color: rgba($black,0.4);
  }

  .theme-switcher {
    position: relative;
    width: 60px;
    border: 2px solid $black;
    border-radius: 30px;
    height: 32px;

    img {
      cursor: pointer;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin: 2px;
      position: absolute;
      transition: all 0.3s ease-in-out;
    }

    &.light img {
      left: 0;
    }

    &.dark img {
      left: 24px;
    }
  }
}

.dark .theme-switcher-box {

  .theme-switcher {
    border: 2px solid $white;
  }
}

</style>