<template>
  <svg class="separator" viewBox="0 0 530 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 15.9998C163 42.9998 188.475 4.99982 282.222 4.99982C317.483 4.99982 416.274 40.1803 444.556 13.6665C452 6.68741 441.055 -2.49993 433.556 4.99982C427.055 11.5 430.5 18.1273 435.5 20.3332C445.8 24.8771 493 7 528 17" stroke="#1B1B20" stroke-width="3" stroke-linecap="round"/>
  </svg>
</template>

<style scoped lang="scss">

@import './assets/variables';

.separator {
  max-width:400px;
  width: 100%;
  height: auto;
  margin: $spacing-lg auto;

  path {
    stroke: $blue;
    stroke-width: 2;
  }
}

.dark .separator {
  path {
    stroke: rgba(lighten($blue, 25%), 0.5);
  }
}

</style>