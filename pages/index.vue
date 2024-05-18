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