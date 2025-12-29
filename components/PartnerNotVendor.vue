<template>
  <section id="VisibleThought">
    <section class="reason-content">
      <h2>A Partner, Not a Vendor</h2>
      <p>Over the years, it's been my pleasure to act as a partner to teams who are building innovative and interesting projects. </p>
      <nuxt-link class="button blue" to="/thoughts/a-partner-not-a-vendor">Learn more</nuxt-link>
    </section>
    <svg viewBox="0 0 3102 1075" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2296 0H1221V1075H2296V0ZM2027.25 268.75H1489.75V806.25H2027.25V268.75Z" fill="#A7BDDD"/>
      <circle cx="2295.5" cy="538.5" r="536.5" fill="#76A34A"/>
      <path d="M1090 0L466 1072H1090V817.97H906.406L1090 508.06V0Z" fill="#F8F0E4"/>
      <path d="M3.51574e-05 1072L4.6872e-05 804C148.012 804 268 684.012 268 536C268 387.988 148.012 268 7.03013e-05 268L8.2016e-05 -2.34293e-05C296.025 -1.04897e-05 536 239.975 536 536C536 832.025 296.025 1072 3.51574e-05 1072Z" fill="#507ABA"/>
      <path d="M3102 1072L3102 804.5C2954.26 804.5 2834.5 684.736 2834.5 537C2834.5 389.264 2954.26 269.5 3102 269.5L3102 1.99998C2806.53 1.99999 2567 241.528 2567 537C2567 832.472 2806.53 1072 3102 1072Z" fill="#F6B46C"/>
      <circle cx="577" cy="532" r="211" fill="#A7BDDD"/>
      <circle cx="1759" cy="532" r="211" fill="#D5E2C6"/>
    </svg>
  </section>
</template>

<style lang="scss" scoped>

@import './assets/variables';

#VisibleThought {
  background: rgba($black, 0.05);
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  height: 100%;
  justify-content: space-between;

  .reason-content {
    margin: $spacing-xl auto $spacing-sm;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media screen and (max-width: 1200px) {
    padding: $spacing-md;
  }

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  svg {
    width: 100%;
    margin: 0;
    opacity: 0.1;
    transition: all 0.62s ease-in-out;
    -webkit-mask-image: linear-gradient(black, transparent);
    mask-image: linear-gradient(black, transparent);
  }

  &:hover {
    svg {
      opacity: 0.6;
    }
  }
}

</style>