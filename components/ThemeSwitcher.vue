<template>
  <div class="theme-switcher-box">
    <img
      class="theme-switcher"
      @click="toggleTheme"
      :src="`/${currentTheme}.svg`"
      :alt="`${currentTheme} theme`"
      width="40"
      :class="{ clicked: isClicked }"
    />
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useThemeStore } from '~/store/theme';

export default {
  setup() {
    const themeStore = useThemeStore();
    const isClicked = ref(false);

    function toggleTheme() {
      themeStore.toggleTheme();
      isClicked.value = true;
      setTimeout(() => {
        isClicked.value = false;
      }, 350); // length of the animation
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
      currentTheme: computed(() => themeStore.currentTheme),
      isClicked
    };
  },
};
</script>

<style scoped lang="scss">

@import './assets/variables';

.theme-switcher-box {
  right: calc($spacing-lg - $spacing-xs * 2);
  top: calc($spacing-lg - $spacing-xs * 2);
  z-index: 10000;
  // backdrop-filter: blur(8px);
  // background: rgba($black, 0.8);
  border-right: 2px solid rgba($blue, 0.8);
  border-top: 2px solid rgba($blue, 0.8);
  position: fixed;
  padding: $spacing-sm $spacing-sm;
}

.theme-switcher {

}

img {
  cursor: pointer;
  width: 40px;
  height: 40px;
}

.clicked {
  animation: spin 0.35s linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>