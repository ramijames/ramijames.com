<template>
  <main>
    <Hero />
    <Projects />
    <Booking />
    <Services />
    <TypesOfDesigns />
    <!-- <GetToWork /> -->
    <CommonQuestions />
    <Footer />
    <Arrow />
  </main>
</template>

<script>

import Hero from '/components/Hero.vue'
import Projects from '/components/Projects.vue'
import Services from '/components/Services.vue'
import TypesOfDesigns from '/components/TypesOfDesigns.vue'
import GetToWork from '/components/GetToWork.vue'
import CommonQuestions from '/components/CommonQuestions.vue'
import Booking from '/components/Booking.vue'
import Footer from '/components/Footer.vue'
import Arrow from '/components/Arrow.vue'

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
    TypesOfDesigns,
    GetToWork,
    CommonQuestions,
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