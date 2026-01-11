<template>
  
  <div class="clients-container">
    <div class="section-title">These great companies have been some of my favorite clients.</div>
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
  </div>
</template>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';

.dark {

  .clients-container {
    background: #222;
    border-top: 1px solid #222;
    border-bottom: 1px solid #222;
  }
}

.clients-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 60dvh;
  background: $yellow;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 3dvw;
    font-weight: 400;
    line-height: 100%;
    text-wrap: balance;
    opacity: 0.4;
    padding: $spacing-md;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    display: flex;
    flex-direction: column;
    text-align: center;

    @media screen and (max-width: 1000px) {
      font-size: 6dvw;
      padding: $spacing-md;
    }
  }
}


.clients {
  display: flex;
  flex-direction: row;
  gap: $spacing-md;
  background: $black;
  padding: 0 $spacing-xl;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;

  @media screen and (max-width: 1000px) {
    padding: $spacing-md;
  }

  img {
    height: 32px;
    opacity: 0.4;
    transition: 0.2s all ease-in-out;
    mix-blend-mode:luminosity;
    opacity: 0;
    animation: fadeInDown 0.35s ease-in-out forwards;

    &:nth-child(1) {
      animation-delay: 0.1s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
    &:nth-child(4) {
      animation-delay: 0.4s;
    }
    &:nth-child(5) {
      animation-delay: 0.5s;
    }
    &:nth-child(6) {
      animation-delay: 0.6s;
    }
    &:nth-child(7) {
      animation-delay: 0.7s;
    }
    &:nth-child(8) {
      animation-delay: 0.8s;
    }
    &:nth-child(9) {
      animation-delay: 0.9s;
    }
    &:nth-child(10) {
      animation-delay: 1.0s;
    }
    &:nth-child(11) {
      animation-delay: 1.1s;
    }
    &:nth-child(12) {
      animation-delay: 1.2s;
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>