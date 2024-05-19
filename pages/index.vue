<template>
  <main>
    <Hero />
  </main>
</template>

<script>

import Hero from '/components/Hero.vue'

export default {
  data(){
    return {
      title: 'Home'
    }
  },
  components: {
    Hero
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width:100vw;
  }

</style>