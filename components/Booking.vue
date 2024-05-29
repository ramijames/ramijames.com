<template>
  <Separator />
  <section id="booking" class="general-main">
    <a name="booking"></a>
    <SectionTitle title="Book a call" subtitle="I'm happy to set aside a little time to chat with you about your project, answer your questions, and assuage your concerns." /> 
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