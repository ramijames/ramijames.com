<template>
  <nuxt-link class="button" :class="type, size" :to="link">
    <div class="button__content">
      <div class="button__text">{{ text }}</div>
    </div>
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
  display:inline-block;
  outline:none;
  border-radius: $br-xs;
  transition: .06s ease-in-out;
  cursor:pointer;
  background-color: $black;
  color:white;
  text-decoration: none;
  font-family: 'Bitter', sans-serif;
  font-weight:200;
  font-size: 24px;
  margin:-3px -3px 0 0;
  z-index: 1;
  box-shadow: 6px 6px 0 $blue;

  &__content {
    position:relative;
    z-index: 1;
  }
  
  &.small {
    font-size: 14px;
    padding: $spacing-xs $spacing-sm;
    border-radius: $br-xs;
    box-shadow: 3px 3px 0 $blue;
    margin:-3px -3px 0 0;

    &:after {
      top: 4px;
      left: 4px;
    }
  }
}

.dark .button {
  background-color: $white;
  color: $black;
  box-shadow: 6px 6px 0 $blue-light;

  &.small {
    box-shadow: 3px 3px 0 $blue-light;
  }
}

</style>