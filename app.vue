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
    {
      src: 'https://cdn.sessionsight.com/sessionsight.js',
    },
    {
      innerHTML: `SessionSight.init({ publicApiKey: 'sessionsight_pub_dev_000000000000000000000000000000000000000000000000', propertyId: '8acad566-6851-4a52-a4d5-fd8850decb86' });`,
    },
  ],
})

onMounted(() => {
  initHotjar()
})



</script>