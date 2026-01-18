<template>
  <div class="separator-main general-main">
    <svg class="separator" viewBox="0 0 379 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 23.9025C13.3617 25.5069 108.5 29 89.5 9.49961C70.5 -10.0008 62.5129 28.9996 83 37.9997C103.774 47.1258 146.15 15.046 169.538 12.6641C180.918 11.5051 193.015 11.967 204.334 13.2454C227.638 15.8773 250.957 21.6371 273.86 26.5507C293.632 30.7926 313.677 36.3684 334.037 35.9806C345.317 35.7659 356.987 35.3562 367.924 32.3637C370.672 31.6117 372.728 30.8296 375 29.1342" stroke="#F4E8DB" stroke-width="8" stroke-linecap="round"/>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.separator-main {
  padding-top:0;
  padding-bottom: 0;
}

.separator {
  max-width:400px;
  width: 100%;
  height: auto;
  margin: $spacing-lg auto;

  path {
    stroke: $purple-light;
    stroke-width: 1;
  }
}

.dark .separator {
  path {
    stroke: rgba($black, 0.2);
  }
}

</style>