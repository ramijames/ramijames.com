<template>
  <div class="animBox">
    <div class="rotateGroup">
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
  </div>
</template>

<script>
export default {
  props: {
    numberOfElements: {
      type: Number,
      required: false,
      default: 8
    },
    animationStyle: {
      type: String,
      required: false,
      default: 'defaultWoosh'
    }
  }
}
</script>

<style>

.animBox {
  perspective: 100em;
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
}
    .rotateGroup {
      transform-style: preserve-3d;
      transform: translateX(-700px) rotate3d(2.5,3.75,3,90deg);
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      animation: rotateGroupRotator 30s infinite;
      opacity: 0.4;
    }

    .dark .rotateGroup {
      opacity: 0.8;
    }

    .element {
      position: absolute;
      border-style: solid;
      border-color: rgba(0, 0, 0, 0);
      transform-style: preserve-3d;
      width:400px;
      height:400px;
      border-radius: 20%;
      transform:  translateY(0)
                  rotate3d(1, 0, 0, 90deg);
      animation-iteration-count: 1;
      box-shadow: inset 0px 4px 10px #0800f115, 
                  0px 0px 20px #0800f115, 
                  0px 100px 100px #0800f10c, 
                  inset 0px 0px 60px #0800f13d;
    }

.dark .animBox {
  background: radial-gradient(ellipse at bottom, rgb(87, 24, 127) 0%, rgba(44, 13, 63, 0) 60%);
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
    width:80px;
    height:80px;
    transform:  translateZ(0px)
                rotate3d(1, 0, 0, 0deg);
  }

  10% {
    width:800px;
    height:800px;
    transform:  translateZ(0px)
                rotate3d(1, 0, 0, 0deg);
  }

  50% {
    width:800px;
    height:800px;
    transform:  translateZ(1800px)
                rotate3d(1, 0, 0, 0deg);
  }

  90% {
    width:80px;
    height:80px;
    transform:  translateZ(1800px)
                rotate3d(1, 0, 0, 0deg);
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
    transform: translateX(-700px) rotate3d(2.5,3.75,0,90deg);
  }
  50% {
    transform: translateX(-700px) rotate3d(2.5,3.75,10,90deg);
  }
  100% {
    transform: translateX(-700px) rotate3d(2.5,3.75,0,90deg);
  }
}

</style>