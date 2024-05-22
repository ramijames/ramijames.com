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
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  outline:none;
  border-radius: $br-sm;
  transition: all .06s ease-in-out;
  cursor:pointer;
  background-color: $blue;
  color:$white !important;
  text-decoration: none;
  font-family: $font-family-secondary, sans-serif;
  font-weight:normal;
  font-size: $font-size-md;
  z-index: 1;
  box-shadow: inset 0 -4px 6px darken($blue, 14%), 0 1px 1px rgba($black, 0.4), 0 3px 3px rgba($black, 0.2), 0 10px 30px rgba($blue, 0.2);
  border: 2px solid $blue;
  transition: all 0.3s ease-in-out;
  
  &.small {
    font-size: $font-size-xs;
    padding: 0 $spacing-sm;
    border-radius: $br-sm;
    font-weight: bold;
  }

  &.sidebar {
    font-size: $font-size-sm;
    padding: $spacing-xs;
    border-radius: $br-sm;
    font-weight: bold;
  }

  &.light {
    font-size: $font-size-sm;
    padding: 0 $spacing-sm;
    border-radius: $br-sm;
    font-weight: bold;
    background-color: $white;
    color:$black !important;
    border: 2px solid rgba($black, .1);
    box-shadow: none;

    &:hover {
      background-color: darken($white, 10%);
      color:$black !important;
      transform: scale(1.03);
    }
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

  &.light {
    font-size: $font-size-sm;
    padding: 0 $spacing-sm;
    border-radius: $br-sm;
    font-weight: bold;
    background-color: $black;
    color:$white !important;
    border: 2px solid $black;
    box-shadow: none;

    &:hover {
      background-color: lighten($blue, 10%);
      transform: scale(1.03);
    }
  }
}

</style>