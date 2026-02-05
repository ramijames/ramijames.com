<template>
  <nuxt-link class="button" :class="type, size" :to="link">
    {{ text }}
  </nuxt-link>
</template>

<script setup>
defineProps({
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
})
</script>

<style scoped lang="scss">
// .button {
//   position:relative;
//   display:flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   cursor:pointer;
//   z-index: 0;
//   transition: all 0.3s ease-in-out;
//   text-decoration: none;
//   overflow: hidden;
//   padding: $spacing-sm $spacing-md;
//   color: $white;
//   font-family: $font-family-main, sans-serif;
//   font-weight: 600;
//   font-size: $font-size-md;
//   white-space:nowrap;
//   text-decoration: none;
//   background: transparent;
//   border: 1px solid $white;
//   border-radius: 0;

//   &:hover {
//     background: $blue-dark;
//     color: $white;
//   }

//   @media screen and (max-width: 768px){
//     padding: $spacing-xs $spacing-sm;
//     font-size: $font-size-md;
//   }

//   &.small {
//     padding: $spacing-xs $spacing-sm!important;
//     font-size: $font-size-sm;
//     font-weight: 600;

//     @media screen and (max-width: 768px){
//       padding: $spacing-sm;
//     }

//     &:hover {
//       background: $teal-dark;
//       color: $white;
//     }
//   }

//   &.text {
//     padding: $spacing-xs $spacing-sm!important;
//     font-size: $font-size-sm;
//     font-weight: 600;
//     background: transparent;
//     border-color: transparent;

//     @media screen and (max-width: 768px){
//       padding: $spacing-sm;
//     }

//     &:hover {
//       background: $teal-dark;
//       color: $white;
//     }
//   }
// }

</style>