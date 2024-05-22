<template>
  <section id="services" class="general-main">
    <section class="service-explainer" ref="serviceExplainer">
      <SectionTitle title="Services" subtitle="Our work together is broken down into discrete milestones so that we can have both structure and fast progress." />
      <h3>I specialize in</h3>
    </section>
    <div class="service-specializations">
        <div class="speciality">
          <img src="/web-interface.png" alt="web interface">
          <span>Web Interfaces</span>
        </div>
        <div class="speciality">
          <img src="/mobile-interface.png" alt="mobile interface">
          <span>Mobile Interfaces</span>
        </div>
        <div class="speciality">
          <img src="/landing-pages.png" alt="Landing Pages">
          <span>Landing Pages</span>
        </div>
        <div class="speciality">
          <img src="/prototyping.png" alt="Prototyping">
          <span>Prototyping</span>
        </div>
      </div>
    <section class="services" ref="services">
      <section class="service">
        <a name="product-concept"></a>
        <div class="tag">Service</div>
        <h1>Product Conception</h1>
        <p>Your product starts with a vision that reflects your business' goals and the market that you are actively targeting.</p>
      </section>

      <section class="service">
        <a name="ux-ui"></a>
        <div class="tag">Service</div>
        <h1>User Experience & Interface Design</h1>
      </section>

      <section class="service">
        <a name="build"></a>
        <div class="tag">Service</div>
        <h1>Build</h1>
      </section>
    </section>
  </section>
</template>

<style scoped lang="scss">

@import './assets/variables';

#services {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba($black, 0.2);

  @media screen and (max-width: 768px){
    flex-direction: column;
  }

  .service-explainer {
    display:flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 $spacing-xxl;
    font-size: $font-size-xxl;
    font-family: $font-family-secondary;
    font-weight:normal;
    z-index: 2;

    @media screen and (max-width: 1000px){
      padding: 0;
      font-size: $font-size-md;
    }
  }

  .service-specializations {
    display: flex;
    flex-direction: row;
    gap: $spacing-md;
    width: 100%;

    @media screen and (max-width: 768px){
      flex-wrap: wrap;
    }

    .speciality {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: $font-size-md;
      color: $blue;

      @media screen and (max-width: 768px){
        width: calc(50% - $spacing-md / 2);
        font-size: $font-size-sm;
      }

      img {
        width: 100%;
        margin: $spacing-sm 0;
        padding: $spacing-sm;
        background: rgba($blue, 0.05);
        border-radius: $br-md;
        border: 1px solid rgba(lighten($blue,25%), .5);
      }
    }
  }

  .services {
    font-size: $font-size-xxl;
    font-family: $font-family-secondary;
    font-weight:normal;
    z-index: 2;

    @media screen and (max-width: 768px){
      width:100%;
      font-size: $font-size-md;
    }

    .service {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap; 
      gap: $spacing-md; 
      position: relative;
      padding: $spacing-xl $spacing-xxl;

      @media screen and (max-width: 768px){
        margin: $spacing-lg 0;
        padding: 0;
        gap: 0; 
      }

      p {
        font-size: $font-size-lg;
        font-weight: normal;
        opacity: 0.6;
        line-height: $font-size-lg * $multiplier;
        margin-top: 0;
      }
      
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
  border-top: 1px solid rgba($white, 0.2);

  .service-explainer {

    .together {
      color: $blue;
    }
  }
}


</style>