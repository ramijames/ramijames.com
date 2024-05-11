<template>
  <div class="animBox">
    <div class="rotateGroup">
      <div
        v-for="(element, index) in numberOfElements"
          :key="element"
          :style="{
            // width: size + '%',
            // height: size + '%',
            // height: '200px',
            // backgroundColor: color,
            borderWidth: borderWidth + 'px',
            animation: animationStyle + ' ' + (index + 1) * 3 + 's' + ' infinite',
            // top: index * 10 + 'px',
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
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    borderWidth: {
      type: Number,
      required: true
    },
    animationStyle: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.animBox {
  perspective: 600em;
  position:absolute;
  right:0;
  top:0;
  bottom:0;
  left:0;
  z-index: 10;
  height: 100vh;
  width: 100vw;
  display:flex;
  justify-content:center;
  align-content: center;
  align-items: center;
  pointer-events: none; /* Can't click on it */
}

.rotateGroup {
  transform-style: preserve-3d;
  transform: translateX(130px) rotate3d(2.5,1.75,6,90deg);
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.element {
  position: absolute;
  border-style: solid;
  border-color: black;
  transform-style: preserve-3d;
  width:400px;
  height:400px;
  border-radius: 50%;
  /* scale: 0.1; */
  transform:  translateY(0)
              rotate3d(1, 0, 0, 90deg);
  animation-iteration-count: 1;
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

  20% {
    width:800px;
    height:800px;
    transform:  translateZ(0px)
                rotate3d(1, 0, 0, 0deg);
  }

  40% {
    width:800px;
    height:800px;
    transform:  translateZ(1200px)
                rotate3d(1, 0, 0, 0deg);
  }

  60% {
    width:80px;
    height:80px;
    transform:  translateZ(1200px)
                rotate3d(1, 0, 0, 0deg);
  }

  100% {
    width:80px;
    height:80px;
    transform:  translateZ(0px)
                rotate3d(1, 0, 0, 0deg);
  }
  
}

</style>