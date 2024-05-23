<template>
  <main>
    <Hero />
    <Projects />
    <Services />
    <GetToWork />
    <Booking />
    <Footer />
    <Arrow />
  </main>
</template>

<script>

import Hero from '/components/Hero.vue'
import Projects from '/components/Projects.vue'
import Services from '/components/Services.vue'
import GetToWork from '/components/GetToWork.vue'
import Booking from '/components/Booking.vue'
import Footer from '/components/Footer.vue'
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
    GetToWork,
    Booking,
    Footer,
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

@import './assets/variables';

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>