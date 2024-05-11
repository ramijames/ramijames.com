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
    <!-- <About />
    <Writing />
    <Products /> -->
  </main>
</template>

<script>

import { ref, reactive, watch, onMounted } from 'vue'
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