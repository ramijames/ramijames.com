<template>
  <section id="Clients">
    <div class="clients-container w-consistent">
      <div class="section-title">These great companies have been some of my favorite clients.</div>
      <section class="clients">
        <img src="/clients/ibm.png" alt="IBM" />
        <img src="/clients/wpt.png" alt="WPT" />
        <img src="/clients/microsoft.png" alt="Microsoft" />
        <img src="/clients/nvidia.png" alt="NVIDIA" />
        <img src="/clients/wix.png" alt="Wix" />
        <img src="/clients/ultra.png" alt="Ultra" />
        <img src="/clients/equitick.png" alt="Equitick" />
        <img src="/clients/zivav.png" alt="Zivav" />
        <img src="/clients/microgaming.png" alt="Microgaming" />
        <img src="/clients/qmarkets.png" alt="Qmarkets" />
        <img src="/clients/tonara.png" alt="Tonara" />
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