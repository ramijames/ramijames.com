<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { initialize: initHotjar } = useHotjar()

onMounted(() => {
  initHotjar()
})

</script>