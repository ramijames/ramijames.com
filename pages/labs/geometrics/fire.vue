<template>
  <div id="mesh-gradient" class="fired-up no-blur">
    <div class="element" v-for="n in 32" :key="n"></div>
  </div>
</template>

<style lang="scss" scoped>
$apple-red: #FF1E49;
$apple-blue: #2E53F9;

#mesh-gradient.fired-up {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr ;
  position: relative;
  gap: 1px;
  filter: blur(20px);
  transform: scale(1) rotate3d(93, 81, 85, 60deg);
  $mesh-colors: ();

  &.no-blur {
    filter: none;
  }

  // generate the colors with an HSL model
  @for $i from 0 through 15 {
    $hue: ($i - 1) * calc(60 / 16);
    $color: hsl($hue, 20%, 50%);
    $mesh-colors: merge($mesh-colors, ($i: $color));
  }

  $i: 0;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      background-color: $color;
      animation-delay: -#{$i * .6}s;
    }
  }

  .element {
    position: relative;
    animation: sixteen-elements 10s linear infinite;
    border-radius: 100%;
  }

}

</style>