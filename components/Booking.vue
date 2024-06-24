<template>
  <section id="booking">
    <!-- <SectionTitle title="Start your Product-first Journey" subtitle="This introductory call is quick and free!" />  -->
    <img src="/services/team.png" alt="Let's do it" class="center" />
    <h2 class="center">I'm glad you are here</h2>
      <h3 class="center">I provide a variety of valuable services for reasonable prices. If you need <span class="red">product</span>, <span class="mint">UX/UI</span>, <span class="purple">design</span>, or <span class="teal">front-end</span> work done, I'm your guy.</h3>
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
    justify-content: center;
    img {
      width: 100px;
      margin: 0 auto;
    }
    
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