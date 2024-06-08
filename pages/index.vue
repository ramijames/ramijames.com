<template>
  <main>
    <Hero />
    <a name="recentwork"></a>
    <HeroProjects />
    <ProductFirst />
    <!-- <Booking /> -->
    <a name="methodology"></a>
    <Services />
    <TypesOfDesigns />
    <!-- <GetToWork /> -->
    <CommonQuestions />
    <Footer />
    <AfterLinks />
  </main>
</template>

<script>

import Hero from '/components/Hero.vue'
import HeroProjects from '/components/HeroProjects.vue'
import ProductFirst from '/components/ProductFirst.vue'
import Services from '/components/Services.vue'
import TypesOfDesigns from '/components/TypesOfDesigns.vue'
import GetToWork from '/components/GetToWork.vue'
import CommonQuestions from '/components/CommonQuestions.vue'
import Booking from '/components/Booking.vue'
import Footer from '/components/Footer.vue'
import AfterLinks from '/components/AfterLinks.vue'

export default {
  data(){
    return {
      title: 'Home'
    }
  },
  components: {
    Hero,
    HeroProjects,
    ProductFirst,
    Services,
    TypesOfDesigns,
    GetToWork,
    CommonQuestions,
    Booking,
    Footer,
    Map,
    AfterLinks
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