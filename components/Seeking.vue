<template>
  <section class="actively-seeking">
    <h4>Supercharge your vision!</h4>
    <p>Let's work together to bring your product to life.</p>
    <Button text="Learn more" size="sidebar" link="/" />
  </section>
</template>

<script>

import Button from './Button.vue'

export default {
    components: {
        Button
    }
}

</script>

<style lang="scss">

@import './assets/variables';

.actively-seeking {
  border-radius: $br-md;
  background: $blue linear-gradient(40deg, $black 0%, $blue 50%);
  padding: $spacing-sm * 1.5;
  margin: ($spacing-sm * 1.5) 0;

  h4 {
    color: $white;
    font-size: $font-size-md;
    margin-top: 0 !important;
    margin-bottom: $spacing-xs !important;
  }

  p {
    color: $white;
    font-size: $font-size-sm;
    margin-bottom: $spacing-sm;
    line-height: $spacing-sm * 1.3;
  }
}

</style>