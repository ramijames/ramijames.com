<template>
  <nuxt-link class="button" :class="type, size" :to="link">
    {{ text }}
  </nuxt-link>
</template>

<script>

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    size: {
      type: String,
      default: 'medium'
    },
    text: {
      type: String,
      default: 'Button'
    },
    link: {
      type: String,
      default: ''
    }
  }
}

</script>

<style scoped lang="scss">

@import './assets/variables';

.button {
  position:relative;
  padding:$spacing-sm $spacing-md;
  display:block;
  outline:none;
  border-radius: $br-sm;
  transition: all .06s ease-in-out;
  cursor:pointer;
  background-color: $black;
  color:$white !important;
  text-decoration: none;
  font-family: $font-family-secondary, sans-serif;
  font-weight:normal;
  font-size: $font-size-md;
  z-index: 1;
  box-shadow: inset 0 0 6px rgba($blue, 0.8), 0 0 30px rgba($blue, 0.4);
  border: 2px solid $blue;
  transition: all 0.3s ease-in-out;
  
  &.small {
    font-size: $font-size-sm;
    padding: $spacing-xs $spacing-sm;
    border-radius: $br-sm;
  }

  &:hover {
    background-color: lighten($blue, 10%);
    transform: scale(1.03);
  }

  &:active {
    background-color: darken($blue, 10%);
    transform: scale(1);
  }
}

.dark .button {
  background-color: $white;
  color: $black !important;
  box-shadow: 0 0 30px $blue;

  &.small {
    box-shadow: 0 0 30px $blue;
  }
}

</style>