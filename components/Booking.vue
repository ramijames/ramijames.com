<template>
  <section class="w-three-quarters" id="booking">
    <h1 class="">Book a Call</h1>
    <h4 class="">I provide a variety of valuable <nuxt-link to="/services">services</nuxt-link> for reasonable prices. If you haven't done so already, you should <nuxt-link to="products">check out the work</nuxt-link> that I have done in the past.</h4>
      
    <h4>Perhaps you're not sure yet what you need. That's ok, too. Let's have a quick call to discuss it.</h4>
    <CalendlyInlineWidget v-bind="options" />
  </section>
</template>

<script lang="ts" setup>    

  const options = {        
    url: 'https://calendly.com/itsramijames/30min',       
  }

</script>

<style lang="scss">

  @import './assets/variables';

  #booking {
    width: 100%;
    margin-bottom: $spacing-xl;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    
  }

  .calendly-inline-widget {
    min-height:1600px !important;
    width: 100%;

    @media screen and (max-width: 1200px) {
      min-height: 1600px !important;
    }

    @media screen and (max-width: 768px) {
      min-height: 1200px !important;
    }
  }

</style>