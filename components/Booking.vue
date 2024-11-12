<template>
  <section class="w-three-quarters" id="booking">
    <h1 class="center">Book a Call</h1>
    
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