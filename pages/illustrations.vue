<template>
  <section class="general-main page-top">
    <h2 class="center">Illustrations</h2>
    <h3 class="grey center">Many of my works have an illustrative element. Here is a selection of my favorite ones from over the years.</h3>
    <section id="illustrations">
      <div class="single-illustration">
        <img src="/illustrations/hummingbird.png" alt="Personal Brand Hummingbird Illustration" />
        <div class="info">
          <p>Personal Brand + Icons</p>
          <date>2024</date>
        </div>
      </div>
      <div class="single-illustration">
        <img src="/illustrations/dumdrops.png" alt="Dumdrops" />
        <div class="info">
          <p>Dumdrops</p>
          <date>2022</date>
        </div>
      </div>
      <div class="single-illustration">
        <img src="/illustrations/scatter.png" alt="Scatter Illustration Work" />
        <div class="info">
          <p><nuxt-link to="/products/scatter">Scatter</nuxt-link></p>
          <date>2019</date>
        </div>
      </div>
      <div class="single-illustration">
        <img src="/illustrations/personal.png" alt="Personal Illustration" />
        <div class="info">
          <p>Personal Illustration</p>
          <date>2014</date>
        </div>
      </div>
      <div class="single-illustration">
        <img src="/illustrations/statshorizon.png" alt="Stats Horizon" />
        <div class="info">
          <p>Stats Horizon</p>
          <date>2010</date>
        </div>
      </div>
      <div class="single-illustration">
        <img src="/illustrations/pigs.png" alt="Yooya" />
        <div class="info">
          <p>Pigs</p>
          <date>2013</date>
        </div>
      </div>
      <div class="single-illustration">
        <img src="/illustrations/yooya.png" alt="Yooya" />
        <div class="info">
          <p>Yooya</p>
          <date>2004</date>
        </div>
      </div>
    </section>
  </section>
  <Footer />
</template>


<style scoped lang="scss">

@import './assets/variables';

#illustrations {

  .single-illustration {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: $spacing-xl;

    img {
      width: 100%;
    }

    .info {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: $spacing-sm;
      justify-content: space-between;
      width: 100%;

      p {
        font-size: $font-size-sm;
        font-weight: 700;
        margin-bottom: 0;
      }

      date {
        font-size: $font-size-sm;
        color: $gray;
      }
    }
  }
}


</style>