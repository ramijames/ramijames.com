<template>
  <main id="hero-for-the-zero">
    <section class="intro">
      <div>PRODUCTS,</div>
      <div>EXPERIENCES,</div>
      <div>& DESIGNS</div>
    </section>
    <section class="links">
      <Woosh />
      <nuxt-link to="/services/product-concept"><span class="number">01</span> <span class="title">Product concept</span></nuxt-link>
      <nuxt-link to="/services/ux-ui"><span class="number">02</span> <span class="title">UX & UI</span></nuxt-link>
      <nuxt-link to="/services/implementation"><span class="number">03</span> <span class="title">Implementation</span></nuxt-link>
    </section>
  </main>
</template>

<script>

import Woosh from './Woosh.vue'

export default {
  data(){
    return {
      title: 'Home'
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

<style scoped lang="scss">

@import './assets/variables';

#hero-for-the-zero {
  display:flex;
  flex-direction: row;
  background-color: $white;

  .intro {
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: $spacing-sm;
    width:50vw;
    height:100vh;
    padding: $spacing-lg;
    color: $black;
    font-size: $font-size-xxl;
    font-weight:bold;
    text-transform: uppercase;
  }

  .links {
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: $spacing-sm;
    width:50vw;
    height:100vh;
    padding: $spacing-lg;
    background-color: $blue;
    font-size: $font-size-xxl;
    font-weight:bold;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;

    a {
      text-decoration: none;
      color: $white;
      display:inline;

      span.number {
        margin-right: $spacing-md;
        opacity: 0.5;
      }

      span.title {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 3px;
          transition: width 0.3s;
        }
      }
    }
  }
}

#hero-for-the-zero a:hover span.title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: rgba($white, 0.5);
  transition: width 0.3s;
}

.dark #hero-for-the-zero {
  background-color: $black;

  .intro {
    color: $white;
  }
}

</style>