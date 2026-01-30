<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { initialize: initHotjar } = useHotjar()

// Inline script that runs before paint to set the theme class on <body>.
// This prevents a flash of unstyled/wrong-themed content during hydration.
useHead({
  script: [
    {
      innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.body.classList.add('dark')}else{document.body.classList.add('light')}}catch(e){document.body.classList.add('light')}})()`,
      tagPosition: 'bodyOpen',
    },
  ],
})

onMounted(() => {
  initHotjar()
})

</script>