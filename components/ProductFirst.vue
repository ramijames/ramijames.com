<template>
  <main id="ProductFirstIntro" class="general-main">
    <section class="w-two-thirds">
      <h2>What does it mean to be <span class="highlight">Product-first?</span></h2>
    </section>
    <section class="w-half">
      <h4 class="center">It simply means that you have a process in place that makes your Product work a first-class player and decision maker within your organization.</h4>
      <p class="center">To get there, you need a clear vision of what you are building, why you are building it, a roadmap for how you want to get there, and a clear process that keeps you out of trouble.</p>
    </section>
    <section class="w-full flow-diagram">
      
      <div class="flow-diagram-item">
        <img src="" alt="">
        <h5>Comprehensive Product Vision</h5>
      </div>

      <svg class="arrow" width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5147 1.39344L27.0607 10.9394C27.6464 11.5252 27.6464 12.4749 27.0607 13.0607L17.5147 22.6066C16.9289 23.1924 15.9792 23.1924 15.3934 22.6066C14.8076 22.0209 14.8076 21.0711 15.3934 20.4853L22.3787 13.5H2C1.17157 13.5 0.5 12.8285 0.5 12C0.5 11.1716 1.17157 10.5 2 10.5H22.3787L15.3934 3.51476C14.8076 2.92898 14.8076 1.97923 15.3934 1.39344C15.9792 0.807655 16.9289 0.807655 17.5147 1.39344Z" fill="#BEB5AB"/>
      </svg>

      <div class="flow-diagram-item">
        <img src="" alt="">
        <h5>Thoughtful Roadmap Building</h5>
      </div>

      <svg class="arrow" width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5147 1.39344L27.0607 10.9394C27.6464 11.5252 27.6464 12.4749 27.0607 13.0607L17.5147 22.6066C16.9289 23.1924 15.9792 23.1924 15.3934 22.6066C14.8076 22.0209 14.8076 21.0711 15.3934 20.4853L22.3787 13.5H2C1.17157 13.5 0.5 12.8285 0.5 12C0.5 11.1716 1.17157 10.5 2 10.5H22.3787L15.3934 3.51476C14.8076 2.92898 14.8076 1.97923 15.3934 1.39344C15.9792 0.807655 16.9289 0.807655 17.5147 1.39344Z" fill="#BEB5AB"/>
      </svg>

      <div class="flow-diagram-item">
        <img src="" alt="">
        <h5>User-focused Feature Definition</h5>
      </div>

      <svg class="arrow" width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5147 1.39344L27.0607 10.9394C27.6464 11.5252 27.6464 12.4749 27.0607 13.0607L17.5147 22.6066C16.9289 23.1924 15.9792 23.1924 15.3934 22.6066C14.8076 22.0209 14.8076 21.0711 15.3934 20.4853L22.3787 13.5H2C1.17157 13.5 0.5 12.8285 0.5 12C0.5 11.1716 1.17157 10.5 2 10.5H22.3787L15.3934 3.51476C14.8076 2.92898 14.8076 1.97923 15.3934 1.39344C15.9792 0.807655 16.9289 0.807655 17.5147 1.39344Z" fill="#BEB5AB"/>
      </svg>

      <div class="flow-diagram-item">
        <img src="" alt="">
        <h5>Excellent Design & Development</h5>
      </div>

    </section>
  </main>
</template>

<style scoped lang="scss">

@import './assets/variables';

#ProductFirstIntro {

  h2 {
    color: $teal-dark;
    font-weight: 800;
    font-size: $font-size-max;
    line-height: 100%;
    text-align: center;
    text-shadow: 0px 1px 0 #94aed5, 0px 2px 0 #3b5f96;

    .highlight {
      color: $red-dark;
      text-shadow: 0px 1px 0 lighten($red, 5%), 0px 2px 0 darken($red, 25%);
    }
  }

  .flow-diagram {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    .flow-diagram-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $spacing-sm;
      width: 20%;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: $teal;
      }

      h5 {
        color: $red;
        font-weight: 600;
        font-size: $font-size-lg;
        text-align: center;
      }
    }

    .arrow {
      width: 28px;
      height: 24px;
      fill: $teal-dark;
    }
  }
}

</style>