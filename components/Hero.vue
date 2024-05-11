<template>
  <main class="hero-for-the-zero">
    <section class=""></section>
    <Woosh :numberOfElements="numberOfElements" :size="40" color="#ff9900" :borderWidth="100" animationStyle="defaultWoosh" />
    <section class="animPanel">
      <!-- A panel to control the props that are input into the Woosh component -->
      <label for="numberOfElements">Number of Elements</label>
      <input type="number" id="numberOfElements" name="numberOfElements" min="1" max="100" v-model="numberOfElements" />
      <!-- <label for="size">Size</label> -->
      <!-- <input type="range" id="size" name="size" min="1" max="100" v-model="size" />
      <label for="color">Color</label>
      <input type="color" id="color" name="color" v-model="color" />
      <label for="borderWidth">Border Width</label>
      <input type="range" id="borderWidth" name="borderWidth" min="1" max="100" v-model="borderWidth" />
      <label for="animationStyle">Animation Style</label>
      <input type="text" id="animationStyle" name="animationStyle" v-model="animationStyle" /> -->
    </section>
  </main>
  <section class="services-sell">
    other stuff
  </section>
</template>

<script>

import Woosh from './Woosh.vue'

export default {
  data(){
    return {
      title: 'Home',
      numberOfElements: 10,
      size: 40,
      color: '#ff9900',
      borderWidth: 10,
      animationStyle: 'defaultWoosh'
    }
  },
  setup() {
    
    
    return {
      
    }
  },
  components: {
    Woosh
  }
}

</script>

<style scoped>

.hero-for-the-zero {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:hidden;
}



    .animPanel {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      background-color: rgba(89, 48, 103, 0.1);
      backdrop-filter: blur(5px);
      padding: 20px;
      border: 1px solid rgba(255, 255, 255, 0.371);
      border-radius:.3rem;
      z-index: 1000;
      box-shadow: 0 18px 32px 0 rgba(25, 27, 50, 0.164);
    }

.services-sell {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

</style>