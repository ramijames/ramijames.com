<template>
  <section id="booking">
    <h2>Book a call</h2>
    <p>Let's talk about your project.</p>
    <CalendlyInlineWidget v-bind="options" />
  </section>
</template>

<script lang="ts" setup>    

  const options = {        
    url: 'https://calendly.com/itsramijames/30min',       
  }

</script>

<style>

  #booking {
    text-align: center;
    margin:0 auto 8rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  .calendly-inline-widget {
    min-height:800px !important;
  }

</style>