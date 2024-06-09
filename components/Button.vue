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
      default: 'default'
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
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor:pointer;
  z-index: 0;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  overflow: hidden;
  padding: $spacing-sm $spacing-md;
  border-radius: $br-sm;
  color: $white !important;
  font-family: $font-family-main, sans-serif;
  font-weight: 500;
  font-size: $font-size-md;
  white-space:nowrap;
  text-decoration: none;
  background: $red-dark;
  box-shadow: 0px 1.5px 0 lighten($red, 5%), 0px 3px 0 darken($red, 25%);

  @media screen and (max-width: 768px){
    padding: $spacing-xs $spacing-sm;
    font-size: $font-size-md;
    
  }

  &.big {
    padding: $spacing-md $spacing-lg;
    color: $white !important;
    font-size: $font-size-xl;
    font-weight: 700;
    border-radius: $br-md;
    box-shadow: 0px 2px 0 lighten($red, 5%), 0px 4px 0 darken($red, 25%);

    @media screen and (max-width: 768px){
      padding: $spacing-sm $spacing-md;
      font-size: $font-size-lg;
    }

    &:hover {
      transform: scale(1.03);
    }
  }

  &.small {
    padding: $spacing-sm $spacing-md;
    color: $white !important;
    font-size: $font-size-sm;
    font-weight: 700;
    border-radius: $br-sm;
    box-shadow: 0px 2px 0 lighten($red, 5%), 0px 4px 0 darken($red, 25%);

    @media screen and (max-width: 768px){
      padding: $spacing-sm;
    }

    &:hover {
      transform: scale(1.03);
    }
  }

  &:hover {
    background-color: darken($red-dark, 10%);
    transform: scale(1.03);
  }

  &:active {
    background-color: darken($blue, 10%);
    transform: scale(1);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>