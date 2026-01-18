<template>
  <section id="VisibleThought">
    <section class="reason-content">
      <h2>Visible Thought</h2>
      <p>A successful design process is transparent, apparent, and obvious. My job as a Principal is to ensure that everyone's needs are accounted for, from executive stakeholders to developers who will implement the final design.</p>
    </section>
    <svg viewBox="0 0 3102 1072" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2531 -2.67029e-05L3102 -5.16621e-05L3102 268L2816.5 268L2816.5 804L3102 804L3102 1072L2531 1072L2531 -2.67029e-05Z" fill="#D9D9D9"/>
      <path d="M571 -2.67029e-05L-5.19931e-07 -5.16621e-05L-1.22346e-05 268L285.5 268L285.5 804L7.89996e-06 804L-3.8147e-06 1072L571 1072L571 -2.67029e-05Z" fill="#D9D9D9"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1785 0H715V1070H1785V0ZM1517.5 267.5H982.5V802.5H1517.5V267.5Z" fill="#A7BDDD"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2531 1070C2826.47 1070 3066 830.472 3066 535C3066 239.528 2826.47 0 2531 0C2235.53 0 1996 239.528 1996 535C1996 830.472 2235.53 1070 2531 1070ZM2531 802.5C2678.74 802.5 2798.5 682.736 2798.5 535C2798.5 387.264 2678.74 267.5 2531 267.5C2383.26 267.5 2263.5 387.264 2263.5 535C2263.5 682.736 2383.26 802.5 2531 802.5Z" fill="#F6B46C"/>
      <path d="M1785 1072L1785 804.5C1637.26 804.5 1517.5 684.736 1517.5 537C1517.5 389.264 1637.26 269.5 1785 269.5L1785 1.99998C1489.53 1.99999 1250 241.528 1250 537C1250 832.472 1489.53 1072 1785 1072Z" fill="#507ABA"/>
      <circle cx="1785" cy="537" r="211" fill="#D5E2C6"/>
    </svg>

  </section>
</template>

<style lang="scss" scoped>
.dark {
  #VisibleThought {

    svg {
      opacity: 0.1;
    }

    &:hover {
      svg {
        opacity: 0.6;
      }
    }
  }
}

#VisibleThought {
  background: rgba($blue, 0.05);
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  height: 100%;
  justify-content: space-between;

  .reason-content {
    margin: $spacing-xl auto $spacing-sm;
    max-width: 440px;
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
    opacity: 0.4;
    transition: all 0.62s ease-in-out;
    -webkit-mask-image: linear-gradient(black, transparent);
    mask-image: linear-gradient(black, transparent);
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
}

</style>