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
  }

</style>