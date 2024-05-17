<!-- 
  Let's rethink what needs to be here

  When someone visits this site, my intention is for them to:
  - Understand what I can do for them
      - Import my product expertise into their project
      - Come in under budget and on-time
      - Deliver a high-quality product
      - Be a pleasure to work with
      = Fixed-cost means no surprises
      - Endless revisions until you're happy
      - One-stop shop for product definition, design, and development
      - Quick turnaround, no hassles
      - Effective designs that convert
      - Expertise in product strategy
  - Understand what my background is
  - Understand what I've written about
  - Be able to see my products

  I think the best way to do this is to have a hero section with a call to action, a section about me, a section about my writing, and a section about my products.

  --

  I want there to be some "wow factor". When they arrive to the site, I want it to be immediately clear that I am an advanced developer. I want them to be impressed by the design and the animations. I want them to feel like they are in the future.

-->

<template>
  <main>
    <Hero />
    <Showcase />
    <Whofor />
    <Blocks />
    <!-- <HowItWorks /> -->
    <!-- <AmazingWork /> -->
    <!-- <Booking /> -->
  </main>
</template>

<script>

import { ref, reactive, watch, onMounted } from 'vue'
import Hero from '/components/Hero.vue'
import Showcase from '/components/Showcase.vue'
import Whofor from '/components/Whofor.vue'
import Blocks from '/components/Blocks.vue'
// import HowItWorks from '/components/HowItWorks.vue'
// import AmazingWork from '/components/AmazingWork.vue'
// import Booking from '/components/Booking.vue'

export default {
  data(){
    return {
      title: 'Home'
    }
  },
  components: {
    Hero,
    // HowItWorks,
    // AmazingWork,
    // Booking,
    Showcase,
    Whofor,
    Blocks
  },
  setup() {
    return {
      
    }
  }
}


</script>