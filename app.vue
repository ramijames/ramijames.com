<template>
  <Loader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Inline script that runs before paint to set the theme class on <body>.
// This prevents a flash of unstyled/wrong-themed content during hydration.
useHead({
  script: [
    {
      innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.body.classList.add('light')}else{document.body.classList.add('dark')}}catch(e){document.body.classList.add('dark')}})()`,
      tagPosition: 'bodyOpen',
    },
  ],
})
</script>