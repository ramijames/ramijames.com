<template>
  <lenis id="default" :options="LenisOptions" :onScroll="handleScroll">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </lenis>
</template>

<script setup lang="ts">
const route = useRoute()
const { getLenis } = useLenis()
const { initialize: initHotjar } = useHotjar()

onMounted(() => {
  initHotjar()
})

const LenisOptions = {
  smooth: true,
  duration: 1.2,
  autoRaf: true,
  direction: 'vertical'
}

const handleScroll = (data: any) => {
  // console.log("Scroll detected:", data);
}

// Scroll to top on route change
watch(() => route.fullPath, (newPath, oldPath) => {
  // Don't scroll if only the hash changed on the same page
  if (newPath.split('#')[0] === oldPath?.split('#')[0] && newPath.includes('#')) {
    return
  }

  nextTick(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  })
})
</script>