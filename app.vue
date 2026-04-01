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
      innerHTML: `SessionSight.init({ publicApiKey: 'sessionsight_pub_e99abaa0a5c1e53befa7452f318ee7c8328dd26447db3c59', propertyId: '62343e00-b9fd-49a0-b1f2-e2f68ea3984e' });`,
    },
  ],
})

onMounted(() => {
  initHotjar()
})



</script>