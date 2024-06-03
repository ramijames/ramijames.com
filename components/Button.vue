<template>
  <nuxt-link class="button" :class="type, size" :to="link">
    <img src="/textures/texture-3.png" alt="Texture" />
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
  background: $red linear-gradient(145deg, $red 25%, $purple 75%);
  color:$white !important;
  text-decoration: none;
  font-family: $font-family-main, sans-serif;
  font-weight: 500;
  letter-spacing: 0.05rem;
  font-size: $font-size-lg;
  white-space:nowrap;
  z-index: 1;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  text-shadow: 1px 1px 1px rgba($black, 0.5);

  @media screen and (max-width: 1200px){
    font-size: $font-size-md;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: color-burn;
    position: absolute;
    left:0;
    top:0;
    box-shadow: none;
    background-color: $white;
  }

  &:before {
    position: absolute; 
    background: $red;
    content: '';
    bottom: -70px;
    right: 20px;
    width:80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0 0 30px $red;
    opacity: 0.6;
  }

  &:after {
    position: absolute; 
    background: $purple;
    content: '';
    top: -70px;
    left: 20px;
    width:80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0 0 30px $purple;
    opacity: 0.6;
  }
  
  &.small {
    font-size: $font-size-md;
    padding: $spacing-xs $spacing-sm;
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
    box-shadow: none;

    &:hover {
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
  color: $white !important;
  box-shadow: 3px 4px 0 darken($black-light, 10%);

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
      box-shadow: 0 0 30px rgba($red, 0.6);
      transform: scale(1.03);
    }
  }

  &:hover {
    box-shadow: 5px 7px 0 darken($black-light, 10%);
    transform: scale(1.03);
  }
}

</style>