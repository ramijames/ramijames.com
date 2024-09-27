<template>
  <div class="animBox">
      <div
        v-for="(element, index) in numberOfElements"
          :key="element"
          :style="{
            borderWidth: '4px',
            animation: animationStyle + ' ' + (index + 1) * 18 + 's' + ' infinite',
          }"
          class="element"
      ></div>
  </div>
</template>

<script>
export default {
  props: {
    numberOfElements: {
      type: Number,
      required: false,
      default: 16
    },
    animationStyle: {
      type: String,
      required: false,
      default: 'defaultWoosh'
    }
  }
}
</script>

<style lang="scss" scoped>

@import './assets/variables';

.animBox {
  position:absolute;
  right:0;
  top:0;
  bottom:0;
  left:0;
  display:flex;
  justify-content:center;
  align-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 0;
  animation: rotateGroupRotator 30s infinite;
  transform-style: preserve-3d;
  perspective: 1000em;
  opacity: 0.1;
}

    $mesh-colors: ();

    // generate the colors with an HSL model
    @for $i from 0 through 48 {
      $hue: ($i - 1) * calc(360 / 48);
      $color: hsl($hue, 100%, 50%);
      $mesh-colors: map-merge($mesh-colors, ($i: $color));
    }

    $i: 0;
    @each $name, $color in $mesh-colors {
      $i: $i + 1;
      .element:nth-child(#{$i}) {
        position: absolute;
        border: 2px solid $color;
        animation-delay: -#{$i * .125}s;
        width:400px;
        height:400px;
        border-radius: 100%;
        transform:  translateY(0)
                    rotate3d(1, 0, 0, 90deg);
        animation-iteration-count: 1;
        transform-style: preserve-3d;
      }
    }

@keyframes defaultWoosh {

  /* animation steps

  1. start state
  2. grow to full size, set at bottom
  3. stay at full size, move to top
  4. stay at full size, stay at top
  5. shrink to start size, move to bottom

  */

  0% {
    width:0px;
    height:0px;
    opacity: 0;
    transform:  translateZ(0px)
                rotate3d(1, 0, 0, 0deg);
  }

  10% {
    width:800px;
    height:800px;
    opacity: 1;
    transform:  translateZ(0px)
                rotate3d(1, 0, 0, 0deg);
  }

  50% {
    width:800px;
    height:800px;
    opacity: 1;
    transform:  translateZ(1800px)
                rotate3d(1, 0, 0, 0deg);
  }

  90% {
    width:0px;
    height:0px;
    transform:  translateZ(1800px)
                rotate3d(1, 0, 0, 0deg);
    opacity: 0;
  }

  100% {
    width:80px;
    height:80px;
    transform:  translateZ(0px)
                rotate3d(1, 0, 0, 0deg);
  }
  
}

@keyframes rotateGroupRotator {
  0% {
    transform: translateX(400px) translateY(100px) rotate3d(2.5,3.75,0,90deg);
  }
  50% {
    transform: translateX(400px) translateY(100px) rotate3d(2.5,3.75,10,90deg);
  }
  100% {
    transform: translateX(400px) translateY(100px) rotate3d(2.5,3.75,0,90deg);
  }
}

</style>