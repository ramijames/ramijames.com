<template>
  <div id="entry">
    <div id="left"></div>
    <div id="right"></div>
    <div id="acceptance">
      Here, I help people learn how to build things on the web in a way that melds together the best parts of design and development.
    </div>
  </div>
</template>

<style lang="scss" scoped>

@import './assets/variables';

#entry {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $gray-dark;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  #left, #right {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    background: $black-dark;
    transition: 0.5s;
  }

  #left {
    left: 0;
  }

  #right {
    right: 0;
  }

  #acceptance {
    color: $white;
    font-size: $font-size-xl;
    font-weight: 900;
    text-align: center;
    width: 50%;
    transition: 0.5s;
    z-index: 10000;
  }
}


</style>