<template>
  <section id="Clients">
    <div class="clients-container w-consistent">
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