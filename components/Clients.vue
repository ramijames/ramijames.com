<template>
  <section id="Clients">
    <div class="clients-container w-consistent">
      <div class="section-title"
        v-gsap.whenVisible.from="{ opacity: 0, scale: 0.4, duration: 2.5, ease: 'power3.out' }"
      >These great companies have been some of my favorite clients.</div>
      <section class="clients" v-gsap.timeline.whenVisible>
        <img src="/clients/ibm.png" v-gsap.order-1.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
        <img src="/clients/wpt.png" v-gsap.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
        <img src="/clients/microsoft.png" v-gsap.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
        <img src="/clients/nvidia.png" v-gsap.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
        <img src="/clients/wix.png" v-gsap.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
        <img src="/clients/ultra.png" v-gsap.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
        <img src="/clients/equitick.png" v-gsap.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
        <img src="/clients/zivav.png" v-gsap.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
        <img src="/clients/microgaming.png" v-gsap.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
        <img src="/clients/qmarkets.png" v-gsap.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
        <img src="/clients/tonara.png" v-gsap.add.from="{ opacity: 0, scale: 0.4, delay: 0.2, ease: 'power3.out' }" />
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';

.open-wrapper {
  position: relative;
  height: 100%;
}

#Clients {
  background: $black;
  padding: $spacing-xl 0;
}

.clients-container {
  display: grid;
  grid-template-columns: 1fr;
  padding: $spacing-xl 0;
  align-items: center;

  @media screen and (max-width: 1200px) {
    padding: $spacing-md;
  }

  @media screen and (max-width: 768px) {
    padding: $spacing-sm;
  }

  .section-title {
    font-size: 3dvw;
    font-weight: 400;
    line-height: 100%;
    text-wrap: balance;
    text-align: center;
    padding: $spacing-xl 0 ;
    opacity: 0.4;
    position: relative;
    color: $white;

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
  padding: $spacing-xl 0;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1000px) {
    padding: $spacing-md;
  }

  img {
    height: 32px;
    mix-blend-mode:luminosity;
  }
}
</style>