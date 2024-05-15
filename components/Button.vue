<template>
  <div class="button" :class="type">
    <div class="button__content">
      <div class="button__text">{{ text }}</div>
    </div>
    <!-- <div class="front">{{ text }}</div> -->
  </div>
</template>

<script>

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    text: {
      type: String,
      default: 'Button'
    }
  }
}

</script>

<style scoped lang="scss">

.button {
  position:relative;
  padding:1rem 2rem;
  display:inline-block;
  outline:none;
  background-color:#f6f3f7;
  border-radius: .3rem;
  transition: .06s ease-in-out;
  cursor:pointer;
  background-color: rgb(98, 49, 231);
  backdrop-filter: blur(6px);
  color:white;
  mix-blend-mode: multiply;
  perspective: 100em;
  transform-style: preserve-3d;
  
  &:after {
    transform-style: preserve-3d;
    transform-origin: top;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(2deg);
    height: 100%;
    border-radius: .3rem;
    background: rgb(207, 49, 231);
    z-index: -1;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    mix-blend-mode: overlay;
  }

  &:before {
    transform-style: preserve-3d;
    transform-origin: top;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(-2deg);
    height: 100%;
    border-radius: .3rem;
    background: rgb(0, 0, 0);
    z-index: -1;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    mix-blend-mode: overlay;
  }
}

.dark .button {
  mix-blend-mode: screen;
}

.button:hover,
.button:hover:after,
.button:hover:before {
  transform: rotate(0deg);
  background-color: rgb(0, 0, 0);
}

.dark .button:hover,
.dark .button:hover:after,
.dark .button:hover:before {
  background-color: #6f6afb;
}

</style>