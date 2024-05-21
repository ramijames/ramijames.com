<template>
  <main>
    <Hero />
    <Map />
    <Projects />
    <Services />
    <Arrow />
  </main>
</template>

<script>

import Hero from '/components/Hero.vue'
import Projects from '/components/Projects.vue'
import Services from '/components/Services.vue'
import Arrow from '/components/Arrow.vue'
import Map from '/components/Map.vue'

export default {
  data(){
    return {
      title: 'Home'
    }
  },
  components: {
    Hero,
    Projects,
    Services,
    Arrow,
    Map
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