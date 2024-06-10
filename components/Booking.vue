<template>
  <section id="booking">
    <SectionTitle title="Start your Product-first Journey" subtitle="This introductory call is quick and free!" /> 
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
    
    h2, h4 {
      width: 100%;
      text-align: center;
    }
  }

  .calendly-inline-widget {
    min-height:1600px !important;

    @media screen and (max-width: 1200px) {
      min-height: 1600px !important;
    }

    @media screen and (max-width: 768px) {
      min-height: 1200px !important;
    }
  }

</style>