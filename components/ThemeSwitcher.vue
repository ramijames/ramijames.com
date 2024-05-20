<template>
  <img
    class="theme-switcher"
    @click="toggleTheme"
    :src="`/${currentTheme}.svg`"
    :alt="`${currentTheme} theme`"
    width="40"
    :class="{ clicked: isClicked }"
  />
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

<style scoped>

.theme-switcher {
  z-index: 1;
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