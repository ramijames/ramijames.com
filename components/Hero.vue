<template>
  <main id="hero-for-the-zero">
    <section class="intro">
      <Woosh />
      <div class="small">I create</div>
      <div>PRODUCTS,</div>
      <div>EXPERIENCES,</div>
      <div>& <span class="designs">DESIGNS</span></div>
    </section>
    <section class="links">
      <div class="small">With these services</div>
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

  @media screen and (max-width: 768px){
    flex-direction: column;
  }

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
    z-index: 2;

    @media screen and (max-width: 768px){
      width:100vw;
      height:45vh;
      font-size: 6dvw;
      margin-top:10vh;
    }

    .small {
      font-size: $font-size-md;
      color: $gray-md;
    }

    .designs {
      font-style: italic;
      font-weight: 900;
      color: $blue;
      padding: 0 0.5rem;
    }
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

    @media screen and (max-width: 768px){
      width:100vw;
      height:45vh;
      font-size: 6dvw;
    }

    .small {
      font-size: $font-size-md;
      color: rgba($white, 0.5);
    }

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

        &::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          transition: all 0.3s ease-in-out;
          background-color: rgba($white, 0.3);
        }

        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
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
  background-color: rgba($white, 1);
  width:100%;
}

.dark #hero-for-the-zero {
  background-color: $black;

  .intro {
    color: $white;
  }

  .designs {
    color: $blue-light;
  }
}

</style>