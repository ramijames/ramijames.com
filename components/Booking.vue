<template>
  <section id="booking" class="general-main">
    <a name="booking"></a>
    <CalendlyInlineWidget v-bind="options" />
  </section>
</template>

<script lang="ts" setup>    

  const options = {        
    url: 'https://calendly.com/itsramijames/30min',       
  }

</script>

<style>

  .calendly-inline-widget {
    min-height:800px !important;

    @media screen and (max-width: 1200px) {
      min-height: 1600px !important;
    }

    @media screen and (max-width: 768px) {
      min-height: 1200px !important;
    }
  }

</style>