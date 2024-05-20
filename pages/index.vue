<template>
  <main>
    <Hero />
    <Projects />
  </main>
</template>

<script>

import Hero from '/components/Hero.vue'
import Projects from '/components/Projects.vue'

export default {
  data(){
    return {
      title: 'Home'
    }
  },
  components: {
    Hero,
    Projects
  },
  setup() {
    return {
      
    }
  }
}

</script>

<style scoped lang="scss">
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

</style>