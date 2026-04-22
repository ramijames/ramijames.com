<template>
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
      innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.body.classList.add('dark')}else{document.body.classList.add('light')}}catch(e){document.body.classList.add('light')}})()`,
      tagPosition: 'bodyOpen',
    },
    {
      src: 'https://cdn.sessionsight.com/sessionsight.js',
    },
    {
      innerHTML: `SessionSight.init({ publicApiKey: 'sessionsight_pub_8136f66932c17adbb135f49183dbdc493504cf8047dd5087', propertyId: 'd0d692b5-6f1a-4149-962d-45d5f5deaf77' });`,
    },
  ],
})
</script>