<template>
  <section class="mega-content">
    <h4>Previous clients</h4>
    <section class="clients">
      <img src="/clients/ibm.png" />
      <img src="/clients/wpt.png" />
      <img src="/clients/microsoft.png" />
      <img src="/clients/nvidia.png" />
      <img src="/clients/wix.png" />
      <img src="/clients/ultra.png" />
      <img src="/clients/equitick.png" />
      <img src="/clients/zivav.png" />
      <img src="/clients/microgaming.png" />
      <img src="/clients/qmarkets.png" />
      <img src="/clients/tonara.png" />
    </section>
    <!-- <a href="mailto:ramijames@gmail.com?subject=Set up a call" class="button blue large">Become a client</a>   -->
  </section>
</template>

<style lang="scss" scoped>

@import './assets/variables';

.mega-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: $spacing-md;
  gap: $spacing-md;
  width: 100%;
  height: 100px;
  background: black;
  overflow: hidden;
  position: relative;
  margin: $spacing-xl 0;

  @media screen and (max-width: 1000px){
    flex-direction: column;
    height: auto;
    padding: $spacing-md;
    margin: $spacing-sm;
    width: calc(100% - $spacing-sm - $spacing-sm);
  }

  &:after {
    content: '';
    height: 100%;
    width: 15%;
    background: linear-gradient(90deg, transparent 0%, $black);
    display: block;
    position: absolute;
    z-index: 1;
    right: 0;
    backdrop-filter:blur(10px);
    mask-image: linear-gradient(90deg, transparent 20%, $black 100%);
    pointer-events: none;

    @media screen and (max-width: 1000px){
      display: none;
    }
  }

  h4 {
    margin: 0;
    text-wrap: nowrap;
    opacity: 0.8;
    color: $white;
  }

  .clients {
    display: flex;
    flex-direction: row;
    gap: $spacing-md;

    @media screen and (max-width: 1000px){
      flex-wrap:wrap;
      justify-content: center;
    }

    img {
      height: 22px;
      opacity: 0.4;
      transition: 0.2s all ease-in-out;
      mix-blend-mode:luminosity;

      &:hover {
        opacity: 1;
      }
    }
  }

  .button {
    position: absolute;
    z-index: 2;
    right: $spacing-md;

    @media screen and (max-width: 1000px){
      position: relative;
      right: auto;
      z-index: initial;
    }

  }
}
</style>