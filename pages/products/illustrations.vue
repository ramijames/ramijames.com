<template>
  <section class="w-full">
    <h1 class="center">Illustrations</h1>
    <h2 class="grey center">Many of my works have an illustrative element. Here is a selection of my favorite ones from over the years.</h2>
  </section>
  <section id="illustrations">
    <div class="single-illustration">
      <img src="/illustrations/hummingbird.png" alt="Personal Brand Hummingbird Illustration" />
      <div class="info">
        <p>Personal Brand + Icons</p>
        <p class="date">2024</p>
      </div>
    </div>
    <div class="single-illustration">
      <img src="/illustrations/dumdrops.png" alt="Dumdrops" />
      <div class="info">
        <p>Dumdrops</p>
        <p class="date">2022</p>
      </div>
    </div>
    <div class="single-illustration">
      <img src="/illustrations/scatter.png" alt="Scatter Illustration Work" />
      <div class="info">
        <p><nuxt-link to="/products/scatter">Scatter</nuxt-link></p>
        <p class="date">2019</p>
      </div>
    </div>
    <div class="single-illustration">
      <img src="/illustrations/personal.png" alt="Personal Illustration" />
      <div class="info">
        <p>Personal Illustration</p>
        <p class="date">2014</p>
      </div>
    </div>
    <div class="single-illustration">
      <img src="/illustrations/statshorizon.png" alt="Stats Horizon" />
      <div class="info">
        <p>Stats Horizon</p>
        <p class="date">2010</p>
      </div>
    </div>
    <div class="single-illustration">
      <img src="/illustrations/pigs.png" alt="Yooya" />
      <div class="info">
        <p>Pigs</p>
        <p class="date">2013</p>
      </div>
    </div>
    <div class="single-illustration">
      <img src="/illustrations/yooya.png" alt="Yooya" />
      <div class="info">
        <p>Yooya</p>
        <p class="date">2004</p>
      </div>
    </div>
  </section>
  <Footer />
</template>


<style scoped lang="scss">

@import './assets/variables';

#illustrations {
  margin: 0 $spacing-md;

  .single-illustration {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: $spacing-xl;

    img {
      width: 100%;
      border-radius: 0.5rem;
      box-shadow: 0 60px 80px rgba(0, 0, 0, 0.09), 0 4px 8px rgba(0, 0, 0, 0.12);
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
        
        &.date {
          font-size: $font-size-sm;
          color: $gray;
        }
      }
    }
  }
}


</style>