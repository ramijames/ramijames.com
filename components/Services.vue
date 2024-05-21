<template>
  <section id="services">
    <section class="service-explainer" ref="serviceExplainer">
      <div>Our work together is broken down into discrete milestones so that we can have both structure and fast progress.</div>
    </section>
    <section class="services" ref="services">
      <section class="service">
        <div class="tag">Service</div>
        <h1>Product Conception</h1>
      </section>

      <section class="service">
        <div class="tag">Service</div>
        <h1>User Experience & Interface Design</h1>
      </section>

      <section class="service">
        <div class="tag">Service</div>
        <h1>Implementation</h1>
      </section>
    </section>
  </section>
</template>

<style scoped lang="scss">

@import './assets/variables';

#services {
  display: flex;
  flex-direction: column;
  background: $blue;

  @media screen and (max-width: 768px){
    flex-direction: column;
  }

  .service-explainer {
    display:flex;
    flex-direction: column;
    justify-content: center;
    width:100vw;
    height:100vh;
    padding: 0 $spacing-xxl;
    color:$white;
    font-size: $font-size-xxl;
    font-weight:bold;
    z-index: 2;

    div {
      border-left: 4px solid $white;
      padding-left: $spacing-md;
    }

    @media screen and (max-width: 768px){
      display: none;
    }

    .together {
      color: $blue;
    }
  }

  .services {
    width:100vw;
    background: $black;
    color: $white;
    font-size: $font-size-xl;
    font-weight:bold;
    z-index: 2;
    border-left: 4px solid $blue;

    @media screen and (max-width: 768px){
      width:100vw;
      padding: $spacing-md;
      font-size: $font-size-md;
    }

    .service {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap; 
      gap: $spacing-md; 
      position: relative;
      padding: $spacing-xxl;
      
      .tag {
        color: $blue;
        font-size: $font-size-md;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }

}

.dark #services {
  background: $black;

  .service-explainer {
    color:$white;

    .together {
      color: $blue;
    }
  }

  .services {
    background: $white;
  }
}


</style>