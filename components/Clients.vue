<template>
  <section id="Clients">
    <div class="clients-container w-consistent">
      <div class="section-title">These great companies have been some of my favorite clients.</div>
      <section class="clients">
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/ibm.png" alt="IBM" />
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/wpt.png" alt="WPT" />
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/microsoft.png" alt="Microsoft" />
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/nvidia.png" alt="NVIDIA" />
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/wix.png" alt="Wix" />
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/ultra.png" alt="Ultra" />
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/equitick.png" alt="Equitick" />
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/zivav.png" alt="Zivav" />
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/microgaming.png" alt="Microgaming" />
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/qmarkets.png" alt="Qmarkets" />
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/clients/tonara.png" alt="Tonara" />
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
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