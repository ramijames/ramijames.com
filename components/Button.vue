<template>
  <div class="button">
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
  padding:2rem 4rem;
  display:inline-block;
  outline:none;
  background-color:#f6f3f7;
  border-radius: .3rem;
  transition: .06s ease-in-out;
  cursor:pointer;
  background-color: rgb(161, 49, 231);
  backdrop-filter: blur(6px);
  color:white;
  text-shadow:0px 2px 1px rgba(0,0,0,0.3);
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  mix-blend-mode: multiply;
  perspective: 100em;
  transform-style: preserve-3d;
  font-size:1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;

  @media screen and (max-width: 768px) {
    padding:1rem 2rem;
    font-size:1rem;
  }
  
  &:after {
    transform-style: preserve-3d;
    transform-origin: top;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(10deg);
    height: 100%;
    border-radius: .3rem;
    background: #d81515;
    z-index: -1;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    mix-blend-mode: screen;

    @media screen and (max-width: 768px) {
      transform: rotate(6deg);
    }
  }

  &:before {
    transform-style: preserve-3d;
    transform-origin: top;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(-10deg);
    height: 100%;
    border-radius: .3rem;
    background: #7523e1;
    z-index: -1;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    mix-blend-mode: overlay;

    @media screen and (max-width: 768px) {
      transform: rotate(-6deg);
    }
  }
}

.dark .button {
  mix-blend-mode: screen;
}

.button:hover,
.button:hover:after,
.button:hover:before {
  transform: rotate(0deg);
  background-color: rgb(161, 49, 231);
}

</style>